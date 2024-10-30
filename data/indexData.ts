import { Client } from "@elastic/elasticsearch";
import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
dotenv.config();

export const INDEX_NAME = "clinical_trials";

export const SearchClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || "elastic",
    password: process.env.ELASTICSEARCH_PASSWORD || "changeme",
  },
});

async function indexData() {
  const exists = await SearchClient.indices.exists({ index: INDEX_NAME });
  if (exists) await SearchClient.indices.delete({ index: INDEX_NAME });

  await SearchClient.indices.create({
    index: INDEX_NAME,
    mappings: {
      properties: {
        // Define expicit schema for the problem fields.
        "Primary Completion Date": { type: "date", ignore_malformed: true },
        "Completion Date": { type: "date", ignore_malformed: true },
        "Start Date": { type: "date", ignore_malformed: true },
      },
    },
  });

  fs.createReadStream(process.cwd() + "/data/ctg-studies.csv")
    .pipe(csv())
    .on("data", async (row) => {
      await SearchClient.index({
        index: INDEX_NAME,
        body: row,
      });
    })
    .on("end", () => {
      console.log("CSV file successfully indexed");
    });
}

indexData().catch(console.error);
