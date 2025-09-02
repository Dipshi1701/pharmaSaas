import { Pill, FlaskConical, Factory, ShieldCheck, Truck, Microscope, Activity } from 'lucide-react';

const items = [
  { icon: Pill, label: 'Therapeutics' },
  { icon: FlaskConical, label: 'R&D' },
  { icon: Microscope, label: 'Clinical Trials' },
  { icon: ShieldCheck, label: 'Regulatory' },
  { icon: Factory, label: 'Manufacturing Quality' },
  { icon: Truck, label: 'Cold Chain Logistics' },
  { icon: Activity, label: 'Pharmacovigilance' },
];

const PharmaBanner = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-background/60 backdrop-blur">
      <style>{`
        @keyframes banner-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex whitespace-nowrap" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' as unknown as string }}>
        <div
          className="flex items-center gap-8 py-3 pr-8"
          style={{ animation: 'banner-scroll 28s linear infinite' }}
        >
          {[...Array(2)].map((_, loopIndex) => (
            <div className="flex items-center gap-8" key={loopIndex}>
              {items.map(({ icon: Icon, label }, idx) => (
                <div key={`${label}-${idx}-${loopIndex}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PharmaBanner;


