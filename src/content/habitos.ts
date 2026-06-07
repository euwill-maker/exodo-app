export interface HabitoSugerido {
  nome: string
  icone: string // nome de ícone (Icon.tsx)
}

export const HABITOS_SUGERIDOS: HabitoSugerido[] = [
  { nome: 'Beber água', icone: 'drop' },
  { nome: 'Ler a Bíblia', icone: 'book' },
  { nome: 'Orar', icone: 'pray' },
  { nome: 'Exercício físico', icone: 'dumbbell' },
  { nome: 'Acordar cedo', icone: 'sun' },
  { nome: 'Dormir cedo', icone: 'moon' },
  { nome: 'Gratidão', icone: 'heart' },
  { nome: 'Caminhar ao ar livre', icone: 'leaf' },
]
