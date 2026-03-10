"use client";

import { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import { YouTubeIcon, InstagramIcon, WhatsAppIcon, ArrowRightIcon } from "./Icons";

const communities = [
  {
    icon: YouTubeIcon,
    name: "YouTube",
    handle: "@condominiando",
    desc: "Inscreva-se e acompanhe todos os episódios",
    href: "https://www.youtube.com/@condominiando",
    accent: "hover:border-red-500/40",
    iconBg: "from-red-500/20 to-red-700/10",
    iconColor: "text-red-400 group-hover:text-red-300",
  },
  {
    icon: InstagramIcon,
    name: "Instagram",
    handle: "@programacondominiando",
    desc: "Siga para novidades e bastidores",
    href: "https://www.instagram.com/programacondominiando",
    accent: "hover:border-pink-500/40",
    iconBg: "from-pink-500/20 to-purple-600/10",
    iconColor: "text-pink-400 group-hover:text-pink-300",
  },
  {
    icon: WhatsAppIcon,
    name: "WhatsApp",
    handle: "Canal oficial",
    desc: "Entre no nosso canal para receber atualizações",
    href: "https://whatsapp.com/channel/0029Vb6i8ebFi8xhrvh0yd1d",
    accent: "hover:border-green-500/40",
    iconBg: "from-green-500/20 to-green-700/10",
    iconColor: "text-green-400 group-hover:text-green-300",
  },
];

export default function Comunidade() {
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
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      style={{ background: "linear-gradient(180deg, #0D5BA8 0%, #0A4F99 50%, #0D5BA8 100%)" }}
    >
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <SectionTitle
            title="Faça parte da comunidade"
            subtitle="Conecte-se com o Condominiando nas redes sociais"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {communities.map((item, i) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-card rounded-2xl p-8 text-center group transition-all duration-700 ${item.accent} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold shadow-[0_4px_16px_rgba(254,214,46,0.3)] mb-5 group-hover:scale-110 group-hover:shadow-[0_6px_24px_rgba(254,214,46,0.5)] transition-all duration-300">
                <item.icon className="w-6 h-6 text-[#03254F] transition-colors duration-300" />
              </div>

              <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
              <p className="text-white/70 text-sm mb-3">{item.handle}</p>
              <p className="text-white/90 text-sm mb-5">{item.desc}</p>

              <span className="inline-flex items-center gap-1.5 text-gold text-sm font-semibold group-hover:text-gold transition-colors duration-300">
                Acessar
                <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
