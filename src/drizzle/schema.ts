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
export const locked_assets = pgTable('locked_assets',{
    user_id: uuid('user_id').references(() => usersTable.id).primaryKey(),
    money: varchar('name', { length: 50 }),
})

// server
export const server_hire= pgTable('server_hire',{
    id: uuid('id').defaultRandom().primaryKey(),
    days_hired : integer('days_hired').notNull(),
    start_date : date('start_date').defaultNow(),
    day_rate: integer('day_rate').notNull(),
    day_minining: integer('day_minining').notNull(),
    end_date : date('end_date'),
    user_id: uuid('user_id').references(() => usersTable.id), // The user who hired the server
    server_id: integer('server_id'), // The server hired

})

// promoCode Table
export const promoCode = pgTable('promoCode', {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id').references(() => usersTable.id), // Owner of the promo code
    promo_code: varchar('promo_code', { length: 20 }).unique(),
});

// promoUsers Table
export const promoUsers = pgTable('promoUsers', {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id').references(() => usersTable.id), // The user who registered with the promo code
    promo_code_id: uuid('promo_code_id').references(() => promoCode.id), // Link to promo code used
});




// relationships

export const usersRelations = relations(usersTable, ({ one,many }) => ({
    auth: one(authTable),
    account: one(accountTable),
    promoCode: one(promoCode),
    usedPromoCodes: many(promoUsers),
    server_hires: many(server_hire),
  
}));

export const serverHigher = relations(server_hire,({one})=>({
    server_hired:one(usersTable,{
        fields: [server_hire.user_id],
        references: [usersTable.id],
    })
}))


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