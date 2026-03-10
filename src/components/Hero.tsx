"use client";

import Image from "next/image";
import { PlayIcon, ArrowRightIcon } from "./Icons";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex items-center justify-center overflow-hidden py-28 sm:py-36"
    >
      {/* Background */}
      <div className="absolute inset-0 hero-spotlight" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-24 pb-16 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="relative mb-2 opacity-0 animate-scale-in">
          <div className="absolute inset-0 blur-3xl bg-gold/10 rounded-full scale-110" />
          <Image
            src="/images/logo-transparente.png"
            alt="Condominiando com Rafael Zanin"
            width={550}
            height={550}
            className="relative drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-float w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[550px] lg:h-[550px]"
            priority
          />
        </div>

        {/* Hidden h1 for SEO */}
        <h1 className="sr-only">Condominiando com Rafael Zanin</h1>

        {/* Subtitle */}
        <p className="text-ice-soft text-base sm:text-lg max-w-lg mb-3 font-light leading-relaxed opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: "forwards" }}>
          O programa que desvenda o universo condominial
        </p>

        {/* Live badge */}
        <div className="opacity-0 animate-fade-in-up delay-300 mb-5" style={{ animationFillMode: "forwards" }}>
          <div className="live-badge inline-flex items-center gap-3 pl-6 pr-5 py-2.5 rounded-full border border-ice/15 bg-white/5 backdrop-blur-sm">
            <span className="text-ice/90 text-sm font-medium tracking-wide">
              Toda terça-feira, ao vivo, às 20h
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up delay-400" style={{ animationFillMode: "forwards" }}>
          <a
            href="https://www.youtube.com/@condominiando"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base"
          >
            <PlayIcon className="w-5 h-5" />
            Assista no YouTube
          </a>
          <a
            href="https://www.youtube.com/playlist?list=PL8pGApzVLHk7b82Abgqo_5jmSlrq5ziF2"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base"
          >
            Assista na Nova TV Alto Tietê
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D5BA8] to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in delay-800" style={{ animationFillMode: "forwards" }}>
        <div className="w-6 h-10 rounded-full border-2 border-ice/20 flex justify-center pt-2">
          <div className="w-1 h-2.5 rounded-full bg-ice/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
