import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import TechStack from "@/components/TechStack";
import Principles from "@/components/Principles";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex w-full flex-col">
      <Navbar />
      <Hero />
      <Work />
      <TechStack />
      <Principles />
      <About />
      <Footer />
    </main>
  );
}
