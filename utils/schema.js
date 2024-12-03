
import { pgTable,serial } from "drizzle-orm/pg-core";

export const MockInterview =pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull()

})
