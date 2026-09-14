'use client';

import { authClient } from '@/lib/auth-client';
import {
  Card,
  Form,
  Button,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import { Eye, EyeOff, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

/**
 * Same design system as the sign-in page:
 * Base #0F1123 / panel #161A2E / hairline #262B45
 * Text #EDEDF5, muted #9195AC, accent violet #8B5CF6 -> cyan #22D3C8
 * Headline: Space Grotesk. Body/UI: Inter.
 */

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.url,
      });

      if (data) {
        toast.success('Account created — welcome in.', {
          position: 'top-center',
        });
        router.push('/');
      } else {
        toast.error(error?.message || 'That didn\u2019t go through. Try again.', {
          position: 'top-center',
        });
      }
    } catch (err) {
      toast.error('Something went wrong. Try again in a moment.', {
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-[#0F1123] font-[Inter,sans-serif]">
      <style>{`
        @keyframes drift {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-14px, 16px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .orb-core { animation: drift 10s ease-in-out infinite; }
        .orb-ring { animation: spin-slow 24s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .orb-core, .orb-ring { animation: none; }
        }
      `}</style>

      {/* Left: brand / AI panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-16">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 70% 25%, rgba(34,211,200,0.16), transparent 55%), radial-gradient(circle at 25% 75%, rgba(139,92,246,0.16), transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-md">
          <div className="relative w-40 h-40 mb-12">
            <div
              className="orb-ring absolute inset-0 rounded-full"
              style={{
                border: '1px solid rgba(34,211,200,0.35)',
                borderTopColor: 'rgba(139,92,246,0.6)',
              }}
            />
            <div
              className="orb-core absolute inset-6 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, #67E8DA, #22B8AE 45%, #7C5CFC 100%)',
                boxShadow: '0 0 60px rgba(34,184,174,0.4)',
              }}
            />
          </div>

          <h1
            className="text-4xl leading-tight text-[#EDEDF5] mb-4"
            style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
          >
            Bring your own context.
          </h1>
          <p className="text-[#9195AC] text-base leading-relaxed">
            Set up your workspace once — your threads, files, and
            preferences carry forward from here.
          </p>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
              <span
                className="text-[#EDEDF5] text-lg"
                style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
              >
                Lumen
              </span>
            </div>
            <h2
              className="text-2xl text-[#EDEDF5] mb-2"
              style={{ fontFamily: 'Space Grotesk, Inter, sans-serif' }}
            >
              Create your account
            </h2>
            <p className="text-sm text-[#9195AC]">
              Already have one?{' '}
              <Link href="/login" className="text-[#22D3C8] hover:text-[#5EEAE0] underline underline-offset-4">
                Sign in
              </Link>
            </p>
          </div>

          <Card className="bg-transparent border-none shadow-none p-0">
            <Form onSubmit={onSubmit} className="flex flex-col gap-5">
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
                <Label className="text-sm text-[#C7C9D9] mb-1.5 block">
                  Name
                </Label>
                <Input
                  placeholder="John Doe"
                  className="w-full rounded-xl bg-[#161A2E] border border-[#262B45] text-[#EDEDF5] placeholder:text-[#5B5F78] px-4 py-2.5 outline-none focus:border-[#22D3C8] focus:ring-2 focus:ring-[#22D3C8]/25 transition-colors"
                />
                <FieldError className="text-sm text-[#F87171] mt-1" />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return 'Enter a valid email address';
                  }
                  return null;
                }}
              >
                <Label className="text-sm text-[#C7C9D9] mb-1.5 block">
                  Email
                </Label>
                <Input
                  placeholder="you@company.com"
                  className="w-full rounded-xl bg-[#161A2E] border border-[#262B45] text-[#EDEDF5] placeholder:text-[#5B5F78] px-4 py-2.5 outline-none focus:border-[#22D3C8] focus:ring-2 focus:ring-[#22D3C8]/25 transition-colors"
                />
                <FieldError className="text-sm text-[#F87171] mt-1" />
              </TextField>

              <TextField isRequired name="url" type="url">
                <Label className="text-sm text-[#C7C9D9] mb-1.5 block">
                  Avatar URL
                </Label>
                <Input
                  placeholder="https://example.com/avatar.png"
                  className="w-full rounded-xl bg-[#161A2E] border border-[#262B45] text-[#EDEDF5] placeholder:text-[#5B5F78] px-4 py-2.5 outline-none focus:border-[#22D3C8] focus:ring-2 focus:ring-[#22D3C8]/25 transition-colors"
                />
                <FieldError className="text-sm text-[#F87171] mt-1" />
              </TextField>

              <TextField
                isRequired
                minLength={8}
                name="password"
                type={showPassword ? 'text' : 'password'}
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
                <Label className="text-sm text-[#C7C9D9] mb-1.5 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    className="w-full rounded-xl bg-[#161A2E] border border-[#262B45] text-[#EDEDF5] placeholder:text-[#5B5F78] px-4 py-2.5 pr-11 outline-none focus:border-[#22D3C8] focus:ring-2 focus:ring-[#22D3C8]/25 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B5F78] hover:text-[#9195AC] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <Description className="text-xs text-[#5B5F78] mt-1.5">
                  At least 8 characters, with 1 uppercase letter and 1 number.
                </Description>
                <FieldError className="text-sm text-[#F87171] mt-1" />
              </TextField>

              <Button
                type="submit"
                isDisabled={isSubmitting}
                className="w-full rounded-xl py-2.5 mt-1 bg-[#22B8AE] hover:bg-[#1D9F96] text-white font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="relative flex items-center justify-center my-1">
                <div className="w-full border-t border-[#262B45]" />
                <span className="bg-[#0F1123] px-3 text-xs text-[#5B5F78] absolute">
                  or sign up with
                </span>
              </div>

              <Button
                type="button"
                onPress={handleGoogleSignUp}
                className="w-full h-11 rounded-xl bg-[#161A2E] hover:bg-[#1D2138] text-[#EDEDF5] font-medium text-sm border border-[#262B45] flex items-center justify-center gap-2.5 transition-colors"
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
                Continue with Google
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;