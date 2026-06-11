import { useEffect } from 'react'

// Gesto "arrastar da borda esquerda pra direita" = voltar (igual app nativo).
// Só dispara quando o toque começa bem na borda esquerda, pra não atrapalhar
// rolagem, sliders ou outros gestos no meio da tela.
export function useSwipeBack(onBack: () => void) {
  useEffect(() => {
    let startX = 0
    let startY = 0
    let rastreando = false

    const inicio = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t && t.clientX <= 32) {
        rastreando = true
        startX = t.clientX
        startY = t.clientY
      } else {
        rastreando = false
      }
    }

    const fim = (e: TouchEvent) => {
      if (!rastreando) return
      rastreando = false
      const t = e.changedTouches[0]
      if (!t) return
      const dx = t.clientX - startX
      const dy = Math.abs(t.clientY - startY)
      // movimento claramente horizontal pra direita
      if (dx > 70 && dy < 60) onBack()
    }

    window.addEventListener('touchstart', inicio, { passive: true })
    window.addEventListener('touchend', fim, { passive: true })
    return () => {
      window.removeEventListener('touchstart', inicio)
      window.removeEventListener('touchend', fim)
    }
  }, [onBack])
}
