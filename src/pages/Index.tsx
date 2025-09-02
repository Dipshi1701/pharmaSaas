import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PharmaBanner from '@/components/PharmaBanner';
import HomeCarousel from '@/components/HomeCarousel';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <PharmaBanner />
        <Hero />
        <HomeCarousel />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
