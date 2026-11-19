import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Assista from "@/components/Assista";
import Apoiadores from "@/components/Apoiadores";
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
        <Apoiadores />
        <Comunidade />
      </main>
      <Footer />
    </>
  );
}
