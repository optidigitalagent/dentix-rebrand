import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { InfoCards } from "@/components/InfoCards";
import { ServicesGrid } from "@/components/ServicesGrid";
import { AboutSection } from "@/components/AboutSection";
import { TeamSection } from "@/components/TeamSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { CasesSection } from "@/components/CasesSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { ContactInfoSection } from "@/components/ContactInfoSection";

const title = "DENTIX — стоматологічна клініка повного циклу";
const description =
  "Стоматологія DENTIX: профілактика, терапія, пародонтологія, ортодонтія, ортопедія та хірургія. Відкритий прайс і запис на прийом телефоном.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <InfoCards />
      <ServicesGrid />
      <AboutSection />
      <TeamSection />
      <CertificatesSection />
      <CasesSection />
      <ReviewsSection />
      <ContactSection />
      <ContactInfoSection />
    </SiteLayout>
  );
}
