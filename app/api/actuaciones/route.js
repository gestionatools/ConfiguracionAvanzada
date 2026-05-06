import { createSupabaseClient } from '../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const referencia = searchParams.get('referencia')

  if (!referencia) {
    return NextResponse.json({ error: 'referencia requerida' }, { status: 400 })
  }

  try {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
      .from('Urbanismo_Reglada_Actuaciones')
      .select('ExpedienteCodigo, ExpedienteAsunto, created_at')
      .eq('ReferenciaCatastal', referencia)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ data: data ?? [] })
  } catch (err) {
    console.error('Supabase error:', err)
    return NextResponse.json({ error: err.message ?? 'Error al cargar actuaciones' }, { status: 500 })
  }
}
