"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx'
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Logo from "../../../../public/mind-vault.png";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/global/Loader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailCheck } from 'lucide-react';
import { FormSchema } from '@/lib/types';
import { actionSignUpUser } from '@/lib/serverActions/auth-actions';


const SignUpFormSchema = z.object({
  email: z.string().describe('Email').email({ message: 'Invalid Email' }),
  password: z.string().describe('Password').min(6, "Password must be minimum 6 characters"),
  confirmPassword: z.string().describe('Confirm Password').min(6, "Password must be minimum 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ['confirmPassword'],
})

const SignUp = () => {

  const router = useRouter();
  const searchParams = useParams();

  const [submitError, setSubmitError] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const codeExchangeError = useMemo(() => {
    if (!searchParams)
      return "";

    return searchParams.error_description;
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(() => clsx('bg-primary', {
    'bg-red-500/10': codeExchangeError,
    'border-red-500/50': codeExchangeError,
    'text-red-700': codeExchangeError,
  }), [codeExchangeError]);


  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async ({ email, password }: z.infer<typeof FormSchema>) => {
    const { error } = await actionSignUpUser({ email, password });

    if (error) {
      setSubmitError(error.message);
      form.reset();
      return;
    }
    setConfirmation(true);
  };


  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError)
            setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <div className="flex flex-col items-center justify-center -ml-3">
          <Link href='/' className='w-full flex justify-center -ml-6 items-center'>
            <Image
              src={Logo}
              alt="mind-vault logo"
              width={100}
              height={100}
            />
            <span className='font-semibold dark:text-white text-4xl ml-2'>MindVault.</span>
          </Link>
          <FormDescription className='text-foreground/60 ml-4'>
            An all-In-One Collaboration and Productivity Platform
          </FormDescription>
        </div>

        {!confirmation && !codeExchangeError && (
          <>

            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='email' placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>

            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>

            <FormField
              disabled={isLoading}
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='Confirm Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            >
            </FormField>
          </>
        )}


        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          type="submit"
          className="w-full p-6"
          disabled={isLoading}
        >
          {!isLoading ? 'Create Account' : <Loader />}
        </Button>
        <span className='self-center'>
          Already have an Account?
          <Link href="/login" className='text-primary'> Login </Link>
        </span>

        {(confirmation || codeExchangeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!codeExchangeError && <MailCheck className='h-4 w-4' />}
              <AlertTitle>
                {codeExchangeError ? "Invalid Link" : "Check Your Email"}
              </AlertTitle>
              <AlertDescription>
                {codeExchangeError || "An Email confirmation has been sent"}
              </AlertDescription>
            </Alert>
          </>
        )}
      </form>
    </Form>
  )
}

export default SignUp