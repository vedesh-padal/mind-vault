"use server";

import { z } from "zod";
import { FormSchema } from "../types";
import { cookies } from "next/headers";
import { createClient } from '@/lib/supabase/server'


export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = await createClient();
  
  const response = supabase.auth.signInWithPassword({
    email, 
    password,
  })

  return response;
}
