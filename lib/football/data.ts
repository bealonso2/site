"use server";

import sqlite3 from "sqlite3";
sqlite3.verbose();

const getQuery = async (query: string): Promise<any> => {
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

  // Close the database connection and return the promise
  db.close();
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
