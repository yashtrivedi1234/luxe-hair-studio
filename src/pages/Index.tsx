import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import TestimonialsPreview from "@/components/home/TestimonialsPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <TestimonialsPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
