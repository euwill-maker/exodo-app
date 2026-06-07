import { useEffect, useState } from 'react'
import { lerFoto, salvarFoto } from '../lib/storage'
import { novoId } from '../state/AppContext'
import { Icon } from './Icon'

/* Galeria que carrega os blobs do IndexedDB e mostra as miniaturas. */
export function Fotos({
  ids,
  onRemover,
  alturaGrande = false,
}: {
  ids: string[]
  onRemover?: (id: string) => void
  alturaGrande?: boolean
}) {
  const [urls, setUrls] = useState<Record<string, string>>({})

  useEffect(() => {
    let ativo = true
    const criados: string[] = []
    ;(async () => {
      const map: Record<string, string> = {}
      for (const id of ids) {
        const blob = await lerFoto(id)
        if (blob) {
          const u = URL.createObjectURL(blob)
          map[id] = u
          criados.push(u)
        }
      }
      if (ativo) setUrls(map)
    })()
    return () => {
      ativo = false
      criados.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [ids.join(',')]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!ids.length) return null
  const h = alturaGrande ? 'h-36' : 'h-24'
  return (
    <div className="grid grid-cols-3 gap-2">
      {ids.map((id) =>
        urls[id] ? (
          <div key={id} className="relative">
            <img src={urls[id]} alt="" className={`${h} w-full rounded-xl border border-white/10 object-cover`} />
            {onRemover && (
              <button
                onClick={() => onRemover(id)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <Icon name="trash" size={13} />
              </button>
            )}
          </div>
        ) : (
          <div key={id} className={`${h} animate-pulse rounded-xl bg-white/5`} />
        ),
      )}
    </div>
  )
}

/* Botão que abre a câmera/galeria, salva os blobs e devolve os ids. */
export function AddFotos({ onAdd }: { onAdd: (ids: string[]) => void }) {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const ids: string[] = []
    for (const f of files) {
      const id = novoId()
      await salvarFoto(id, f)
      ids.push(id)
    }
    if (ids.length) onAdd(ids)
    e.target.value = ''
  }
  return (
    <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-dourado/40 py-3 text-sm text-dourado active:scale-[0.99] transition">
      <Icon name="plus" size={18} /> Adicionar fotos
      <input type="file" accept="image/*" multiple onChange={onChange} className="hidden" />
    </label>
  )
}
