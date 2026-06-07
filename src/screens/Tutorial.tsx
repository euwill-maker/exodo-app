import { useState } from 'react'
import { useApp } from '../state/AppContext'
import { Icon, type IconName } from '../components/Icon'

interface Slide {
  icone: IconName
  titulo: string
  texto: string
  destaque?: boolean
}

const SLIDES: Slide[] = [
  {
    icone: 'mountain',
    titulo: 'Sua travessia começa',
    texto:
      'Cada vício é uma batalha. Acompanhe seus dias livres e avance pelas 5 fases — do Egito à Terra Prometida.',
  },
  {
    icone: 'sword',
    titulo: 'Socorro na hora da tentação',
    texto:
      'Quando a vontade bater, toque em Modo Batalha: vista a Armadura de Deus, surfe a onda ou entre na Sala de Guerra. Você nunca luta sozinho.',
    destaque: true,
  },
  {
    icone: 'book',
    titulo: 'Cresça todos os dias',
    texto:
      'Devocionais por tema, hábitos saudáveis e um diário espiritual para fortalecer a sua mente e a sua fé.',
  },
  {
    icone: 'medal',
    titulo: 'Vença e seja recompensado',
    texto:
      'Cada vitória dá XP e sobe a sua patente. Desbloqueie conquistas e veja a sua liberdade crescer, um dia de cada vez.',
  },
]

export function Tutorial() {
  const { marcarTutorialVisto } = useApp()
  const [i, setI] = useState(0)
  const slide = SLIDES[i]
  const ultimo = i === SLIDES.length - 1

  return (
    <div className="min-h-screen px-6 py-8 max-w-md mx-auto flex flex-col">
      <button onClick={marcarTutorialVisto} className="self-end text-cinza/55 text-sm">
        Pular
      </button>

      <div className="flex-1 flex flex-col justify-center text-center animate-fadeUp" key={i}>
        <div
          className={`relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border ${
            slide.destaque
              ? 'border-terra/60 bg-terra/10 text-terra'
              : 'border-dourado/50 bg-dourado/10 text-dourado'
          } shadow-glow`}
        >
          <div className="absolute inset-0 rounded-full bg-dourado/10 blur-2xl animate-floatGlow" />
          <Icon name={slide.icone} size={52} />
        </div>
        <h2 className="font-title text-3xl text-dourado text-glow">{slide.titulo}</h2>
        <p className="mt-4 text-cinza/85 leading-relaxed px-2">{slide.texto}</p>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2 mb-6">
        {SLIDES.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx === i ? 'w-6 bg-dourado' : 'w-2 bg-white/15'
            }`}
          />
        ))}
      </div>

      <button
        onClick={() => (ultimo ? marcarTutorialVisto() : setI(i + 1))}
        className="w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition"
      >
        {ultimo ? 'Começar minha jornada →' : 'Próximo'}
      </button>
    </div>
  )
}
