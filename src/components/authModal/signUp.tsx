'use client';
import React, { useState } from 'react'
import { Label } from '../ui/label';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Apple from '../icon/apple';
import Google from '../icon/google';
import Microsoft from '../icon/microsoft';
import { useGoogleLoginMutation, useRegisterMutation } from '@/redux/feature/authSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setVerifyEmail } from '@/redux/feature/authUISlice';
import { saveTokens } from '@/service/authService';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
type AuthView = "login" | "signup" | "forgot" | 'verify';

export default function SignUp({ switchView }: { switchView: (v: AuthView) => void }) {
    const router = useRouter();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const [googleLogin] = useGoogleLoginMutation();

    const [showPassword, setShowPassword] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [register] = useRegisterMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res: any = await register({
                full_name: name,
                email,
                password,
                confirm_password: confirmPassword,
            }).unwrap();

            toast.success(res?.message || "Account created successfully!");

            // Save email in Redux store
            dispatch(setVerifyEmail(email));

            // Switch to verify view
            switchView("verify");
        } catch (error: any) {
            toast.error(error?.data?.errors?.email?.[0] || error?.data?.message || "Account creation failed!");
        } finally {
            setLoading(false);
        }
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()
    //     setLoading(true)
    //     if (password !== confirmPassword) {
    //         toast.error('Passwords do not match!')
    //         return;
    //     }
    //     try {
    //         const res = await register({ full_name: name, email, password, confirm_password: confirmPassword }).unwrap();
    //         console.log(res, 'register')
    //         toast.success(res?.message || 'Account created successfully!')
    //         // router.push(switchView('verify'));
    //         switchView("verify", { email });
    //     } catch (error: any) {
    //         toast.error(error?.message || 'Account creation failed!')
    //         setLoading(false)
    //     }
    //     // Handle sign in logic here
    //     console.log("Sign in attempt:", { email, password })
    // }

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


    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <div className=" overflow-y-auto h-[70vh]">
                <div className="w-full max-w-md mx-auto ">
                    <div className="">


                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-lg font-semibold text-[#374151]">
                                    Name
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#059669] h-5 w-5" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-12 h-14 bg-gray-50 border-[#9CA3AF] rounded-lg text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>
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
                                {loading ? "Signing Up..." : "Sign Up"}
                            </Button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-[#F9FAFB] text-gray-500 font-medium">Or</span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="flex justify-center">

                                <GoogleLogin
                                    theme="outline"
                                    size="large"
                                    shape="rectangular"
                                    text="continue_with"
                                    width="380"
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => toast.error("Google Login Failed")}
                                />
                                {/* <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-14 bg-[#D1FAE5] hover:bg-emerald-100 border-emerald-200  rounded-lg cursor-pointer text-[18px] text-[#047857] font-semibold transition-all duration-200 flex items-center justify-center gap-3"
                                >
                                    <Apple />
                                    Sign In with Apple
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-14 bg-[#D1FAE5] hover:bg-emerald-100 border-emerald-200  rounded-lg cursor-pointer text-[18px] text-[#047857] font-semibold transition-all duration-200 flex items-center justify-center gap-3"
                                >
                                    <Google />
                                    Sign In with Google
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-14 bg-[#D1FAE5] hover:bg-emerald-100 border-emerald-200  rounded-lg cursor-pointer text-[18px] text-[#047857] font-semibold transition-all duration-200 flex items-center justify-center gap-3"
                                >
                                    <Microsoft />
                                    Sign In with Microsoft
                                </Button> */}
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center mt-8">
                                <span className="text-gray-600 text-sm">
                                    Already have account?{" "}
                                    <button onClick={() => switchView("login")} type="button" className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-semibold transition-colors">
                                        Sign In
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>

                {/* <div className="flex justify-between text-sm text-blue-600">
        <button onClick={() => switchView("signup")}>Create Account</button>
        <button onClick={() => switchView("forgot")}>Forgot Password?</button>
      </div> */}
            </div>
        </GoogleOAuthProvider>
    )
}
