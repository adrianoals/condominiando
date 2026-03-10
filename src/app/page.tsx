import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Assista from "@/components/Assista";
import Patrocinadores from "@/components/Patrocinadores";
import Comunidade from "@/components/Comunidade";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Assista />
        <Patrocinadores />
        <Comunidade />
      </main>
      <Footer />
    </>
  );
}
