import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import researchIcon from '@/assets/research-icon.png';
import clinicalIcon from '@/assets/clinical-icon.png';
import manufacturingIcon from '@/assets/manufacturing-icon.png';

const slides = [
  { title: 'Innovative Research', description: 'From target identification to lead optimization with AI-driven insights.', image: researchIcon },
  { title: 'Clinical Excellence', description: 'Designing patient-centric trials with rigorous data integrity.', image: clinicalIcon },
  { title: 'Quality Manufacturing', description: 'cGMP-compliant scale-up ensuring safety, efficacy, and consistency.', image: manufacturingIcon },
  { title: 'Biologics Expansion', description: 'Advancing monoclonal antibodies and novel modalities.', image: researchIcon },
  { title: 'Real-World Evidence', description: 'Post-marketing safety and effectiveness at scale.', image: clinicalIcon },
  { title: 'Supply Chain Resilience', description: 'Robust global distribution with cold-chain compliance.', image: manufacturingIcon },
  { title: 'Regulatory Excellence', description: 'Streamlined submissions meeting global standards.', image: clinicalIcon },
  { title: 'Digital Trials', description: 'Remote monitoring and eSource for faster outcomes.', image: researchIcon },
  { title: 'Continuous Manufacturing', description: 'Smart plants with inline analytics and QbD.', image: manufacturingIcon },
  { title: 'Patient Access', description: 'Affordability programs and market access strategies.', image: clinicalIcon },
];

const HomeCarousel = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageStarts, setPageStarts] = useState<number[]>([0]);
  const slidesPerPage = 1; // Always show 3 and move by 3
  const totalPages = Math.ceil(slides.length / slidesPerPage);

  useEffect(() => {
    if (!api) return;
    const snaps = api.scrollSnapList();
    const lastStart = snaps.length - 1;
    const starts: number[] = [];
    for (let i = 0; i < totalPages; i += 1) {
      const start = Math.min(i * slidesPerPage, lastStart);
      starts.push(start);
    }
    setPageStarts(starts);

    const handleSelect = () => {
      const selected = api.selectedScrollSnap();
      let pageIndex = starts.length - 1;
      for (let i = 0; i < starts.length; i += 1) {
        const nextStart = i + 1 < starts.length ? starts[i + 1] : Infinity;
        if (selected >= starts[i] && selected < nextStart) {
          pageIndex = i;
          break;
        }
      }
      setCurrentPage(pageIndex);
    };

    handleSelect();
    api.on('select', handleSelect);
  }, [api]);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-foreground">Press Release</h2>
      <div className="relative mt-6">
        <Carousel className="w-full" setApi={setApi} opts={{ align: 'start', loop: false, slidesToScroll: slidesPerPage }}>
          <CarouselContent>
            {slides.map((slide, idx) => (
              <CarouselItem key={idx} className="basis-1/3">
                <div className="h-full rounded-xl border bg-background shadow-sm transition-shadow hover:shadow-md">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-muted/40">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-medium text-foreground line-clamp-2">{slide.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{slide.description}</p>
                    <Button className="mt-4 bg-gradient-primary" size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>

        <div className="mt-4 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(pageStarts[i] ?? 0)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === currentPage ? 'bg-primary' : 'bg-muted-foreground/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCarousel;


