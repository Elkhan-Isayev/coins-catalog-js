// Inline SVG coin illustration used in place of real photographs (none ship
// with the repo). Each coin is rendered deterministically from its own data —
// metal-based colours plus the denomination, country and year struck on the
// face — so every coin looks distinct while staying tiny and fully static.

// Colour palette per composition (outer, mid, inner highlight, ink).
const METALS = {
  gold: ['#f6d365', '#d4a017', '#9c6f00', '#5a3d00'],
  silver: ['#eef0f4', '#b9bcc6', '#83879a', '#33384a'],
  nickel: ['#e3e7ec', '#aeb6bf', '#7c858f', '#2f3a44'],
  steel: ['#d2dce6', '#90a2b6', '#5a6b7d', '#ffffff'],
};
const DEFAULT_METAL = ['#b98cf0', '#833ae0', '#5a249e', '#ffffff'];

function splitDenomination(denomination = '') {
  const [value, ...rest] = denomination.split(' ');
  return [value, rest.join(' ')];
}

export default function CoinIcon({ coin, className }) {
  const palette = (coin && METALS[coin.composition?.toLowerCase()]) || DEFAULT_METAL;
  const [light, mid, dark, ink] = palette;
  const gradientId = `coin-${coin ? coin.id : 'generic'}`;
  const [value, unit] = coin ? splitDenomination(coin.denomination) : ['¢', ''];

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      role="img"
      aria-label={coin ? `${coin.coin_name} coin` : 'Coin'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={gradientId} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor={light} />
          <stop offset="62%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="46" fill={`url(#${gradientId})`} />
      <circle cx="50" cy="50" r="46" fill="none" stroke={dark} strokeWidth="3" />
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke={ink}
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="2 3"
      />

      {coin ? (
        <>
          {coin.issuing_country && (
            <text
              x="50"
              y="28"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="7"
              letterSpacing="0.5"
              fill={ink}
              opacity="0.85"
            >
              {coin.issuing_country.toUpperCase()}
            </text>
          )}

          <text
            x="50"
            y={unit ? 52 : 56}
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize="22"
            fontWeight="700"
            fill={ink}
          >
            {value}
          </text>
          {unit && (
            <text
              x="50"
              y="64"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="8"
              fill={ink}
              opacity="0.9"
            >
              {unit}
            </text>
          )}

          {coin.coin_year && (
            <text
              x="50"
              y="78"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="8"
              fontWeight="700"
              fill={ink}
              opacity="0.85"
            >
              {coin.coin_year}
            </text>
          )}
        </>
      ) : (
        <text
          x="50"
          y="64"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="34"
          fontWeight="700"
          fill={ink}
        >
          ¢
        </text>
      )}
    </svg>
  );
}
