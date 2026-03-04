
"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // shadcn/ui modal
import Login from "./login";
import SignUp from "./signUp";
import ForgotPassword from "./forgot";
import VerifyEmail from "./verifyEmail";
import ResetPassword from "./resetPassword";
import ResetPasswordOtp from "./resetOtp";

type AuthView = "login" | "signup" | "forgot" | "verify" | "reset" | '/' | 'resetOtp';

export default function AuthModal({
  open,
  onOpenChange,
  initialView = "login",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialView?: AuthView;
}) {
  const [view, setView] = useState<AuthView>(initialView);

  useEffect(() => {
    if (open) {
      setView(initialView);
    }
  }, [open, initialView]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="max-w-md rounded-3xl bg-[#F9FAFB]">
        <DialogHeader>
          <DialogTitle className="text-center text-[#4B5563] text-[40px] font-semibold">
            {view === "login" && "Login"}
            {view === "signup" && "Sign Up"}
            {view === "forgot" && "Forgot Password"}
            {view === "verify" && "Verify Email"}
            {view === 'resetOtp' && "Reset Password OTP"}
            {view === "reset" && "Reset Password"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {view === "login" && <Login switchView={setView} />}
          {view === "signup" && <SignUp switchView={setView} />}
          {view === "forgot" && <ForgotPassword switchView={setView} />}
          {view === "verify" && <VerifyEmail switchView={setView} />}
          {view === 'resetOtp' && <ResetPasswordOtp switchView={setView} />}
          {view === "reset" && <ResetPassword switchView={setView} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}


