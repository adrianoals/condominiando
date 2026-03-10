interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionTitle({ title, subtitle, align = "center" }: SectionTitleProps) {
  return (
    <div className={`mb-14 ${align === "center" ? "text-center" : "text-left"}`}>
      <h2
        className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ice tracking-tight leading-tight mb-3"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-ice/60 text-base sm:text-lg font-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="section-divider w-20 mx-auto mt-6" style={align === "left" ? { marginLeft: 0 } : {}} />
    </div>
  );
}
