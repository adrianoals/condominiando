import Image from "next/image";
import { YouTubeIcon, InstagramIcon, WhatsAppIcon, SpotifyIcon } from "./Icons";

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "O Programa", href: "#programa" },
  { label: "Assista", href: "#assista" },
  { label: "Apoiadores", href: "#apoiadores" },
];

const socialLinks = [
  { icon: YouTubeIcon, href: "https://www.youtube.com/@condominiando/streams", label: "YouTube" },
  { icon: InstagramIcon, href: "https://www.instagram.com/programacondominiando", label: "Instagram" },
  { icon: WhatsAppIcon, href: "https://whatsapp.com/channel/0029Vb6i8ebFi8xhrvh0yd1d", label: "WhatsApp" },
  { icon: SpotifyIcon, href: "https://open.spotify.com/show/1QgGqT9ymCM0Pr6R9GRul2", label: "Spotify" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-ice/5" style={{ background: "#084B8E" }}>
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mobile: centralizado em coluna / Desktop: 3 colunas assimétricas */}
        <div className="flex flex-col items-center gap-8 md:hidden">
          <Image
            src="/images/logo-transparente.png"
            alt="Condominiando com Rafael Zanin"
            width={180}
            height={180}
            className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          />
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-ice/50 hover:text-gold text-sm font-light transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-10 h-10 rounded-full border border-ice/10 flex items-center justify-center text-ice/40 hover:text-gold hover:border-gold/30 transition-all duration-300">
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Desktop: assimétrico — logo maior à esquerda, links no centro, sociais à direita */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_auto] items-center gap-12">
          {/* Logo — ocupa mais espaço à esquerda */}
          <div className="flex items-center gap-5">
            <Image
              src="/images/logo-transparente.png"
              alt="Condominiando com Rafael Zanin"
              width={180}
              height={180}
              className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            />
            <p className="text-ice/40 text-sm font-light max-w-[180px] leading-relaxed">
              O programa que desvenda o universo condominial
            </p>
          </div>

          {/* Links — coluna vertical no centro */}
          <nav className="flex flex-col gap-3">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-ice/50 hover:text-gold text-sm font-light transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Sociais — alinhadas à direita */}
          <div className="flex flex-col items-end gap-3">
            <p className="text-ice/30 text-xs font-light tracking-widest uppercase mb-1">Redes sociais</p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="w-10 h-10 rounded-full border border-ice/10 flex items-center justify-center text-ice/40 hover:text-gold hover:border-gold/30 transition-all duration-300">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-ice/5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-ice/30 text-xs font-light tracking-wide">
            © 2026 Condominiando com Rafael Zanin. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
