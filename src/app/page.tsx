import Hero from '@/components/Hero';
import AboutSection from '@/components/sections/AboutSection';
import AgentSection from '@/components/sections/AgentSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import ServicesSection from '@/components/sections/ServicesSection';
import StatsSection from '@/components/sections/StatsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
    return (
        <>
            <Hero />
            <AboutSection />
            <AgentSection />
            <FeaturedProperties />
            <ServicesSection />
            <StatsSection />
            <ContactSection />
        </>
    );
}
