import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Assista from "@/components/Assista";
import Apoiadores from "@/components/Apoiadores";
import Comunidade from "@/components/Comunidade";
import Footer from "@/components/Footer";
import { getEpisodes } from "@/lib/episodes";

export const revalidate = 3600;

export default async function Home() {
  const episodes = await getEpisodes();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Assista episodes={episodes} />
        <Apoiadores />
        <Comunidade />
      </main>
      <Footer />
    </>
  );
}
