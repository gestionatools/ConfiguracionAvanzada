import { createSupabaseClient } from '../lib/supabase'
import AccordionList from './components/AccordionList'
import RefreshButton from './components/RefreshButton'

export const dynamic = 'force-dynamic'

async function getUrbanismoData() {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('Urbanismo_Reglada')
      .select('*')
      .order('ID', { ascending: true })

    if (error) throw error
    return { data: data ?? [], error: null }
  } catch (err) {
    console.error('Supabase error:', err)
    return { data: [], error: err.message ?? 'Error al conectar con la base de datos' }
  }
}

async function getActuacionesMap() {
  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('Urbanismo_Reglada_Actuaciones')
      .select('*')

    if (error) throw error
    const map = {}
    for (const act of (data ?? [])) {
      const key = act.ReferenciaCatastal ?? ''
      if (!map[key]) map[key] = []
      map[key].push(act)
    }
    return map
  } catch (err) {
    console.error('Supabase actuaciones error:', err)
    return {}
  }
}

export default async function Home() {
  const [{ data, error }, actuacionesMap] = await Promise.all([
    getUrbanismoData(),
    getActuacionesMap(),
  ])

  return (
    <div className="min-h-screen bg-nucleo-50">
      {/* Header */}
      <header className="bg-white border-b border-nucleo-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-nucleo-600 shadow">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 7h4v13H3V7zm7-4h4v17h-4V3zm7 8h4v9h-4v-9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-nucleo-800 leading-none">
              NÚCLEO
            </h1>
            <p className="text-xs font-medium tracking-wider text-teal-500 uppercase mt-0.5">
              Sistema de Gestión Urbanística
            </p>
          </div>
          <RefreshButton />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700 font-medium">Error al cargar los datos</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        ) : (
          <AccordionList data={data} actuacionesMap={actuacionesMap} />
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-xs text-nucleo-200">
        NÚCLEO · Sistema de Gestión Urbanística
      </footer>
    </div>
  )
}
