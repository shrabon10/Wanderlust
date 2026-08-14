'use client';

import { authClient } from '@/lib/auth-client';
import { Card, Form, Button, Description, FieldError, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.url,
    });

    if (data) {
      toast.success('Account Created!', {
        position: 'top-center',
      });
      router.push('/');
    } else {
      toast.error(error?.message || 'An error occurred during sign up', {
        position: 'top-center',
      });
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <div className="max-w-10xl p-16 flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <p className="text-sm text-gray-500 mt-1">
          Create an account to get started.
        </p>
      </div>

      <Card className="border p-6 w-full max-w-md">
        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
          
          {/* Name Field */}
          <TextField
            isRequired
            name="name"
            type="text"
            validate={(value) => {
              if (value.length < 2) {
                return 'Name must be at least 2 characters long';
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return 'Please enter a valid email address';
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* URL / Avatar Field */}
          <TextField isRequired name="url" type="url">
            <Label>URL</Label>
            <Input placeholder="https://example.com/avatar.png" />
            <FieldError />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return 'Password must be at least 8 characters';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex flex-col gap-4 w-full pt-2">
            {/* Create Account Button */}
            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-[#139bb9] hover:bg-[#0f829b] text-white font-medium text-sm transition-colors duration-200"
            >
              Create Account
            </Button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-1">
              <div className="w-full border-t border-gray-200" />
              <span className="bg-white px-3 text-xs text-gray-500 font-normal absolute">
                Or sign up with
              </span>
            </div>

            {/* Google Sign Up Button */}
            <Button
              type="button"
              onPress={handleGoogleSignUp}
              className="w-full h-11 rounded-xl bg-white hover:bg-gray-50 text-gray-900 font-medium text-sm border border-gray-200 flex items-center justify-center gap-2.5 transition-colors duration-200 shadow-none"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign Up With Google</span>
            </Button>

            {/* Footer Link */}
            <p className="text-center text-xs text-gray-500 mt-2">
              Already have an account?{' '}
              <Link href="/login" className="text-[#139bb9] font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;