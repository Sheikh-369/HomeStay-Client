import Footer from "../components/footer";
import Header from "../components/header";
import CtaBanner from "./home/components/CtaBanner";
import HeroSection from "./home/components/HeroSection";
import HighlightsBento from "./home/components/HighlightsBento";
import TestimonialsSection from "./home/components/TestimonialsSection";




export default function HomepagePage() {
  return (
    <>
      
            <Header />
      <main id="main-content">
        <HeroSection />
        <HighlightsBento />
        <TestimonialsSection />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}