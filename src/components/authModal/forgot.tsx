'use client';
import React from 'react'
import { Label } from '../ui/label';
import { Mail } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForgotPasswordMutation } from '@/redux/feature/authSlice';
import { toast } from 'sonner';

type AuthView = "login" | "signup" | "forgot" | "verify" | 'resetOtp';

export default function ForgotPassword({ switchView }: { switchView: (v: AuthView) => void }) {
    const [email, setEmail] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [forgotPassword] = useForgotPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await forgotPassword({ email }).unwrap();
            toast.success(res?.message || "OTP sent successfully!")
            setLoading(false)
            switchView("resetOtp")
        } catch (error: any) {
            toast.error(error?.data?.errors?.email?.[0] ||error?.data?.message || "Failed to send OTP. Please try again.")
            setLoading(false)
        }
    }

    return (
        <div>

            <div className="space-y-4 mt-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg font-semibold text-[#374151]">
                        Email
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#059669] h-5 w-5" />
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-12 h-14 bg-gray-50 border-[#9CA3AF] rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                            required
                        />
                    </div>
                </div>
                <Button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-[#059669] cursor-pointer text-[18px] font-semibold hover:bg-emerald-700 text-white  rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                    {loading ? "Sending..." : "Send OTP"}
                </Button>
            </div>
        </div>
    )
}
