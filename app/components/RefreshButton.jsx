'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { revalidateHome } from '../actions'

export default function RefreshButton() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  async function handleRefresh() {
    setIsPending(true)
    try {
      await revalidateHome()
      router.refresh()
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg border border-nucleo-200
                 bg-white text-nucleo-600 text-xs font-semibold tracking-wide
                 hover:bg-nucleo-50 hover:border-nucleo-300 transition disabled:opacity-60"
    >
      <svg
        className={`w-4 h-4 transition-transform ${isPending ? 'animate-spin' : ''}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      REFRESCAR
    </button>
  )
}
