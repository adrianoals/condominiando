"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { ArrowRightIcon } from "./Icons";

type Apoiador = {
  name: string;
  logo: string;
  /** Site do apoiador; quando presente, o card vira link. */
  href?: string;
  /** Fundo do card quando o logo não é sobre fundo claro. */
  dark?: boolean;
};

const apoiadores: Apoiador[] = [
  { name: "Superlógica", logo: "/images/apoiadores/superlogica.jpg" },
  { name: "Eletromidia", logo: "/images/apoiadores/eletromidia.jpg" },
  { name: "Aprescond – Associação de Prestadores Condominiais", logo: "/images/apoiadores/aprescond.jpg" },
  { name: "Villa Nova Assessoria Condominial", logo: "/images/apoiadores/villa-nova.jpg" },
  { name: "Leitura Nova – Medição de Gás e Água", logo: "/images/apoiadores/leitura-nova.jpg" },
  { name: "Santa Inês – Equipamentos contra Incêndio", logo: "/images/apoiadores/santa-ines.jpg" },
  { name: "Marshals Segurança", logo: "/images/apoiadores/marshals-seguranca.jpg" },
  { name: "LD Tech", logo: "/images/apoiadores/ld-tech.jpg" },
  { name: "Kadiv", logo: "/images/apoiadores/kadiv.jpg" },
  { name: "Grupo DL Green", logo: "/images/apoiadores/dl-green.jpg" },
  { name: "Talent Marcas & Patentes", logo: "/images/apoiadores/talent-marcas-patentes.jpg" },
  { name: "RedFox", logo: "/images/apoiadores/redfox.jpg" },
  { name: "Sorteio Novo", logo: "/images/apoiadores/sorteio-novo.jpg" },
  { name: "Local Novo Imóveis", logo: "/images/apoiadores/local-novo-imoveis.jpg", dark: true },
];

export default function Apoiadores() {
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
      id="apoiadores"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #0D5BA8 0%, #084B8E 50%, #0D5BA8 100%)" }}
    >
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionTitle
            title="Apoiadores"
            subtitle="Empresas que apoiam o Condominiando"
          />
        </div>

        {/* Logos */}
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-14">
          {apoiadores.map((item, i) => {
            const Wrapper = item.href ? "a" : "div";
            const wrapperProps = item.href
              ? { href: item.href, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};
            return (
              <li
                key={item.logo}
                className={`w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.84rem)] lg:w-[calc(25%-0.94rem)] transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + i * 50}ms` }}
              >
                <Wrapper
                  {...wrapperProps}
                  title={item.name}
                  className={`relative block aspect-[3/2] rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-[0_8px_24px_rgba(3,37,79,0.25)] transition-all duration-300 hover:-translate-y-1 hover:ring-gold/60 hover:shadow-[0_12px_32px_rgba(3,37,79,0.35)] ${
                    item.dark ? "bg-black" : "bg-white"
                  }`}
                >
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 45vw"
                    className="object-contain p-4 sm:p-5"
                  />
                </Wrapper>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} id="contato">
          <div className="glass-card inline-block rounded-2xl px-10 py-8 max-w-lg">
            <p className="text-white text-lg font-bold mb-2">
              Quer ser um apoiador?
            </p>
            <p className="text-white/70 text-sm font-light mb-6">
              Associe sua marca ao programa líder em conteúdo condominial
            </p>
            {/* TODO: trocar pelo WhatsApp do marketing (wa.me/55...) quando o Rafael enviar o número */}
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
