'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { FormSchema } from '@/lib/types';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../../public/mind-vault.png'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import { actionLoginUser } from '@/lib/serverActions/auth-actions';

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData) => {
    const resData = await actionLoginUser(formData);

    console.log(resData);
    // console.log('ERROR:\n\n\n', error);

    if (resData.error) {
      form.reset();
      setSubmitError(resData.error.message);
      console.log('ERROR MESSAGE SET IN STATE VARIABLE:\n')
      console.log(resData.error.message);
    }

    router.replace('/dashboard');

  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError)
            setSubmitError('');
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

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button variant='default' type='submit' className='w-full p-6' size='lg' disabled={isLoading}>
          {!isLoading ? "Login" : <Loader />}
        </Button>
        <span className='self-center'>
          Don't have an Account?
          <Link href="/signup" className='text-primary'> Sign Up</Link>
        </span>
      </form>

    </Form>
  )
}

export default LoginPage