"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { PlayIcon, ArrowRightIcon } from "./Icons";

export default function Assista() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="assista"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #0D5BA8 0%, #0A4F99 50%, #0D5BA8 100%)" }}
    >
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionTitle
            title="Assista aos Episódios"
            subtitle="Acompanhe o programa pelo YouTube e fique por dentro de tudo sobre o universo condominial"
          />
        </div>

        {/* YouTube Embed */}
        <div className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="relative group">
            {/* Glow effect behind */}
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/10 via-blue-mid/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative youtube-embed border border-ice/10 rounded-2xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PL8pGApzVLHk7b82Abgqo_5jmSlrq5ziF2"
                title="Condominiando - Episódios"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href="https://www.youtube.com/@condominiando"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base"
          >
            <PlayIcon className="w-5 h-5" />
            Ver todos os episódios no YouTube
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
