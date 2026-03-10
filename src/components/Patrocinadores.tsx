"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { ArrowRightIcon } from "./Icons";

export default function Patrocinadores() {
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
      id="patrocinadores"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #0D5BA8 0%, #084B8E 50%, #0D5BA8 100%)" }}
    >
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionTitle
            title="Patrocinadores"
            subtitle="Empresas que apoiam o Condominiando"
          />
        </div>

        {/* Placeholder Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-3xl mx-auto mb-14 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl aspect-[3/2] flex items-center justify-center group"
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              <div className="text-center">
                <div className="w-14 h-14 rounded-xl bg-gold/20 border border-dashed border-gold/30 mx-auto mb-3 flex items-center justify-center group-hover:bg-gold/30 group-hover:border-gold/50 transition-all duration-300">
                  <svg className="w-6 h-6 text-gold/50 group-hover:text-gold/80 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
                <span className="text-white/40 text-xs">Em breve</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} id="contato">
          <div className="glass-card inline-block rounded-2xl px-10 py-8 max-w-lg">
            <p className="text-white text-lg font-bold mb-2">
              Quer ser patrocinador?
            </p>
            <p className="text-white/70 text-sm font-light mb-6">
              Associe sua marca ao programa líder em conteúdo condominial
            </p>
            <a
              href="https://whatsapp.com/channel/0029Vb6i8ebFi8xhrvh0yd1d"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm"
            >
              Entre em contato
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
