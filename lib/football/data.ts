"use server";

import sqlite3 from "sqlite3";
sqlite3.verbose();

export const getAveragePositions = async (): Promise<any> => {
  const db = new sqlite3.Database("./data.db");

  const promise = new Promise((resolve, reject) => {
    // Query the database for all average results
    db.all(
      `
    SELECT
      *
    FROM
      average_results
    ORDER BY
      place ASC
  `,
      (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
          return;
        }
        // Resolve the promise with the rows
        resolve(rows);
      }
    );
  });

  // Close the database connection and return the promise
  db.close();
  return promise;
};
