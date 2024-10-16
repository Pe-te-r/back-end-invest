import { relations } from "drizzle-orm";
import { pgTable, integer, varchar, date, boolean, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid('id').defaultRandom().primaryKey(),
    first_Name: varchar('first_Name', { length: 20 }),
    last_Name: varchar('last_Name', { length: 20 }),
    email: varchar('email', { length: 100 }),
    verified: boolean('verified').default(false),
    invested: boolean('invested').default(false),
    promo_code_owner: varchar('promo_code_owner'),
    created_at: date('created_at').defaultNow(),
});

export const authTable = pgTable('auth_pass', {
    user_id: uuid('user_id').references(() => usersTable.id).primaryKey(),
    password: varchar('password', { length: 100 }),
    created_at: date('created_at').defaultNow(),
});

export const accountTable = pgTable('account', {
    user_id: uuid('user_id').references(() => usersTable.id).primaryKey(),
    balance: integer('balance').default(0),    
});

// not required
export const server = pgTable('server',{
    id: uuid('id').defaultRandom().primaryKey(),
    money: varchar('name', { length: 50 }),
})

// promoCode Table
export const promoCode = pgTable('promoCode', {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id').references(() => usersTable.id), // Owner of the promo code
    promo_code: varchar('promo_code', { length: 20 }),
});

// promoUsers Table
export const promoUsers = pgTable('promoUsers', {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id').references(() => usersTable.id), // The user who registered with the promo code
    promo_code_id: uuid('promo_code_id').references(() => promoCode.id), // Link to promo code used
});


// relationships

export const usersRelations = relations(usersTable, ({ one }) => ({
    auth: one(authTable),
    account: one(accountTable),
    promoCode: one(promoCode),
}));



export const promoCodeRelations = relations(promoCode, ({ one, many }) => ({
    owner: one(usersTable, {
      fields: [promoCode.user_id],
      references: [usersTable.id],
    }),
    users: many(promoUsers),
  }));

  export const promoUsersRelations = relations(promoUsers, ({ one }) => ({
    user: one(usersTable, {
      fields: [promoUsers.user_id],
      references: [usersTable.id],
    }),
    promoCode: one(promoCode, {
      fields: [promoUsers.promo_code_id],
      references: [promoCode.id],
    }),
  }));

export const authRelations = relations(authTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [authTable.user_id],
        references: [usersTable.id],
    }),
}));



export const accountRelations = relations(accountTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [accountTable.user_id],
        references: [usersTable.id],
    }),
}));