/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope

// mantém o cache do PWA (injetado no build)
precacheAndRoute(self.__WB_MANIFEST)

// recebe a notificação enviada pelo servidor
self.addEventListener('push', (event) => {
  let dados: { titulo?: string; corpo?: string; url?: string } = {}
  try {
    dados = event.data ? event.data.json() : {}
  } catch {
    dados = {}
  }
  const titulo = dados.titulo ?? 'Êxodo'
  const corpo = dados.corpo ?? 'Hora do seu encontro com Deus 🌅'
  const url = dados.url ?? '/?go=devocional'
  event.waitUntil(
    self.registration.showNotification(titulo, {
      body: corpo,
      icon: '/icons/icon.svg',
      badge: '/icons/icon.svg',
      data: { url },
    }),
  )
})

// ao tocar: foca uma aba existente ou abre uma nova no devocional
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data?.url as string) ?? '/?go=devocional'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const c of clients) {
        if ('focus' in c) {
          c.navigate(url)
          return c.focus()
        }
      }
      return self.clients.openWindow(url)
    }),
  )
})
