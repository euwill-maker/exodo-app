import { useState } from 'react'
import { useApp } from '../state/AppContext'

export function Auth() {
  const { signIn, signUp, resetarSenha } = useApp()
  const [modo, setModo] = useState<'entrar' | 'criar' | 'recuperar'>('entrar')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [msg, setMsg] = useState('')
  const [carregando, setCarregando] = useState(false)

  const enviar = async () => {
    setErro('')
    setMsg('')
    if (modo === 'recuperar') {
      if (!email.trim()) return setErro('Digite seu e-mail.')
      setCarregando(true)
      const r = await resetarSenha(email)
      setCarregando(false)
      if (r.erro) setErro(r.erro)
      else setMsg('Enviamos um link de recuperação para o seu e-mail. ✉️')
      return
    }
    if (!email.trim() || !senha) return setErro('Preencha e-mail e senha.')
    if (modo === 'criar' && !nome.trim()) return setErro('Como você quer ser chamado?')
    setCarregando(true)
    const r = modo === 'entrar' ? await signIn(email, senha) : await signUp(email, senha, nome)
    setCarregando(false)
    if (r.erro) setErro(r.erro)
  }

  const input =
    'mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-dourado'

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 max-w-md mx-auto animate-fadeUp">
      <div className="text-center mb-6">
        <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-dourado/20 blur-2xl animate-floatGlow" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-dourado/40 bg-white/5">
            <span className="font-title text-5xl font-extrabold text-dourado text-glow">Ê</span>
          </div>
        </div>
        <h1 className="font-title text-4xl text-dourado text-glow">Êxodo</h1>
        <p className="mt-2 text-cinza/80">Da escravidão para a liberdade.</p>
      </div>

      {modo !== 'recuperar' && (
        <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1 mb-5">
          {(['entrar', 'criar'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setModo(m)
                setErro('')
                setMsg('')
              }}
              className={`flex-1 rounded-lg py-2 text-sm font-title font-semibold transition ${
                modo === m ? 'bg-dourado text-azul' : 'text-cinza/70'
              }`}
            >
              {m === 'entrar' ? 'Entrar' : 'Criar conta'}
            </button>
          ))}
        </div>
      )}

      {modo === 'recuperar' && (
        <p className="text-cinza/80 text-sm mb-2">
          Digite seu e-mail e enviaremos um link para criar uma nova senha.
        </p>
      )}

      {modo === 'criar' && (
        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className={input} />
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail"
        autoComplete="email"
        className={input}
      />
      {modo !== 'recuperar' && (
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha (mín. 6 caracteres)"
          autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'}
          onKeyDown={(e) => e.key === 'Enter' && enviar()}
          className={input}
        />
      )}

      {erro && <p className="mt-3 text-sm text-red-400">{erro}</p>}
      {msg && <p className="mt-3 text-sm text-green-400">{msg}</p>}

      <button
        onClick={enviar}
        disabled={carregando}
        className="mt-6 w-full rounded-xl bg-gradient-to-b from-dourado-claro to-dourado py-3.5 font-title font-bold text-azul shadow-glow-sm active:scale-[0.98] transition disabled:opacity-50"
      >
        {carregando
          ? 'Aguarde...'
          : modo === 'entrar'
            ? 'Entrar'
            : modo === 'criar'
              ? 'Criar minha conta'
              : 'Enviar link de recuperação'}
      </button>

      {modo === 'entrar' && (
        <button
          onClick={() => {
            setModo('recuperar')
            setErro('')
            setMsg('')
          }}
          className="mt-4 text-center text-cinza/60 text-sm underline"
        >
          Esqueci minha senha
        </button>
      )}
      {modo === 'recuperar' && (
        <button
          onClick={() => {
            setModo('entrar')
            setErro('')
            setMsg('')
          }}
          className="mt-4 text-center text-cinza/60 text-sm underline"
        >
          Voltar para o login
        </button>
      )}

      <p className="mt-5 text-center text-cinza/40 text-xs">
        Ao continuar, você concorda com os{' '}
        <a
          href="https://euwill-maker.github.io/exodo-site/termos.html"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          Termos
        </a>{' '}
        e a{' '}
        <a
          href="https://euwill-maker.github.io/exodo-site/privacidade.html"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  )
}
