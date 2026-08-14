'use client';

import { authClient } from '@/lib/auth-client';
import { Card, Form, Button, Description, FieldError, Input, Label, TextField } from '@heroui/react';
import { Check } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.url,
    });

    if (data) {
        redirect('/')
    }
    else{
        toast.error(error.message || 'An error occurred during sign up');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-16 flex justify-center">
      <Card className="border p-6">
        <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4">
          
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
          <div>
            <Button className="rounded-2xl w-full" type="submit">
              <Check className="w-4 h-4 mr-1" />
              Create Account
            </Button>
          </div>

        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;