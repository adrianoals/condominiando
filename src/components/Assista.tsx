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
const airDate = (iso: string, month: "short" | "long" = "short") => {
  const sp = new Date(new Date(iso).toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  sp.setDate(sp.getDate() - ((sp.getDay() + 6) % 7));
  return sp.toLocaleDateString("pt-BR", { day: "2-digit", month, year: "numeric" });
};

const seasonText = (ep: Episode) => (ep.season ? `Temporada ${ep.season}` : "Talk Show");

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
      className="relative py-16 sm:py-20"
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
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Player + informações do episódio, num card só */}
              <article className="lg:col-span-2 glass-card rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-video bg-black">
                  {playing ? (
                    <iframe
                      key={episode.id}
                      src={`https://www.youtube.com/embed/${episode.id}?autoplay=1&rel=0`}
                      title={episode.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full border-0"
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
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                      <span className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gold shadow-[0_8px_32px_rgba(254,214,46,0.45)] transition-transform duration-300 group-hover:scale-110">
                          <span className="absolute inset-0 rounded-full bg-gold/60 animate-ping opacity-40" />
                          <PlayIcon className="relative w-8 h-8 text-[#03254F] translate-x-0.5" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 sm:px-6 py-4 border-t border-white/10">
                  <div className="min-w-0">
                    <p className="text-gold text-[11px] font-semibold uppercase tracking-[0.18em]">
                      Talk Show Condominiando · {seasonText(episode)}
                    </p>
                    <h3 className="text-white text-lg sm:text-xl font-bold mt-0.5">{episode.label}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    {current === 0 && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 text-gold px-3 py-1 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        Mais recente
                      </span>
                    )}
                    <span className="text-white/60 whitespace-nowrap">{airDate(episode.published, "long")}</span>
                  </div>
                </div>
              </article>

              {/* Lista de episódios */}
              <aside className="glass-card rounded-2xl flex flex-col overflow-hidden max-h-[460px] lg:max-h-none lg:h-0 lg:min-h-full">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <p className="text-white font-bold">Episódios</p>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/70">
                    {episodes.length}
                  </span>
                </div>
                <ul className="flex-1 overflow-y-auto p-2 space-y-1 episode-list [mask-image:linear-gradient(to_bottom,black_88%,transparent)]">
                  {episodes.map((ep, i) => {
                    const active = i === current;
                    return (
                      <li key={ep.id}>
                        <button
                          onClick={() => select(i)}
                          aria-current={active ? "true" : undefined}
                          className={`relative w-full flex gap-3 items-center p-2 pr-3 rounded-xl text-left transition-colors cursor-pointer group ${
                            active ? "bg-white/12" : "hover:bg-white/8"
                          }`}
                        >
                          {active && <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gold" />}
                          <span className="relative shrink-0 w-28 aspect-video rounded-lg overflow-hidden bg-black/40 ring-1 ring-white/10">
                            <Image
                              src={`https://i.ytimg.com/vi/${ep.id}/mqdefault.jpg`}
                              alt=""
                              fill
                              sizes="112px"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <span
                              className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                                active && playing ? "opacity-100 bg-black/55" : "opacity-0 group-hover:opacity-100 bg-black/35"
                              }`}
                            >
                              {active && playing ? (
                                <span className="text-gold text-[10px] font-bold uppercase tracking-wider">Tocando</span>
                              ) : (
                                <PlayIcon className="w-6 h-6 text-white" />
                              )}
                            </span>
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/50">
                              {seasonText(ep)}
                            </span>
                            <span className={`block font-bold leading-tight ${active ? "text-gold" : "text-white"}`}>
                              {ep.number ? `Episódio ${ep.number}` : ep.label}
                            </span>
                            <span className="block text-xs text-white/60 mt-0.5">{airDate(ep.published)}</span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>
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
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href={EPISODES_PLAYLIST_URL}
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
