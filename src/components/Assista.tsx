"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { PlayIcon, ArrowRightIcon, YouTubeIcon } from "./Icons";
import { EPISODES_PLAYLIST_ID, EPISODES_PLAYLIST_URL, type Episode } from "@/lib/episodes";

/**
 * O programa vai ao ar toda segunda às 20h, mas o YouTube costuma registrar o vídeo
 * no dia seguinte. Mostra a segunda-feira da exibição: a última segunda até a data do feed.
 */
const formatDate = (iso: string) => {
  const sp = new Date(new Date(iso).toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  sp.setDate(sp.getDate() - ((sp.getDay() + 6) % 7));
  return sp.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
};

export default function Assista({ episodes }: { episodes: Episode[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const episode = episodes[current];

  const select = (i: number) => {
    setCurrent(i);
    setPlaying(true);
  };

  return (
    <section
      id="assista"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #0D5BA8 0%, #0A4F99 50%, #0D5BA8 100%)" }}
    >
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionTitle
            title="Assista aos Episódios"
            subtitle="Todos os programas completos, toda segunda-feira um episódio novo"
          />
        </div>

        <div className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {episode ? (
            <div className="grid lg:grid-cols-3 gap-5">
              {/* Player */}
              <div className="lg:col-span-2">
                <div className="relative youtube-embed border border-ice/10 rounded-2xl overflow-hidden bg-black">
                  {playing ? (
                    <iframe
                      key={episode.id}
                      src={`https://www.youtube.com/embed/${episode.id}?autoplay=1&rel=0`}
                      title={episode.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      onClick={() => setPlaying(true)}
                      className="absolute inset-0 group cursor-pointer"
                      aria-label={`Assistir ${episode.label}`}
                    >
                      <Image
                        src={`https://i.ytimg.com/vi/${episode.id}/maxresdefault.jpg`}
                        alt={episode.title}
                        fill
                        sizes="(min-width: 1024px) 720px, 100vw"
                        className="object-cover"
                      />
                      <span className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex items-center justify-center w-20 h-20 rounded-full bg-gold shadow-[0_8px_32px_rgba(254,214,46,0.45)] transition-transform duration-300 group-hover:scale-110">
                          <PlayIcon className="w-8 h-8 text-[#03254F] translate-x-0.5" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <p className="text-white font-semibold">
                    {episode.label}
                    {current === 0 && <span className="ml-2 text-gold text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Mais recente</span>}
                  </p>
                  <p className="text-white/60 text-sm whitespace-nowrap">{formatDate(episode.published)}</p>
                </div>
              </div>

              {/* Lista de episódios */}
              <div className="glass-card rounded-2xl p-3 flex flex-col max-h-[420px] lg:max-h-none lg:h-0 lg:min-h-full">
                <p className="px-2 pt-1 pb-3 text-white/80 text-sm font-semibold uppercase tracking-wider">
                  Episódios <span className="text-white/50">({episodes.length})</span>
                </p>
                <ul className="flex-1 overflow-y-auto space-y-1 pr-1 episode-list">
                  {episodes.map((ep, i) => (
                    <li key={ep.id}>
                      <button
                        onClick={() => select(i)}
                        className={`w-full flex gap-3 items-center p-2 rounded-xl text-left transition-colors cursor-pointer ${
                          i === current ? "bg-white/15 ring-1 ring-gold/50" : "hover:bg-white/10"
                        }`}
                      >
                        <span className="relative shrink-0 w-28 aspect-video rounded-lg overflow-hidden bg-black/40">
                          <Image
                            src={`https://i.ytimg.com/vi/${ep.id}/mqdefault.jpg`}
                            alt=""
                            fill
                            sizes="112px"
                            className="object-cover"
                          />
                          {i === current && playing && (
                            <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-gold text-[10px] font-bold uppercase">
                              Tocando
                            </span>
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-sm font-semibold truncate ${i === current ? "text-gold" : "text-white"}`}>
                            {ep.label}
                          </span>
                          <span className="block text-xs text-white/60">{formatDate(ep.published)}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            // Sem feed (YouTube fora do ar): cai no player da playlist.
            <div className="relative youtube-embed border border-ice/10 rounded-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${EPISODES_PLAYLIST_ID}`}
                title="Condominiando - Episódios"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href="https://www.youtube.com/@condominiando/streams"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base"
          >
            <YouTubeIcon className="w-5 h-5" />
            Inscreva-se no canal
          </a>
          <a
            href={EPISODES_PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base text-white border border-white/30 hover:border-gold hover:text-gold transition-colors"
          >
            Ver todas as lives
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
