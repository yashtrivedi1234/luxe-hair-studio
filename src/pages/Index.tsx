import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import LocalSeoSection from "@/components/home/LocalSeoSection";
import TestimonialsPreview from "@/components/home/TestimonialsPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout showBreadcrumbs={false}>
      <HeroSection />
      <ServicesPreview />
      <LocalSeoSection />
      <TestimonialsPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
