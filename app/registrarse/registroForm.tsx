'use client'

import { useActionState } from 'react'
import { handleRegistro } from '../../modules/auth/auth.actions'
import Link from 'next/link'

type State = {
  error: string | null
}

export default function RegistroForm() {
  const [state, formAction, isPending] = useActionState<State, FormData>(
    handleRegistro,
    { error: null }
  )

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 border border-amber-400 rounded-4xl bg-zinc-900">
      <h2 className="text-4xl font-bold mb-6 items-center text-center text-yellow-600">
        Crear cuenta
      </h2>

      <form action={formAction} className="space-y-4">

        <input
          name="name"
          placeholder="Nombre"
          required
          className="w-full h-12 px-4 border"
        />

        <input
          name="email"
          type="email"
          placeholder="Correo"
          required
          className="w-full h-12 px-4 border"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          minLength={6}
          className="w-full h-12 px-4 border"
        />

        {state?.error && (
          <p className="text-red-500 text-sm">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-yellow-600 text-white"
        >
          {isPending ? 'Procesando...' : 'Registrarse'}
        </button>

      </form>

      <div className="mt-4">
        <Link href="/login" className="text-yellow-500">
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
      </div>
    </main>
  )
}