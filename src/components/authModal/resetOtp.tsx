"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useDispatch, useSelector } from "react-redux";
import { useForgotVerifyOtpMutation, useResendOtpMutation, useVerifyEmailMutation } from "@/redux/feature/authSlice";
import { toast } from "sonner";
import { setToken } from "@/redux/feature/authUISlice";
type AuthView = "login" | "signup" | "forgot" | "verify" | "reset";


export default function ResetPasswordOtp({ switchView }: { switchView: (v: AuthView) => void }) {
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState("")
    const dispatch = useDispatch();
    const [forgotVerifyOtp] = useForgotVerifyOtpMutation();
    const [resendOtp] = useResendOtpMutation();

    const email = useSelector((state: any) => state.authUI.verifyEmail);
    const handleVerify = async () => {
        console.log("Verification code:", value)
        setLoading(true)
        try {
            const res = await forgotVerifyOtp({ otp: value }).unwrap()
            console.log(res?.data?.access_token, '===============')
            toast.success(res?.message || "Email verified successfully!")
            localStorage.setItem("resetToken", res?.data?.access_token || "")
            dispatch(setToken(res?.data?.access_token || ""));
            setLoading(false)
            switchView("reset")

            
        } catch (error: any) {
            toast.error(error?.data?.errors?.otp?.[0] || error?.data?.message || "Verification failed. Please try again.")
            setLoading(false)
        }
    }

    const handleResend = async () => {
        try {
            const res = await resendOtp({ email }).unwrap();
            toast.success(res?.message || "OTP resent successfully!")
        } catch (error) {
            toast.error("Failed to resend OTP. Please try again.")
        }

    }

    return (
        <div className=" ">


            <div className="mb-8">
                <div className="flex justify-center mb-6">
                    <InputOTP maxLength={6} value={value} onChange={(value) => setValue(value)} className="gap-3">
                        <InputOTPGroup className="gap-3">
                            <InputOTPSlot
                                index={0}
                                className="w-12 h-12 text-center text-lg font-medium bg-emerald-50 border-2 border-emerald-200 rounded-full focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
                            />
                            <InputOTPSlot
                                index={1}
                                className="w-12 h-12 text-center text-lg font-medium bg-emerald-50 border-2 border-emerald-200 rounded-full focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
                            />
                            <InputOTPSlot
                                index={2}
                                className="w-12 h-12 text-center text-lg font-medium bg-emerald-50 border-2 border-emerald-200 rounded-full focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
                            />
                            <InputOTPSlot
                                index={3}
                                className="w-12 h-12 text-center text-lg font-medium bg-emerald-50 border-2 border-emerald-200 rounded-full focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
                            />
                            <InputOTPSlot
                                index={4}
                                className="w-12 h-12 text-center text-lg font-medium bg-emerald-50 border-2 border-emerald-200 rounded-full focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
                            />
                            <InputOTPSlot
                                index={5}
                                className="w-12 h-12 text-center text-lg font-medium bg-emerald-50 border-2 border-emerald-200 rounded-full focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors"
                            />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <Button
                    onClick={handleVerify}
                    className="w-full h-14 bg-[#059669] cursor-pointer text-[18px] font-semibold hover:bg-emerald-700 text-white  rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    disabled={value.length !== 6}
                >
                    {loading ? "Verifying..." : "Verify"}
                </Button>
            </div>

            <div className="text-center">
                <span className="text-gray-500 text-sm">Don't get the code? </span>
                <button
                    onClick={handleResend}
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
                >
                    Resend
                </button>
            </div>
        </div>
    )
}
