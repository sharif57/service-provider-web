import { Button } from "@/components/ui/button"
import { Instagram, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import FooterIcon from "./footerIcon"
import Image from "next/image"

export default function Footer() {
    return (
        <div className="bg-[#059669] text-white">
            {/* Call to Action Section */}
            <div className="px-4 py-12 md:px-6 lg:px-8">
                <div className="mx-auto container ">
                    <div className="rounded-2xl bg-black/10 backdrop-blur-sm px-6 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl xl:text-5xl">
                                Ready to Simplify Your Workflow?
                            </h2>
                            <p className="mt-4 text-base text-white/90 md:text-lg lg:text-xl max-w-2xl">
                                Create your first offer in less than 5 minutes — no training needed
                            </p>
                            <Button className="mt-6 bg-[#D1FAE5] text-emerald-600 hover:bg-white/90 font-semibold px-6 py-3 rounded-lg text-sm md:text-base lg:px-8 lg:py-6">
                                Get Started Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <div className=" px-4 py-8 md:px-6 lg:px-8">
                <div className="mx-auto container">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Logo Section */}
                        <div className="lg:col-span-1">
                            <FooterIcon />
                        </div>

                        {/* Site Navigation */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Site Navigation</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                                        Prices
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                                        Support
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Legal</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="/terms" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm md:text-base">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Socials</h3>
                            <ul className="space-y-3">
                                <li className="">
                                    <Link href="#" className="text-white/80 flex items-center gap-4 hover:text-white transition-colors text-sm md:text-base">
                                        <div className="bg-[#373737] rounded-full p-2">
                                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.67472 5.62764L13.2789 0.703125H11.5301L7.91614 4.56813L5.14948 0.703125H0.367798L5.20772 7.46515L0.367798 12.6421H2.11655L5.96769 8.52328L8.91602 12.6421H13.6977L8.6761 5.62764H8.67472ZM2.83214 1.96927H4.49907L11.2334 11.3759H9.56643L2.83075 1.97066L2.83214 1.96927Z" fill="white" />
                                            </svg>
                                        </div>

                                        X
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="#" className="text-white/80 flex items-center gap-4 hover:text-white transition-colors text-sm md:text-base">
                                        <div className="bg-[#2169AA] rounded-full p-2">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.00137 3.39214C2.81093 3.39214 3.46721 2.73586 3.46721 1.92629C3.46721 1.11673 2.81093 0.460449 2.00137 0.460449C1.1918 0.460449 0.535522 1.11673 0.535522 1.92629C0.535522 2.73586 1.1918 3.39214 2.00137 3.39214Z" fill="white" />
                                                <path d="M3.11352 4.37012H0.889098C0.828591 4.37012 0.779541 4.41917 0.779541 4.47967V11.5898C0.779541 11.6503 0.828591 11.6993 0.889098 11.6993H3.11352C3.17403 11.6993 3.22308 11.6503 3.22308 11.5898V4.47967C3.22308 4.41917 3.17403 4.37012 3.11352 4.37012Z" fill="white" />
                                                <path d="M11.5286 7.05767V11.2111C11.5286 11.4802 11.3081 11.6993 11.0405 11.6993H9.57465C9.30561 11.6993 9.08649 11.4788 9.08649 11.2111V7.79128C9.08649 7.1173 8.53871 6.56951 7.86472 6.56951C7.19074 6.56951 6.64296 7.1173 6.64296 7.79128V11.2111C6.64296 11.4802 6.42245 11.6993 6.1548 11.6993H4.68896C4.41992 11.6993 4.20081 11.4788 4.20081 11.2111V4.85959C4.20081 4.59055 4.42131 4.37144 4.68896 4.37144H6.1548C6.42384 4.37144 6.64296 4.59194 6.64296 4.85959V5.17162C7.13111 4.53924 7.93961 4.12598 8.84103 4.12598C10.189 4.12598 11.5286 5.10367 11.5286 7.05767Z" fill="white" />
                                            </svg>

                                        </div>

                                        LinkedIn
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="#" className="text-white/80 flex items-center gap-4 hover:text-white transition-colors text-sm md:text-base">
                                        <div className="rounded-full ">
                                            <Image src="/image/instragram.png" alt="Instagram" width={800} height={800} className="size-8" />
                                        </div>

                                        Instagram
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
