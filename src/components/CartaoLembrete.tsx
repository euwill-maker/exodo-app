import { useEffect, useState } from 'react'
import { useApp } from '../state/AppContext'
import { ativarLembretes, estadoLembrete, precisaInstalarNoIOS } from '../lib/push'

const FLAG = 'exodo:lembrete-pedido'

export function CartaoLembrete() {
  const { userId } = useApp()
  const [visivel, setVisivel] = useState(false)
  const [ios, setIos] = useState(false)
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(FLAG)) return
    if (precisaInstalarNoIOS()) {
      setIos(true)
      setVisivel(true)
      return
    }
    estadoLembrete().then((e) => setVisivel(e === 'inativo'))
  }, [])

  if (!visivel) return null

  const dispensar = () => {
    localStorage.setItem(FLAG, '1')
    setVisivel(false)
  }

  const ativar = async () => {
    if (!userId) return
    setCarregando(true)
    const r = await ativarLembretes(userId)
    setCarregando(false)
    localStorage.setItem(FLAG, '1')
    setVisivel(false)
    if (!r.ok && r.motivo === 'bloqueado') {
      alert(
        'As notificações estão bloqueadas no navegador. Você pode reativar nas configurações do site.',
      )
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-dourado/30 bg-gradient-to-b from-dourado/10 to-transparent p-4">
      <h3 className="font-title text-dourado">🌅 Um empurrãozinho diário?</h3>
      {ios ? (
        <>
          <p className="text-cinza/75 text-sm mt-1">
            Pra receber o lembrete diário no iPhone, toque em <b>Compartilhar</b> e em{' '}
            <b>"Adicionar à Tela de Início"</b>. Depois abra o Êxodo pela tela inicial.
          </p>
          <button onClick={dispensar} className="mt-3 text-cinza/60 text-sm underline">
            Entendi
          </button>
        </>
      ) : (
        <>
          <p className="text-cinza/75 text-sm mt-1">
            Te lembro todo dia da sua caminhada com Deus, pra você não perder o ritmo.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={ativar}
              disabled={carregando}
              className="flex-1 rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-2.5 font-title font-bold text-azul disabled:opacity-50"
            >
              {carregando ? 'Ativando...' : 'Ativar lembrete'}
            </button>
            <button
              onClick={dispensar}
              className="rounded-xl border border-white/12 px-4 text-cinza/70 text-sm"
            >
              Agora não
            </button>
          </div>
        </>
      )}
    </div>
  )
}
