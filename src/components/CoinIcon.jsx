// Inline SVG coin illustration used as a lightweight placeholder image.
// Replaces the multi-megabyte PNGs the project used to ship.
export default function CoinIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Coin"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="coinFace" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#b98cf0" />
          <stop offset="60%" stopColor="#833ae0" />
          <stop offset="100%" stopColor="#5a249e" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#coinFace)" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#4a1b86" strokeWidth="3" />
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeDasharray="3 4"
      />
      <text
        x="50"
        y="64"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="34"
        fontWeight="700"
        fill="#ffffff"
      >
        ¢
      </text>
    </svg>
  );
}
