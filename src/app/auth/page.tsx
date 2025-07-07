"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { authData } from "@/types";
import axios from "axios";
import { Eye, EyeOff, Zap } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners"
import { signInSchema, signUpSchema } from "@/config/schema";
import { ErrorMessage } from "@/components/ErrorMessage";

const defaultAuthData = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

export default function Auth() {
    const [authPage, setAuthPage] = useState<"signin" | "signup">("signin");
    const [formData, setFormData] = useState<authData>(defaultAuthData);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<authData>(defaultAuthData);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
      const getSession = async() => {
        const response = await axios.get("/api/auth/session");
        const data = response.data;

        if (data.user !== null) {
          router.replace("/");
          toast.warning("User already signed in...");
        }
      }

      getSession();
    }, [])

    useEffect(() => {
      const message = searchParams.get("message");
      if (message === "login-required") {
        toast.info("Login to get started...")
      }
    }, [searchParams])

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>| React.KeyboardEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (authPage === "signin") {
              await signInSchema.validate(formData, {abortEarly: false});
            } else {
              await signUpSchema.validate(formData, {abortEarly: false});
            }

            const response = await axios.post(`/api/auth/${authPage}`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = response.data;

            if (!data.user || data.user.role != "authenticated") {
                toast.error("Error Signing in...")
            }

            if (response.status >= 200 && response.status <= 299) {
                toast.success(`${authPage === "signup" ? "User Created Successfully" : "Sign In Successful"}`);
                window.location.href="/";
            }
        } catch(error: any) {
            const newErrors:any = {};

            error.inner?.forEach((err:any)=>{
                newErrors[err.path] = err.message
            })

            setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Invalid Inputs");
            }

        } finally {
          setLoading(false);
        }
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-gray-950 dark:via-blue-950/20 dark:to-indigo-950/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LogoLumeo
            </span>
          </div>
          <CardTitle className="text-2xl font-bold">{authPage === "signup" ? "Create account" : "Welcome Back"}</CardTitle>
          <CardDescription>
            {authPage === "signup" ? "Sign up to start creating professional logos with AI" : "Sign in to your account to continue creating amazing logos"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {authPage === "signup"  && <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({...prev, firstName: e.target.value}))}
                  required
                />
                {errors.firstName !== "" && <ErrorMessage message={errors.firstName}/>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({...prev, lastName: e.target.value}))}
                  required
                />
                {errors.lastName !== "" && <ErrorMessage message={errors.lastName}/>}
              </div>
            </div>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                required
              />
              {errors.email !== "" && <ErrorMessage message={errors.email}/>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password !== "" && <ErrorMessage message={errors.password}/>}
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              {loading ? <BeatLoader /> : (authPage === "signup" ? "Sign Up" : "Sign In")}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {authPage === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <p onClick={() => setAuthPage(authPage === "signin" ? "signup" : "signin")} className="text-primary hover:underline font-medium cursor-pointer">
                {authPage === "signup" ? "Sign in" : "Sign Up"}
              </p>
            </p>
          </div>
        </CardContent>
      </Card>
      <Toaster richColors  />
    </div>
  );
}