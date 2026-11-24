"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { TvIcon, StreamIcon, YouTubeIcon, SpotifyIcon } from "./Icons";

const platforms = [
  {
    icon: TvIcon,
    name: "Nova TV Alto Tietê",
    desc: "Canal aberto na região do Alto Tietê",
    href: "https://www.youtube.com/@condominiando/streams",
    color: "from-blue-light/20 to-blue-mid/10",
  },
  {
    icon: StreamIcon,
    name: "RedFox Play",
    desc: "Streaming ao vivo pela plataforma digital",
    // TODO: link do app RedFox Play (pedir ao Rafael)
    color: "from-red-500/15 to-blue-mid/10",
  },
  {
    icon: YouTubeIcon,
    name: "YouTube",
    desc: "Assista quando e onde quiser",
    href: "https://www.youtube.com/@condominiando/streams",
    color: "from-red-500/15 to-blue-mid/10",
  },
  {
    icon: SpotifyIcon,
    name: "Spotify",
    desc: "Ouça os episódios onde estiver",
    href: "https://open.spotify.com/show/1QgGqT9ymCM0Pr6R9GRul2",
    color: "from-green-500/15 to-blue-mid/10",
  },
];

export default function Sobre() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="programa"
      ref={sectionRef}
      className="relative py-16 sm:py-20"
      style={{ background: "linear-gradient(180deg, #0D5BA8 0%, #084B8E 50%, #0D5BA8 100%)" }}
    >
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionTitle title="Sobre o Programa" />
        </div>

        <div className={`max-w-3xl mx-auto text-center mb-12 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
            O <span className="text-gold font-semibold">Condominiando</span> é um programa apresentado por{" "}
            <span className="text-gold font-semibold">Rafael Zanin</span>, dedicado ao universo dos
            condomínios. Com conteúdo informativo e acessível, o programa aborda temas essenciais para
            síndicos, moradores e profissionais da área condominial.
          </p>
          <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light mt-5">
            Transmitido ao vivo toda segunda-feira às 20h pela{" "}
            <span className="text-gold font-semibold">Nova TV Alto Tietê</span> e pela plataforma{" "}
            <span className="text-gold font-semibold">RedFox Play</span>, o Condominiando também está
            disponível no <span className="text-gold font-semibold">YouTube</span> e no{" "}
            <span className="text-gold font-semibold">Spotify</span> para quem quiser assistir ou ouvir
            quando e onde quiser.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, i) => {
            const Wrapper = platform.href ? "a" : "div";
            const wrapperProps = platform.href
              ? { href: platform.href, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};

            return (
              <Wrapper
                key={platform.name}
                {...wrapperProps}
                className={`glass-card rounded-2xl p-8 text-center group cursor-pointer transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${400 + i * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold shadow-[0_4px_16px_rgba(254,214,46,0.3)] mb-5 group-hover:scale-110 group-hover:shadow-[0_6px_24px_rgba(254,214,46,0.5)] transition-all duration-300">
                  <platform.icon className="w-6 h-6 text-[#03254F]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{platform.name}</h3>
                <p className="text-white/80 text-sm">{platform.desc}</p>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
