const svgToDataUri = (svg: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

export function buildGalleryImage(title: string, accent: string) {
  return {
    title,
    image: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="900" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFF8F0"/>
            <stop offset="1" stop-color="#F0FFF8"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="900" rx="60" fill="url(#bg)"/>
        <circle cx="310" cy="220" r="164" fill="${accent}" fill-opacity="0.18"/>
        <circle cx="890" cy="260" r="120" fill="${accent}" fill-opacity="0.24"/>
        <circle cx="840" cy="640" r="190" fill="#9B5DE5" fill-opacity="0.14"/>
        <rect x="150" y="420" width="900" height="260" rx="48" fill="white" fill-opacity="0.64"/>
        <text x="90" y="120" fill="#2C2C2C" font-family="Fredoka, Poppins, sans-serif" font-size="56" font-weight="700">${escapeXml(title)}</text>
        <path d="M220 610C340 470 420 460 520 560C600 636 710 680 880 500" stroke="${accent}" stroke-width="24" stroke-linecap="round" fill="none"/>
        <circle cx="360" cy="380" r="40" fill="${accent}"/>
        <circle cx="540" cy="470" r="34" fill="#FFEEAD"/>
        <circle cx="720" cy="415" r="38" fill="#4ECDC4"/>
        <circle cx="892" cy="530" r="42" fill="#9B5DE5"/>
      </svg>
    `),
    accent
  };
}

export function buildParentAvatar(name: string) {
  const accent = name.charCodeAt(0) % 2 === 0 ? '#4ECDC4' : '#FF6B6B';
  return svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#fff"/>
          <stop offset="100%" stop-color="#F0FFF8"/>
        </radialGradient>
      </defs>
      <rect width="640" height="640" rx="320" fill="url(#bg)"/>
      <circle cx="320" cy="300" r="140" fill="${accent}" fill-opacity="0.22"/>
      <circle cx="320" cy="254" r="92" fill="#fff"/>
      <circle cx="284" cy="244" r="11" fill="#2C2C2C"/>
      <circle cx="356" cy="244" r="11" fill="#2C2C2C"/>
      <path d="M282 286C301 310 339 310 358 286" stroke="#2C2C2C" stroke-width="10" stroke-linecap="round"/>
      <path d="M196 506C220 416 274 372 320 372C366 372 420 416 444 506" fill="${accent}" fill-opacity="0.58"/>
      <circle cx="210" cy="520" r="48" fill="#FFEEAD"/>
      <circle cx="430" cy="520" r="48" fill="#FFEEAD"/>
      <text x="320" y="560" text-anchor="middle" fill="#2C2C2C" font-family="Fredoka, Poppins, sans-serif" font-size="56" font-weight="700">${escapeXml(name.charAt(0))}</text>
    </svg>
  `);
}

export function buildFacilityPhoto(title: string, accent: string) {
  return {
    title,
    image: svgToDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="900" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FFF8F0"/>
            <stop offset="1" stop-color="#F0FFF8"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="900" rx="60" fill="url(#bg)"/>
        <rect x="120" y="160" width="960" height="580" rx="60" fill="white" fill-opacity="0.78"/>
        <circle cx="260" cy="300" r="100" fill="${accent}" fill-opacity="0.2"/>
        <circle cx="940" cy="272" r="120" fill="${accent}" fill-opacity="0.18"/>
        <circle cx="880" cy="600" r="140" fill="#9B5DE5" fill-opacity="0.12"/>
        <text x="170" y="300" fill="#2C2C2C" font-family="Fredoka, Poppins, sans-serif" font-size="72" font-weight="700">${escapeXml(title)}</text>
        <path d="M220 540H980" stroke="${accent}" stroke-width="20" stroke-linecap="round"/>
        <rect x="260" y="360" width="180" height="180" rx="34" fill="${accent}"/>
        <rect x="480" y="340" width="220" height="220" rx="42" fill="#45B7D1"/>
        <rect x="740" y="360" width="180" height="180" rx="34" fill="#FFEEAD"/>
        <circle cx="350" cy="450" r="38" fill="white"/>
        <circle cx="590" cy="450" r="46" fill="white"/>
        <circle cx="830" cy="450" r="38" fill="white"/>
      </svg>
    `),
    accent
  };
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
