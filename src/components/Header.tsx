"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { YouTubeIcon, InstagramIcon, WhatsAppIcon, SpotifyIcon, MenuIcon, CloseIcon } from "./Icons";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "O Programa", href: "#programa" },
  { label: "Assista", href: "#assista" },
  { label: "Apoiadores", href: "#apoiadores" },
  { label: "Contato", href: "#contato" },
];

const socialLinks = [
  { icon: YouTubeIcon, href: "https://www.youtube.com/@condominiando/streams", label: "YouTube" },
  { icon: InstagramIcon, href: "https://www.instagram.com/programacondominiando", label: "Instagram" },
  { icon: WhatsAppIcon, href: "https://whatsapp.com/channel/0029Vb6i8ebFi8xhrvh0yd1d", label: "WhatsApp" },
  { icon: SpotifyIcon, href: "https://open.spotify.com/show/1QgGqT9ymCM0Pr6R9GRul2", label: "Spotify" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#084B8E]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="relative flex-shrink-0 group">
          <Image
            src="/images/logo-icone-transparente.png"
            alt="Condominiando"
            width={scrolled ? 44 : 52}
            height={scrolled ? 44 : 52}
            className="transition-all duration-500"
            priority
          />
          <div className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gold/10 transition-colors duration-300" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-ice/80 hover:text-gold transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-6" />
            </a>
          ))}
        </nav>

        {/* Desktop Social */}
        <div className="hidden lg:flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-ice/60 hover:text-gold transition-colors duration-300 p-1.5"
            >
              <social.icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-ice/80 hover:text-gold transition-colors p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>

      {/* Mobile Menu — fora do <header>: o backdrop-blur do header vira containing block
          de elementos fixed e o menu ficava preso à altura da barra, sobreposto ao conteúdo. */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#084B8E] z-40 animate-fade-in">
          <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-8">
            <Image
              src="/images/logo-icone-transparente.png"
              alt="Condominiando"
              width={80}
              height={80}
              className="mb-4 opacity-0 animate-scale-in"
            />
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-light text-ice/90 hover:text-gold transition-colors opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${(i + 1) * 0.08}s`, animationFillMode: "forwards" }}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-6 mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-ice/60 hover:text-gold transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
