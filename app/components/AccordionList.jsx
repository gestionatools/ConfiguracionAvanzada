'use client'

import { useState, useMemo } from 'react'
import AccordionItem from './AccordionItem'

const SEARCH_FIELDS = [
  'referencia_catastral',
  'clase_suelo',
  'categoria_suelo',
  'zonificacion',
  'instrumento_planeamiento',
  'titular_NIF',
  'ambito_codigo',
  'ordenanza',
]

export default function AccordionList({ data, actuacionesMap = {} }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return data
    return data.filter((row) =>
      SEARCH_FIELDS.some((field) =>
        String(row[field] ?? '').toLowerCase().includes(q)
      )
    )
  }, [data, query])

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-nucleo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por referencia catastral, zonificación…"
          className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-nucleo-200
                     text-nucleo-800 placeholder-nucleo-200 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent
                     transition"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-4 flex items-center text-nucleo-200 hover:text-nucleo-500 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-sm text-nucleo-500">
          {filtered.length === data.length
            ? `${data.length} expediente${data.length !== 1 ? 's' : ''}`
            : `${filtered.length} de ${data.length} expedientes`}
        </p>
        {query && filtered.length === 0 && (
          <span className="text-sm text-slate-400">Sin resultados para &ldquo;{query}&rdquo;</span>
        )}
      </div>

      {/* Accordion items */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-nucleo-100 p-12 text-center text-nucleo-200">
          {data.length === 0
            ? 'No hay expedientes en la base de datos.'
            : 'No se encontraron resultados para esta búsqueda.'}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((row) => (
            <AccordionItem
              key={row.ID}
              row={row}
              actuaciones={actuacionesMap[row.referencia_catastral] ?? []}
            />
          ))}
        </div>
      )}
    </div>
  )
}
