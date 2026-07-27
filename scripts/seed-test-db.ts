/**
 * Truncates the mock_interview/user_answer tables against whatever DATABASE_URL
 * points at, meant for a dedicated Neon test branch - never run this against
 * a production database. Constructs its own DB client rather than importing
 * lib/db/client.ts, since that file's `import "server-only"` guard only
 * resolves to a no-op under Next's own bundler, not a plain Node script.
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";
import * as schema from "../lib/db/schema";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set.");
  }

  const client = neon(process.env.DATABASE_URL);
  const db = drizzle({ client, schema });

  await db.execute(
    sql`TRUNCATE TABLE ${schema.userAnswer}, ${schema.mockInterview} RESTART IDENTITY CASCADE`
  );

  console.log("Test database truncated.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
