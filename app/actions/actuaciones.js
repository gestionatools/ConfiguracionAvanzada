'use server'

import { createSupabaseClient } from '../../lib/supabase'

export async function getActuaciones(referenciaCatastral) {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from('Urbanismo_Reglada_Actuaciones')
    .select('*')
    .eq('ReferenciaCatastral', referenciaCatastral)
    .order('ID', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}
