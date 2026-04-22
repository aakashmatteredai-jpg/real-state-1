import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import FeaturedProperties from "@/components/sections/Services";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import PastTransactions from "@/components/sections/PastTransactions";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen">
        <Hero />
        <Introduction />
        <About />
        <FeaturedProperties />
        <PastTransactions />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
