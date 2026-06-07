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
