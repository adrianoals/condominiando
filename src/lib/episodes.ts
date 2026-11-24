/**
 * Episódios completos do programa: as lives do canal @condominiando, lidas do feed RSS
 * público do YouTube. "UULV" + id do canal sem o "UC" é a playlist automática de lives
 * (a de uploads, "UU", mistura os Shorts).
 */
export const EPISODES_PLAYLIST_ID = "UULVeG1B1M1pZHfL9ltmmcgsPw";
export const EPISODES_PLAYLIST_URL = "https://www.youtube.com/@condominiando/streams";

export type Episode = {
  id: string;
  title: string;
  /** Rótulo curto, ex.: "Episódio 079/2026". */
  label: string;
  /** Número do episódio, ex.: "079". */
  number?: string;
  /** Temporada, quando o título informa ("TEMPORADA 2"). */
  season?: number;
  /** ISO 8601 */
  published: string;
};

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const pick = (xml: string, tag: string) => xml.match(new RegExp(`<${tag}>([^<]*)</${tag}>`))?.[1];

export async function getEpisodes(): Promise<Episode[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${EPISODES_PLAYLIST_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const xml = await res.text();

    const seen = new Set<string>();
    const episodes: Episode[] = xml
      .split("<entry>")
      .slice(1)
      .flatMap((entry) => {
        const id = pick(entry, "yt:videoId");
        const title = pick(entry, "title");
        const published = pick(entry, "published");
        if (!id || !title || !published) return [];
        const clean = decode(title).trim();
        const num = clean.match(/(\d{2,3}\/\d{4})/)?.[1];
        const label = num ? `Episódio ${num}` : clean;
        // Live reenviada com o mesmo número: fica só a mais recente.
        if (seen.has(label)) return [];
        seen.add(label);
        const season = Number(clean.match(/TEMPORADA\s*(\d+)/i)?.[1]) || undefined;
        return [{ id, title: clean, label, number: num?.split("/")[0], season, published }];
      });
    // Mais recente primeiro, independente da ordem do feed.
    return episodes.sort((a, b) => b.published.localeCompare(a.published));
  } catch {
    return [];
  }
}
