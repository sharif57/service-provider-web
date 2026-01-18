
'use client';

import { useState } from "react";
import { Label } from "../ui/label";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLoginMutation, useGoogleLoginMutation, useMicrosoftLoginMutation } from "@/redux/feature/authSlice";
import { toast } from "sonner";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from "next/navigation";
import { saveTokens } from "@/service/authService";
import { useMsal } from "@azure/msal-react";
import { PopupRequest, AuthenticationResult } from "@azure/msal-browser";

type AuthView = "login" | "signup" | "forgot" | '/';

export default function Login({ switchView  }: { switchView: (v: AuthView) => void }) {
  const router = useRouter();
  const { instance } = useMsal(); // MSAL instance from provider

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();
  const [microsoftLogin] = useMicrosoftLoginMutation();

  // Email/password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login({ email, password }).unwrap();
      toast.success(res?.message || "Login successful!");
      localStorage.setItem("accessToken", res?.data?.tokens?.access);
      await saveTokens(res?.data?.tokens?.access);
      // router.push("/");
      window.location.href = "/";
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await googleLogin({ id_token: credentialResponse?.credential }).unwrap();
      toast.success(res?.message || "Google Login Successful!");
      localStorage.setItem("accessToken", res?.data?.tokens?.access);
      await saveTokens(res?.data?.tokens?.access);
      // router.push("/");
      window.location.href = "/";
    } catch (err: any) {
      toast.error(err?.data?.message || "Google Login Failed!");
    }
  };

  // Microsoft login popup
  const handleMicrosoftLogin = async () => {
    const loginRequest: PopupRequest = {
      scopes: ["User.Read"], // Microsoft Graph scopes
    };

    try {
      const result: AuthenticationResult = await instance.loginPopup(loginRequest);
      // Send ID token to backend for authentication
      const res = await microsoftLogin({ id_token: result.idToken }).unwrap();
      toast.success(res?.message || "Microsoft Login Successful!");
      localStorage.setItem("accessToken", res?.data?.tokens?.access);
      await saveTokens(res?.data?.tokens?.access);
      router.push("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Microsoft Login Failed!");
    }
  };

  return (
    <div className="overflow-y-auto h-[50vh]">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-3">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-semibold text-[#374151]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#059669] h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-gray-50 border-[#9CA3AF] rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg font-semibold text-[#374151]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#059669] h-5 w-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-gray-50 border-gray-200 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full h-14 bg-[#059669] rounded-xl">
              {loading ? "Signing In..." : "Sign In"}
            </Button>

            {/* Social Logins */}
            <div className="flex justify-center gap-4 mt-6">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Login Failed")}
              />
              {/* <button
                type="button"
                onClick={handleMicrosoftLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Microsoft Login
              </button> */}
            </div>

            <div className="text-center mt-8">
              <span className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <button
                  onClick={() => switchView("signup")}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold"
                >
                  Sign Up
                </button>
              </span>
            </div>

          </form>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
