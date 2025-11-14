import React from "react";
import Slack from "../../../../assets/HeroSectionLogos/slack.png";
import Spotify from "../../../../assets/HeroSectionLogos/spotify.png";
import Asana from '../../../../assets/HeroSectionLogos/asana.png';

const LOGOS = [
  { src: Spotify, alt: "Spotify" },
  { src: Slack, alt: "Slack" },
  { src: "/placeholder-logo.png", alt: "Adobe" },
  { src: {Asana}, alt: "Asana" },
  { src: "/placeholder-logo.png", alt: "Linear" },
];

export default function CompanyLogos() {
  return (
    <div className="flex flex-wrap justify-center gap-6 pb-12 bg-black">
      {LOGOS.map((logo, idx) => (
        <div
          key={idx}
          className="flex items-center justify-center bg-white/5 rounded-md p-3 w-28 h-14 md:w-32 md:h-16"
          role="img"
          aria-label={logo.alt}
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}