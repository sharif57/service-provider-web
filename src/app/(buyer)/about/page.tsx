'use client';
import { useGetAboutUsQuery } from "@/redux/feature/settingSlice";

export default function AboutUs() {

    const {data} = useGetAboutUsQuery(undefined);
    console.log(data)

    return (
        <>
            <head>
                <title>About Us</title>
                {/* <meta name="description" content="About Us page with responsive design" /> */}
            </head>
            <div className="flex flex-col container mx-auto items-center justify-center  p-4">
                <h1 className="text-6xl md:text-5xl font-semibold text-[#059669] mb-6 text-center">About Us</h1>
                <div className="lg:text-start text-wrap text-gray-700 leading-relaxed">
                    <p className="mb-4 lg:text-2xl text-xl text-[#4B5563]  font-normal" dangerouslySetInnerHTML={{ __html: data?.data?.description }}>
                              </p>
                    
                </div>
            </div>
        </>
    );
}