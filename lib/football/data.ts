"use server";

import { config } from "@/config";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { unlink, writeFile } from "fs/promises";
import { unstable_cache } from "next/cache";
import sqlite3 from "sqlite3";
import { v4 as uuidv4 } from "uuid";

sqlite3.verbose();

// Define the S3 bucket and database files
const bucketName = "pl-prediction";
const resultsKey = "2024/results.db";
const dataKey = "2024/data.db";

// Core function to fetch and query S3 SQLite database
const getQuery = async (
  query: string,
  key: string,
  parameters: any[] = [],
): Promise<any> => {
  const s3Client = new S3Client({});

  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const response = await s3Client.send(command);
  const s3Db = response.Body;

  if (!s3Db) {
    throw new Error("Failed to fetch database from S3");
  }

  const dbFileName = `${uuidv4()}.db`;

  // Write the database to a temporary file
  // @ts-ignore
  await writeFile(dbFileName, s3Db);

  const db = new sqlite3.Database(dbFileName);

  try {
    return await new Promise((resolve, reject) => {
      db.all(query, parameters, (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
          return;
        }
        resolve(rows);
      });
    });
  } finally {
    // Ensure the database is closed and file is deleted
    db.close((err) => {
      if (err) console.error("Error closing the database", err.message);
      unlink(dbFileName).catch((error) =>
        console.error("Error deleting database file", error),
      );
    });
  }
};

// Cached query helper
const cachedQuery = (query: string, key: string, simulation_uuid?: string) =>
  unstable_cache(
    () => getQuery(query, key, simulation_uuid ? [simulation_uuid] : []),
    [key, query, simulation_uuid ? simulation_uuid : ""],
    {
      tags: [config.football_data_cache_tag],
      revalidate: false,
    },
  );

// Exported cached server actions
export const getPositionData = async (simulationUuid: string) =>
  cachedQuery(
    `
      SELECT * FROM team_positions
      JOIN simulations
        ON team_positions.simulation_uuid = simulations.uuid
      WHERE simulation_uuid = ?
      ORDER BY id DESC, team;
    `,
    resultsKey,
    simulationUuid,
  )();

export const getAverageFinishData = async (simulationUuid: string) =>
  cachedQuery(
    `
      SELECT * FROM average_results
      JOIN simulations
        ON average_results.simulation_uuid = simulations.uuid
      WHERE simulation_uuid = ?
      ORDER BY id DESC, place;
    `,
    resultsKey,
    simulationUuid,
  )();

export const getCurrentPoints = async (simulationUuid: string) =>
  cachedQuery(
    `
      SELECT * FROM team_to_points
      JOIN simulations
        ON team_to_points.simulation_uuid = simulations.uuid
      WHERE simulation_uuid = ?
      ORDER BY id DESC, points DESC;
    `,
    resultsKey,
    simulationUuid,
  )();

export const getSimulationsData = cachedQuery(
  `
    SELECT * FROM simulations
    ORDER BY id DESC, date DESC;
  `,
  resultsKey,
);

export const getUpcomingMatches = cachedQuery(
  `
    SELECT * 
    FROM upcoming_results 
    WHERE simulation_uuid = (
      SELECT simulation_uuid 
      FROM upcoming_results 
      ORDER BY utc_date DESC 
      LIMIT 1
    )
    ORDER BY utc_date ASC;
  `,
  resultsKey,
);

export const getCrests = cachedQuery(
  `
    SELECT * FROM team_to_crests;
  `,
  dataKey,
);
