import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://Interview-AI_owner:cWudeoq6xhE3@ep-proud-smoke-a1pzsegd.ap-southeast-1.aws.neon.tech/Interview-AI?sslmode=require',
  },
});
