import { useState } from 'react'
import { useApp } from '../state/AppContext'

export function RedefinirSenha() {
  const { atualizarSenha } = useApp()
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const salvar = async () => {
    setErro('')
    if (senha.length < 6) return setErro('A senha precisa ter ao menos 6 caracteres.')
    setCarregando(true)
    const r = await atualizarSenha(senha)
    setCarregando(false)
    if (r.erro) setErro(r.erro)
    // sucesso: o estado `recuperandoSenha` vira false e o app segue logado
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 max-w-md mx-auto animate-fadeUp">
      <h1 className="font-title text-3xl text-dourado text-glow text-center">Criar nova senha</h1>
      <p className="text-cinza/80 text-center mt-2">Defina uma nova senha para a sua conta.</p>
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Nova senha (mín. 6 caracteres)"
        autoComplete="new-password"
        onKeyDown={(e) => e.key === 'Enter' && salvar()}
        className="mt-6 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado"
      />
      {erro && <p className="mt-3 text-sm text-red-400">{erro}</p>}
      <button
        onClick={salvar}
        disabled={carregando}
        className="mt-6 w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition disabled:opacity-50"
      >
        {carregando ? 'Salvando...' : 'Salvar nova senha'}
      </button>
    </div>
  )
}
