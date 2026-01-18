import type { ExtractTablesWithRelations } from 'drizzle-orm';
import type { MySqlTransaction } from 'drizzle-orm/mysql-core';
import type {
  MySql2Database,
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
} from 'drizzle-orm/mysql2';
import * as schema from '../db/schema';

export type DbClient = MySql2Database<typeof schema>;

export type DbTransaction = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export type DbOrTransaction = DbClient | DbTransaction;
