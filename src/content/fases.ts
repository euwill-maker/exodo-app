import type { Fase } from '../types'

export const FASES: Fase[] = [
  {
    id: 'egito',
    nome: 'Egito',
    tema: 'Decisão',
    minDias: 0,
    maxDias: 7,
    mensagem: 'Você decidiu sair da escravidão.',
  },
  {
    id: 'mar-vermelho',
    nome: 'Travessia do Mar Vermelho',
    tema: 'Rompimento',
    minDias: 7,
    maxDias: 30,
    mensagem: 'O mar se abriu. Não volte atrás.',
  },
  {
    id: 'deserto',
    nome: 'Deserto',
    tema: 'Perseverança',
    minDias: 30,
    maxDias: 90,
    mensagem: 'A transformação acontece aqui.',
  },
  {
    id: 'monte-sinai',
    nome: 'Monte Sinai',
    tema: 'Fortalecimento',
    minDias: 90,
    maxDias: 180,
    mensagem: 'Sua mente está sendo renovada.',
  },
  {
    id: 'terra-prometida',
    nome: 'Terra Prometida',
    tema: 'Liberdade',
    minDias: 180,
    maxDias: null,
    mensagem: 'Você não é mais escravo.',
  },
]
