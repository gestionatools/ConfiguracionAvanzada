'use client'

import { useEffect } from 'react'

export default function ActuacionesModal({ actuaciones, referencia, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-nucleo-100">
          <div>
            <h2 className="text-base font-bold text-nucleo-800">Actuaciones urbanísticas</h2>
            <p className="text-xs text-nucleo-400 mt-0.5 font-mono">{referencia}</p>
          </div>
          <button
            onClick={onClose}
            className="text-nucleo-300 hover:text-nucleo-600 transition rounded-lg p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {actuaciones.length === 0 ? (
            <p className="text-center text-nucleo-300 py-10">Sin actuaciones registradas</p>
          ) : (
            <div className="space-y-3">
              {actuaciones.map((act) => (
                <div key={act.id} className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {act.ExpedienteCodigo && (
                        <p className="text-xs font-semibold text-teal-600 tracking-wide uppercase mb-1">
                          {act.ExpedienteCodigo}
                        </p>
                      )}
                      <p className="text-sm text-nucleo-800 font-medium">
                        {act.ExpedienteAsunto ?? '—'}
                      </p>
                    </div>
                    <p className="text-xs text-nucleo-300 whitespace-nowrap flex-shrink-0 mt-0.5">
                      {new Date(act.created_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-nucleo-50 flex justify-between items-center">
          <span className="text-xs text-nucleo-300">
            {actuaciones.length} actuación{actuaciones.length !== 1 ? 'es' : ''}
          </span>
          <button
            onClick={onClose}
            className="text-xs text-nucleo-400 hover:text-nucleo-600 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
