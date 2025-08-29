import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';

const Index = () => {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Services />
        <About />
      </main>
    </div>
  );
};

export default Index;


