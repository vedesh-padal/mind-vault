import { relations } from "drizzle-orm/relations";
import {
  folders,
  files,
  products,
  prices,
  subscriptions,
  usersInAuth,
  users,
  customers,
  workspaces,
} from "./schema";

export const filesRelations = relations(files, ({ one }) => ({
  folder: one(folders, {
    fields: [files.folderId],
    references: [folders.id],
  }),
}));

export const foldersRelations = relations(folders, ({ one, many }) => ({
  files: many(files),
  workspace: one(workspaces, {
    fields: [folders.workspaceId],
    references: [workspaces.id],
  }),
}));

export const pricesRelations = relations(prices, ({ one, many }) => ({
  product: one(products, {
    fields: [prices.productId],
    references: [products.id],
  }),
  subscriptions_priceId: many(subscriptions, {
    relationName: "subscriptions_priceId_prices_id",
  }),
  subscriptions_priceId: many(subscriptions, {
    relationName: "subscriptions_priceId_prices_id",
  }),
}));

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  price_priceId: one(prices, {
    fields: [subscriptions.priceId],
    references: [prices.id],
    relationName: "subscriptions_priceId_prices_id",
  }),
  price_priceId: one(prices, {
    fields: [subscriptions.priceId],
    references: [prices.id],
    relationName: "subscriptions_priceId_prices_id",
  }),
  usersInAuth: one(usersInAuth, {
    fields: [subscriptions.userId],
    references: [usersInAuth.id],
  }),
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  subscriptions: many(subscriptions),
  users: many(users),
  customers: many(customers),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  subscriptions: many(subscriptions),
  usersInAuth: one(usersInAuth, {
    fields: [users.id],
    references: [usersInAuth.id],
  }),
}));

export const customersRelations = relations(customers, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [customers.id],
    references: [usersInAuth.id],
  }),
}));

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  folders: many(folders),
}));
