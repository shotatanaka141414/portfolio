import { ScrollReveal } from "@/components/ScrollReveal";

import { ApproachSection } from "./ApproachSection";
import { CareerSection } from "./CareerSection";
import { ClientsMarquee } from "./ClientsMarquee";
import { ContactSection } from "./ContactSection";
import { HeroSection } from "./HeroSection";
import { InformationSection } from "./InformationSection";
import { ProfileIntroSection } from "./ProfileIntroSection";
import { SpecialitySection } from "./SpecialitySection";
import { WorksCtaSection } from "./WorksCtaSection";

export function HomePage() {
  return (
    <div className="bg-white text-[#242424]">
      <HeroSection />
      <ScrollReveal>
        <InformationSection />
      </ScrollReveal>
      <ScrollReveal>
        <ProfileIntroSection />
      </ScrollReveal>
      <ScrollReveal>
        <CareerSection />
      </ScrollReveal>
      <ScrollReveal>
        <ClientsMarquee />
      </ScrollReveal>
      <ScrollReveal>
        <SpecialitySection />
      </ScrollReveal>
      <ScrollReveal>
        <ApproachSection />
      </ScrollReveal>
      <ScrollReveal>
        <WorksCtaSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
    </div>
  );
}
