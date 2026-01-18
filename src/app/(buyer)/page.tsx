import AllActivity from "@/components/all-activity";
import Customers from "@/components/Customers";
import Excellent from "@/components/Excellent";
import Hero from "@/components/Hero";
import HowItWorking from "@/components/how-it-working";
import Plans from "@/components/Plans";
import Services from "@/components/Services";


export default function Home() {
  return (
    <div className=" space-y-32">

      <Hero />

      <Services />

      <HowItWorking />

      <AllActivity />

      <Plans />

      <Customers />

      <Excellent />

    </div>
  );
}
