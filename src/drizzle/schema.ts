import { relations } from "drizzle-orm";
import { pgTable, varchar,date, boolean,  uuid } from "drizzle-orm/pg-core";

export const usersTable=pgTable("users",{
    id: uuid('id').defaultRandom().primaryKey(),
    first_name: varchar('first_name',{length:20}),
    last_name: varchar('last_name',{length:20}),
    email: varchar('email',{length:100}),
    verified: boolean('verified').default(false),
    created_at: date('created_at').defaultNow(),
})

export const  authTable = pgTable('auth_pass',{
    user_id: uuid('user_id').references(()=> usersTable.id),
    password: varchar('password',{length:100}),
    created_at: date('created_at').defaultNow(),
})



// relationship

export const usersRelations = relations(usersTable, ({ one }) => ({
    auth: one(authTable),
  }));

export const authRelations = relations(authTable, ({ one }) => ({
    user: one(usersTable, {
      fields: [authTable.user_id],
      references: [usersTable.id],
    }),
  }));