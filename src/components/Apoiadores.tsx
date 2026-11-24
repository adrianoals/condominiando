"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "./SectionTitle";
import { ArrowRightIcon, WhatsAppIcon } from "./Icons";

type Apoiador = {
  name: string;
  logo: string;
  /** Site do apoiador; quando presente, o card vira link. */
  href?: string;
  /**
   * Logo claro sobre fundo preto: inverte o brilho mantendo o tom das cores
   * (invert + hue-rotate) para caber no card branco.
   */
  invert?: boolean;
};

const apoiadores: Apoiador[] = [
  { name: "Superlógica", logo: "/images/apoiadores/superlogica.jpg", href: "https://superlogica.com/" },
  { name: "Eletromidia", logo: "/images/apoiadores/eletromidia.jpg", href: "https://eletromidia.com.br/" },
  { name: "Aprescond – Associação de Prestadores Condominiais", logo: "/images/apoiadores/aprescond.jpg", href: "https://aprescond.com.br/" },
  { name: "Villa Nova Assessoria Condominial", logo: "/images/apoiadores/villa-nova.jpg", href: "https://villanovacondominios.com.br/" },
  { name: "Leitura Nova – Medição de Gás e Água", logo: "/images/apoiadores/leitura-nova.jpg", href: "https://www.leituranova.com.br/" },
  { name: "Santa Inês – Equipamentos contra Incêndio", logo: "/images/apoiadores/santa-ines.jpg", href: "https://santainesextintores.com.br/" },
  { name: "Marshals Segurança", logo: "/images/apoiadores/marshals-seguranca.jpg", href: "https://marshalsseg.com.br/" },
  { name: "LD Tech", logo: "/images/apoiadores/ld-tech.jpg", href: "https://ldtechbrasil.com.br/" },
  { name: "Kadiv", logo: "/images/apoiadores/kadiv.jpg", href: "https://kadiv.com.br/" },
  { name: "Grupo DL Green", logo: "/images/apoiadores/dl-green.jpg", href: "https://dlgreen.com.br/" },
  { name: "Talent Marcas & Patentes", logo: "/images/apoiadores/talent-marcas-patentes.jpg", href: "https://www.talentpi.com.br/" },
  { name: "RedFox", logo: "/images/apoiadores/redfox.jpg", href: "https://redfoxtelecom.com.br/" },
  { name: "Sorteio Novo", logo: "/images/apoiadores/sorteio-novo.jpg", href: "https://www.sorteionovo.com.br/" },
  { name: "Local Novo Imóveis", logo: "/images/apoiadores/local-novo-imoveis.jpg", href: "https://www.localnovoimoveis.com.br/", invert: true },
];

// WhatsApp do marketing, com mensagem já preenchida.
const CONTATO_URL = `https://wa.me/5511985144875?text=${encodeURIComponent(
  "Olá! Tenho interesse em ser apoiador do Condominiando."
)}`;

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
      className="relative py-16 sm:py-20"
      style={{ background: "linear-gradient(180deg, #0D5BA8 0%, #084B8E 50%, #0D5BA8 100%)" }}
    >
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionTitle
            title="Apoiadores"
            subtitle="Empresas que acreditam no Condominiando e fazem o programa acontecer"
          />
        </div>

        {/* Logos: 2 / 3 / 4 / 7 por linha — com 14 apoiadores o desktop fecha em 2 linhas cheias */}
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {apoiadores.map((item, i) => {
            const Wrapper = item.href ? "a" : "div";
            const wrapperProps = item.href
              ? { href: item.href, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};
            return (
              <li
                key={item.logo}
                className={`w-[calc(50%-0.375rem)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-6rem)/7)] transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${150 + i * 40}ms` }}
              >
                <Wrapper
                  {...wrapperProps}
                  title={item.name}
                  className="group relative block aspect-[4/3] rounded-xl bg-white overflow-hidden shadow-[0_6px_20px_rgba(3,37,79,0.22)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(3,37,79,0.35)] hover:ring-2 hover:ring-gold"
                >
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 150px, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 45vw"
                    className={`object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-105 ${
                      item.invert ? "invert hue-rotate-180" : ""
                    }`}
                  />
                </Wrapper>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div
          id="contato"
          className={`mt-12 scroll-mt-24 transition-all duration-1000 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-gold/70 via-gold/20 to-gold/70">
            <div
              className="relative rounded-[calc(1.5rem-1px)] px-6 py-8 sm:px-10 sm:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left"
              style={{ background: "linear-gradient(120deg, #03254F 0%, #084B8E 60%, #0D5BA8 100%)" }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gold/15 blur-3xl" />

              <div className="relative flex-1">
                <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-2">Seja um apoiador</p>
                <h3 className="text-white text-2xl sm:text-3xl font-bold leading-tight">
                  Sua marca no programa que fala com o condomínio
                </h3>
                <p className="text-white/75 text-sm sm:text-base font-light mt-3 max-w-xl">
                  Toda segunda, ao vivo, para síndicos, moradores, administradoras e prestadores de serviço,
                  na TV, no YouTube, no Spotify e nas redes.
                </p>
              </div>

              <a
                href={CONTATO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative btn-gold shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Quero ser apoiador
                <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
