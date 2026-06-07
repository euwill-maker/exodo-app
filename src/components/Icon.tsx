import type { ReactElement } from 'react'

export type IconName =
  | 'chains'
  | 'waves'
  | 'dune'
  | 'mountain'
  | 'sunrise'
  | 'home'
  | 'book'
  | 'pen'
  | 'medal'
  | 'shield'
  | 'plus'
  | 'target'
  | 'drop'
  | 'sun'
  | 'moon'
  | 'heart'
  | 'dumbbell'
  | 'leaf'
  | 'check'
  | 'trash'
  | 'back'
  | 'user'
  | 'pray'
  | 'sword'
  | 'flame'
  | 'music'
  | 'phone'

const PATHS: Record<IconName, ReactElement> = {
  // elo de corrente partido ao meio — saída da escravidão
  chains: (
    <>
      <path d="M10.8 5.5A5 5 0 0 0 10.8 18" />
      <path d="M13.2 5.5A5 5 0 0 1 13.2 18" />
    </>
  ),
  // mar aberto — caminho no meio das águas
  waves: (
    <>
      <path d="M10.5 4C6 8.5 6 15.5 10.5 20" />
      <path d="M13.5 4C18 8.5 18 15.5 13.5 20" />
      <path d="M3.5 17.5q2-2 4 0t4 0 4 0 4 0" />
    </>
  ),
  // dunas
  dune: (
    <>
      <path d="M3 16c3-5 6-5 9-1s5 3 9-2" />
      <path d="M3 20c4-3 7-3 10 0s6 1 8-1" />
    </>
  ),
  // montanha (Sinai) com brilho
  mountain: (
    <>
      <path d="M3 19l6-11 4 7 3-4 5 8z" />
      <path d="M9 8l2 3.5" />
      <circle cx="17" cy="6" r="1.4" />
    </>
  ),
  // sol nascente no horizonte
  sunrise: (
    <>
      <path d="M3 18h18" />
      <path d="M7.5 18a4.5 4.5 0 0 1 9 0" />
      <path d="M12 7.5V5M6.5 9.5L5 8M17.5 9.5L19 8" />
    </>
  ),
  // tenda / jornada
  home: (
    <>
      <path d="M4 19L12 5l8 14z" />
      <path d="M9 19l3-6 3 6" />
    </>
  ),
  // livro aberto
  book: (
    <>
      <path d="M12 6.5C10 5 7 4.5 4 5.5v12c3-1 6-.5 8 1 2-1.5 5-2 8-1v-12c-3-1-6-.5-8 1z" />
      <path d="M12 6.5v12" />
    </>
  ),
  // pena / escrita
  pen: (
    <>
      <path d="M5 19c4-9 9-13 15-14-1 6-5 11-14 13z" />
      <path d="M5 19l4-4" />
    </>
  ),
  // medalha
  medal: (
    <>
      <path d="M9 4l3 6 3-6" />
      <circle cx="12" cy="15" r="5" />
      <path d="M12 12.5l.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2L9.1 14.6l2-.3z" />
    </>
  ),
  // escudo
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  drop: (
    <>
      <path d="M12 3.5C12 3.5 6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
    </>
  ),
  moon: (
    <>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z" />
      <path d="M5 19c3-4 7-7 11-9" />
    </>
  ),
  check: (
    <>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
    </>
  ),
  back: (
    <>
      <path d="M15 5l-7 7 7 7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-4 12.5-4 14 0" />
    </>
  ),
  pray: (
    <>
      <path d="M12 3v8M8 21c0-5 1.5-8 4-10 2.5 2 4 5 4 10M9 11l-3 3M15 11l3 3" />
    </>
  ),
  sword: (
    <>
      <path d="M14.5 3.5H20V9l-9.5 9.5" />
      <path d="M14.5 9.5 9 4" opacity="0" />
      <path d="M4 20l3-3M6.5 17.5l-2.5-1 1-2.5L18 3.5" />
      <path d="M5 15l4 4" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3c2.5 3.5 5 5.5 5 9a5 5 0 0 1-10 0c0-1.6.7-2.8 1.7-3.8.4 1.2 1.1 1.8 2 1.8C12.2 8.5 11 6 12 3z" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l11-2v12" />
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="17" cy="16" r="2.4" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 3.5 9 4l1 4-2 1.5a11 11 0 0 0 5 5L14 12l4 1 .5 2.5a2 2 0 0 1-2 2.4A14 14 0 0 1 4 5.5a2 2 0 0 1 2.5-2z" />
    </>
  ),
}

export function Icon({
  name,
  size = 22,
  className = '',
  strokeWidth = 1.6,
}: {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}
