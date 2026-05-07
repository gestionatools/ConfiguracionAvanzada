'use client'

import { useEffect, useState, useCallback } from 'react'
import { getActuaciones } from '../actions/actuaciones'

const SKIP_FIELDS = ['ID', 'ReferenciaCatastral']

function formatCell(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  const d = new Date(value)
  if (typeof value === 'string' && value.length >= 10 && !isNaN(d)) {
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  }
  return String(value)
}

export default function ActuacionesModal({ referencia, onClose }) {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getActuaciones(referencia)
      .then(setRows)
      .catch((e) => setError(e.message))
  }, [referencia])

  const handleBackdrop = useCallback((e) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const columns = rows?.length
    ? Object.keys(rows[0]).filter((k) => !SKIP_FIELDS.includes(k))
    : []

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-nucleo-900/40 backdrop-blur-sm p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col border border-nucleo-100">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-nucleo-100">
          <div>
            <h2 className="text-base font-bold text-nucleo-800 tracking-wide">Actuaciones</h2>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">{referencia}</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-nucleo-700 hover:bg-nucleo-50 transition"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-auto flex-1 px-6 py-4">
          {/* Loading */}
          {rows === null && !error && (
            <div className="flex items-center justify-center py-16 text-slate-400 gap-3">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-sm">Cargando actuaciones…</span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
              <p className="text-slate-600 font-medium text-sm">Error al cargar los datos</p>
              <p className="text-slate-400 text-xs mt-1">{error}</p>
            </div>
          )}

          {/* Empty */}
          {rows !== null && !error && rows.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-300 gap-3">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M3 7h4v13H3V7zm7-4h4v17h-4V3zm7 8h4v9h-4v-9z" />
              </svg>
              <p className="text-sm">Sin actuaciones registradas</p>
            </div>
          )}

          {/* Table */}
          {rows !== null && !error && rows.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-nucleo-100">
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide pb-2 pr-6 whitespace-nowrap"
                      >
                        {col.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.ID ?? i}
                      className="border-b border-nucleo-50 hover:bg-nucleo-50/50 transition-colors"
                    >
                      {columns.map((col) => (
                        <td key={col} className="py-2.5 pr-6 text-nucleo-800 align-top whitespace-nowrap">
                          {formatCell(row[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-right text-xs text-slate-300 mt-4">
                {rows.length} actuación{rows.length !== 1 ? 'es' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
