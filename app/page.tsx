import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Plans from "@/components/sections/Plans";

// Loading skeleton for dynamic sections
const SectionSkeleton = () => (
  <div className="w-full min-h-[400px] bg-black/20 animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#31ffce]/20 border-t-[#31ffce] rounded-full animate-spin" />
  </div>
);

const Timeline = dynamic(() => import("@/components/sections/Timeline"), {
  loading: SectionSkeleton,
});

const Solutions = dynamic(() => import("@/components/sections/Solutions"), {
  loading: SectionSkeleton,
});

const About = dynamic(() => import("@/components/sections/About"), {
  loading: SectionSkeleton,
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: SectionSkeleton,
});

const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  loading: SectionSkeleton,
});

const ContactForm = dynamic(() => import("@/components/sections/ContactForm"), {
  loading: SectionSkeleton,
});

const CTAFinal = dynamic(() => import("@/components/sections/CTAFinal"), {
  loading: SectionSkeleton,
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Timeline />
      <Solutions />
      <About />
      <Plans />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <CTAFinal />
    </div>
  );
}
