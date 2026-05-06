'use client'

import { useState, useEffect, useCallback } from 'react'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function ActuacionesModal({ referenciaCatastral, onClose }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchActuaciones() {
      try {
        const res = await fetch(`/api/actuaciones?referencia=${encodeURIComponent(referenciaCatastral)}`)
        const json = await res.json()
        if (!res.ok) throw new Error(json.error ?? 'Error al cargar')
        setData(json.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchActuaciones()
  }, [referenciaCatastral])

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-nucleo-100">
          <div>
            <h2 className="text-base font-bold text-nucleo-800">Actuaciones</h2>
            <p className="text-xs text-nucleo-400 mt-0.5 font-mono">{referenciaCatastral}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-nucleo-400 hover:bg-nucleo-50 hover:text-nucleo-700 transition"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-auto flex-1 px-6 py-4">
          {loading && (
            <div className="flex items-center justify-center py-12 text-nucleo-300 text-sm">
              Cargando actuaciones…
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="flex items-center justify-center py-12 text-nucleo-300 text-sm">
              No hay actuaciones registradas para esta referencia.
            </div>
          )}

          {!loading && !error && data.length > 0 && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-bold text-nucleo-400 uppercase tracking-wide border-b border-nucleo-100">
                  <th className="pb-2 pr-4 w-36">Código Expediente</th>
                  <th className="pb-2 pr-4">Asunto</th>
                  <th className="pb-2 w-36">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-nucleo-50">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-nucleo-50 transition">
                    <td className="py-2.5 pr-4 font-mono text-nucleo-700 align-top">
                      {row.ExpedienteCodigo ?? '—'}
                    </td>
                    <td className="py-2.5 pr-4 text-nucleo-800 align-top">
                      {row.ExpedienteAsunto ?? '—'}
                    </td>
                    <td className="py-2.5 text-nucleo-500 align-top whitespace-nowrap">
                      {formatDate(row.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && data.length > 0 && (
          <div className="px-6 py-3 border-t border-nucleo-50 text-right text-xs text-nucleo-300">
            {data.length} actuación{data.length !== 1 ? 'es' : ''}
          </div>
        )}
      </div>
    </div>
  )
}
