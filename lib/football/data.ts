"use server";

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { writeFile, unlink } from "fs/promises";
import sqlite3 from "sqlite3";
sqlite3.verbose();

const getQuery = async (query: string): Promise<any> => {
  const s3Client = new S3Client([
    {
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    },
  ]);

  const bucketName = "pl-prediction";
  const key = "2024/data.db";
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const response = await s3Client.send(command);
  const s3Db = response.Body;

  if (!s3Db) {
    console.error("Error fetching database from S3");
    return;
  }

  // Write the database to a file
  // @ts-ignore
  await writeFile("data.db", s3Db);

  const db = new sqlite3.Database("./data.db");

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
    unlink("./data.db").catch((error) =>
      console.error("Error deleting database file", error)
    );
  });

  return promise;
};

export const getPositionData = async (): Promise<any> => {
  return getQuery(`
    SELECT * FROM team_positions
    JOIN simulations
      ON team_positions.simulation_uuid = simulations.uuid
    ORDER BY id DESC, team;
  `);
};

export const getAverageFinishData = async (): Promise<any> => {
  return getQuery(`
    SELECT * FROM average_results
    JOIN simulations
      ON average_results.simulation_uuid = simulations.uuid
    ORDER BY id DESC, place;
  `);
};

export const getSimulationsData = async (): Promise<any> => {
  return getQuery(`
    SELECT * FROM simulations
    ORDER BY id DESC;
  `);
};

export const getCrests = async (): Promise<any> => {
  return getQuery(`
    SELECT * FROM team_to_crests;
  `);
};
