import Head from 'next/head';
import ParallaxHero from '../components/ParallaxHero';
import ServicesSection from '../components/ServicesSection';
import FloatingNeonWhatsApp from '../components/FloatingNeonWhatsApp';

export default function Home() {
  return (
    <>
      <Head>
        <title>Abraxas Group – Automatizaciones y Diseño Web</title>
        <meta
          name="description"
          content="Impulsa tu negocio con Abraxas: automatizaciones de WhatsApp, diseño web y optimización Meta sin complicaciones."
        />
      </Head>
      <main>
        <ParallaxHero />
        <ServicesSection />
        <FloatingNeonWhatsApp />
      </main>
    </>
  );
}