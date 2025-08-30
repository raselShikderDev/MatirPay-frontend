export const MatirPayLogo = () => (
  <svg
    width="180"
    height="48"
    viewBox="0 0 180 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="MatirPay logo"
  >
    <title>MatirPay</title>

    {/* Icon */}
    <g transform="translate(4,4)">
      <rect x="0" y="0" width="40" height="40" rx="12" fill="#0EA5E9" />
      <path
        d="M8 26 C8 18, 14 18, 16 22
           C18 26, 22 26, 24 22
           C26 18, 32 18, 32 26"
        fill="none"
        stroke="white"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 12 v14" stroke="white" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M16 18 h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 22 h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M30 10 C34 10, 36 14, 32 16 C28 16, 26 12, 30 10 Z"
        fill="#86EFAC"
        opacity="0.9"
      />
    </g>

    {/* Wordmark */}
    <g
      fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
      fontWeight="700"
      fontSize="22"
      fill="#0F172A"
      transform="translate(52,31)"
    >
      <text>Matir</text>
      <text x="64" fill="#0EA5E9">
        Pay
      </text>
    </g>
  </svg>
);
