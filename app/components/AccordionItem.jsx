'use client'

import { useState } from 'react'
import { COLUMN_LABELS, FIELD_GROUPS } from '../../lib/columnLabels'

const GROUP_STYLES = {
  nucleo:  { header: 'bg-nucleo-50  border-nucleo-200  text-nucleo-700',  dot: 'bg-nucleo-500' },
  teal:    { header: 'bg-teal-50    border-teal-200    text-teal-700',    dot: 'bg-teal-500'   },
  sky:     { header: 'bg-sky-50     border-sky-200     text-sky-700',     dot: 'bg-sky-400'    },
  blue:    { header: 'bg-blue-50    border-blue-200    text-blue-700',    dot: 'bg-blue-400'   },
  cyan:    { header: 'bg-cyan-50    border-cyan-200    text-cyan-700',    dot: 'bg-cyan-500'   },
  slate:   { header: 'bg-slate-50   border-slate-200   text-slate-700',   dot: 'bg-slate-400'  },
}

function formatValue(field, value) {
  if (value === null || value === undefined || value === '') return null

  if (field === 'licencia_urbanistica') {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        value ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-500'
      }`}>
        {value ? 'Sí' : 'No'}
      </span>
    )
  }

  if (field === 'construccion_fecha') {
    const d = new Date(value)
    if (isNaN(d)) return <span>{value}</span>
    return (
      <span>{d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
    )
  }

  if (field === 'doc_url') {
    return (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-600 hover:text-teal-800 underline underline-offset-2 break-all"
      >
        Ver documento ↗
      </a>
    )
  }

  if (field === 'edificabilidad_m2m2') {
    return <span>{Number(value).toFixed(2)}</span>
  }

  if (field === 'latitud' || field === 'longitud') {
    return <span>{Number(value).toFixed(6)}</span>
  }

  return <span>{String(value)}</span>
}

export default function AccordionItem({ row }) {
  const [open, setOpen] = useState(false)

  const municipio = row.municipio ?? '—'
  const ref = row.referencia_catastral ?? `Expediente #${row.ID}`
  const hasLicencia = row.licencia_urbanistica !== null && row.licencia_urbanistica !== undefined

  return (
    <div className="bg-white rounded-xl border border-nucleo-100 shadow-sm overflow-hidden transition hover:shadow-md">
      {/* Accordion header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
      >
        {/* Left accent bar */}
        <div className={`w-1 h-10 rounded-full flex-shrink-0 transition-colors ${
          open ? 'bg-teal-500' : 'bg-nucleo-200'
        }`} />

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-nucleo-800 text-sm truncate">{ref}</p>
          <p className="text-xs text-nucleo-500 mt-0.5 truncate">{municipio}</p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {row.clase_suelo && (
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-nucleo-50 text-nucleo-600 text-xs font-medium border border-nucleo-100">
              {row.clase_suelo}
            </span>
          )}
          {hasLicencia && (
            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
              row.licencia_urbanistica
                ? 'bg-teal-100 text-teal-700'
                : 'bg-slate-100 text-slate-500'
            }`}>
              {row.licencia_urbanistica ? 'Licencia ✓' : 'Sin licencia'}
            </span>
          )}
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-nucleo-300 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion body (CSS grid animation) */}
      <div className={`accordion-grid ${open ? 'open' : 'closed'}`}>
        <div>
          <div className="border-t border-nucleo-50 px-5 pb-5 pt-4 space-y-5">
            {FIELD_GROUPS.map((group) => {
              const style = GROUP_STYLES[group.color] ?? GROUP_STYLES.slate
              const visibleFields = group.fields.filter(
                (f) => row[f] !== null && row[f] !== undefined && row[f] !== ''
              )
              if (visibleFields.length === 0) return null

              return (
                <div key={group.label}>
                  {/* Group header */}
                  <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${style.header} rounded-t px-2 py-1.5`}>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                    <span className="text-xs font-bold tracking-wide uppercase">{group.label}</span>
                  </div>

                  {/* Fields grid */}
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 px-1">
                    {visibleFields.map((field) => (
                      <div key={field} className="flex flex-col gap-0.5">
                        <dt className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                          {COLUMN_LABELS[field] ?? field}
                        </dt>
                        <dd className="text-sm text-nucleo-800 font-medium">
                          {formatValue(field, row[field]) ?? <span className="text-slate-300">—</span>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )
            })}

            {/* ID footer */}
            <p className="text-right text-xs text-nucleo-100 pt-2 border-t border-nucleo-50">
              ID interno: {row.ID}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
