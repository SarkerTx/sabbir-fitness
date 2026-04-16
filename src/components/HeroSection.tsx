import heroImage from "@/assets/hero-gym.jpg";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Dumbbell, Users, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "৫০০+", label: "সদস্য সংখ্যা" },
  { icon: Dumbbell, value: "১০+", label: "প্রশিক্ষক সংখ্যা" },
  { icon: Award, value: "৫+", label: "অভিজ্ঞতার বছর" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="SABBIR FITNESS জিমের অভ্যন্তর"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <img
          src={logo}
          alt="SABBIR FITNESS লোগো"
          className="h-36 md:h-44 lg:h-56 w-auto mx-auto mb-6 drop-shadow-2xl"
        />
        <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-8 font-semibold">
          শরীর গঠন করুন, নিজেকে সুস্থ রাখুন
        </p>
        <a href="#admission">
          <Button
            size="lg"
            className="bg-gradient-primary text-primary-foreground text-lg md:text-xl px-8 py-6 rounded-full shadow-glow animate-pulse-glow hover:scale-105 transition-transform duration-300 font-semibold"
          >
            এখনই ভর্তি হোন – ১০০% ছাড় !! (প্রথম মাসের জন্য)
          </Button>
        </a>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 bg-background/30 backdrop-blur-sm rounded-xl py-4 px-2">
              <stat.icon className="w-7 h-7 text-accent" />
              <span className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm md:text-base text-foreground/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-fade-in" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
