"use server";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { unlink, writeFile } from "fs/promises";
import sqlite3 from "sqlite3";
import { v4 as uuidv4 } from "uuid";
sqlite3.verbose();

// Define the S3 bucket and database files
const bucketName = "pl-prediction";
const resultsKey = "2024/results.db";
const dataKey = "2024/data.db";

const getQuery = async (query: string, key: string): Promise<any> => {
  const s3Client = new S3Client([
    {
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    },
  ]);

  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const response = await s3Client.send(command);
  const s3Db = response.Body;

  if (!s3Db) {
    console.error("Error fetching database from S3");
    return;
  }

  // Generate a unique database name
  const dbFileName = `${uuidv4()}.db`;

  // Write the database to a file
  // @ts-ignore
  await writeFile(dbFileName, s3Db);

  const db = new sqlite3.Database(dbFileName);

  const promise = new Promise((resolve, reject) => {
    // Query the database for simulations
    db.all(query, (err, rows) => {
      if (err) {
        console.error(err.message);
        reject(err);
        return;
      }
      // Resolve the promise with the rows
      resolve(rows);
    });
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error("Error closing the database", err.message);
      return;
    }

    // Delete the database file after the connection is closed
    unlink(dbFileName).catch((error) =>
      console.error("Error deleting database file", error)
    );
  });

  return promise;
};

export const getPositionData = async (): Promise<any> => {
  return getQuery(
    `
    SELECT * FROM team_positions
    JOIN simulations
      ON team_positions.simulation_uuid = simulations.uuid
    ORDER BY id DESC, team;
  `,
    resultsKey
  );
};

export const getAverageFinishData = async (): Promise<any> => {
  return getQuery(
    `
    SELECT * FROM average_results
    JOIN simulations
      ON average_results.simulation_uuid = simulations.uuid
    ORDER BY id DESC, place;
  `,
    resultsKey
  );
};

export const getCurrentPoints = async (): Promise<any> => {
  return getQuery(
    `
    SELECT * FROM team_to_points
    JOIN simulations
      ON team_to_points.simulation_uuid = simulations.uuid
    ORDER BY id DESC, points DESC;
  `,
    resultsKey
  );
};

export const getSimulationsData = async (): Promise<any> => {
  return getQuery(
    `
    SELECT * FROM simulations
    ORDER BY id DESC, date DESC;
  `,
    resultsKey
  );
};

export const getCrests = async (): Promise<any> => {
  return getQuery(
    `
    SELECT * FROM team_to_crests;
  `,
    dataKey
  );
};
