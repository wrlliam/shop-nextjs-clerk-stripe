// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from ".";

export const createTable = pgTableCreator(
  (name) => `shop-next-lucia-stripe_${name}`,
);

export const users = createTable("post", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const userTable = createTable("user", {
  id: text("id").primaryKey(),
});

export const sessionTable = createTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

import type { DrizzlePostgreSQLAdapter as DrizzlePostgreSQLAdapterType } from "@lucia-auth/adapter-drizzle";

export const LuciaDatabaseAdapter: DrizzlePostgreSQLAdapterType = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userTable,
);
