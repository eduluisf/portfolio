export default function DecorRadial({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Degradado radial (ajusta colores/opacidades a tu gusto) */}
        <radialGradient id="heroGrad" cx="55%" cy="50%" r="50%">
          <stop offset="0%"  stopColor="rgba(121,124,255,0.35)" />  {/* #797CFF */}
          <stop offset="35%" stopColor="rgba(52,209,190,0.25)" />  {/* #34D1BE */}
          <stop offset="60%" stopColor="rgba(9,11,155,0.15)" />    {/* #090B9B */}
          <stop offset="70%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Máscara: círculo blanco menos un sector negro (el corte) */}
        <mask id="heroCut" maskUnits="userSpaceOnUse">
          <rect width="100%" height="100%" fill="black" />
          <circle cx="500" cy="500" r="500" fill="white" />
          {/* Wedge desde -30° a 45° (ajustable) */}
          <path
            d="M500 500 L933.013 250 A500 500 0 0 1 853.553 853.553 Z"
            fill="black"
          />
        </mask>
      </defs>

      <g mask="url(#heroCut)">
        <circle cx="500" cy="500" r="500" fill="url(#heroGrad)" />
        {/* Borde sutil */}
        <circle
          cx="500" cy="500" r="499"
          fill="none" stroke="rgba(255,255,255,0.10)"
        />
      </g>
    </svg>
  );
}
