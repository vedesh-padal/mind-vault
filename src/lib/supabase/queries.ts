// this is a server action
"use server";

import { workspaces } from "../../../migrations/schema";
import db from "./db";
import { Subscription, Workspace } from "./supabase.types";

export const getUserSubscriptionStatus = async (userId: string) => {
  try {
    console.log("reaching here to fail and call subscription status");
    const data = await db.query.subscriptions.findFirst({
      where: (s, { eq }) => eq(s.userId, userId),
    });

    console.log("got subscription?");
    if (data) {
      return {
        data: data as Subscription,
        error: null,
      };
    } else {
      return {
        data: null,
        error: null,
      };
    }
  } 
  catch (error) {
    console.log("error is from here");
    console.log(error);
    return {
      data: null,
      error: `Error: ${error}`,
    };
  }
};

export const createWorkspace = async (workspace: Workspace) => {
  try {
    const response = await db.insert(workspaces).values(workspace);
    return { data: null, error: null };
  } 
  catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};
