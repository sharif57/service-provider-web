'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { useResetPasswordMutation } from '@/redux/feature/authSlice';
import { toast } from 'sonner';
type AuthView = "login" | "signup" | "forgot" | "verify" | "reset";

export default function ResetPassword({ switchView }: { switchView: (view: AuthView) => void }) {

    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [resetPassword] = useResetPasswordMutation();

    const email = useSelector((state: any) => state.authUI.verifyEmail);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if (password !== confirmPassword) {
            toast.error("Passwords do not match. Please try again.")
            setLoading(false)
            return;
        }
        try {
            const res = await resetPassword({ new_password: password, confirm_password: confirmPassword }).unwrap();
            console.log(res, '=================>>>>>.')
            toast.success(res?.message || "Password reset successfully!")
            localStorage.removeItem("resetToken");
            setLoading(false)
            switchView("login")
        } catch (error: any) {
            toast.error(error?.data?.errors?.password?.[0] || error?.data?.message || "Password reset failed. Please try again.")
            setLoading(false)
        }
        // Handle sign in logic here
    }

    return (
        <div>
            <div className="">
                <div className="w-full max-w-md mx-auto ">
                    <div className="">


                        <form onSubmit={handleSubmit} className="space-y-3">


                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-lg font-semibold text-[#374151]">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#059669] h-5 w-5" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-12 pr-12 h-14 bg-gray-50 border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password" className="text-lg font-semibold text-[#374151]">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#059669] h-5 w-5" />
                                    <Input
                                        id="confirm-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="pl-12 pr-12 h-14 bg-gray-50 border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>





                            {/* Sign In Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-[#059669] cursor-pointer text-[18px] font-semibold hover:bg-emerald-700 text-white  rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                {loading ? "Resetting..." : "Confirm"}
                            </Button>




                        </form>
                    </div>
                </div>

                {/* <div className="flex justify-between text-sm text-blue-600">
        <button onClick={() => switchView("signup")}>Create Account</button>
        <button onClick={() => switchView("forgot")}>Forgot Password?</button>
      </div> */}
            </div>
        </div>
    )
}
