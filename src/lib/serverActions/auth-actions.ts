"use server";

import { z } from "zod";
import { FormSchema } from "../types";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = await createClient();

  console.log('reaching here')

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // console.log(typeof(response.error))
  // console.log(response.error);
  return response;
}

export const convertToPlainObject = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  
  const supabase = await createClient();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email);

  if (data?.length) 
    return { error: { message: "User already exists.", data } };

  const response = await supabase.auth.signUp({
    email, 
    password, 
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
  }})

  console.log('response:\n', response)

  return response;
};