'use server'

import { registerUser } from './service'
import { redirect } from 'next/navigation'

type State = {
  error: string | null
}

export async function handleRegistro(
  prevState: State,
  formData: FormData
): Promise<State> {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Validaciones
  if (!name || !email || !password) {
    return { error: 'Todos los campos son obligatorios' }
  }

  if (password.length < 6) {
    return { error: 'La contraseña debe tener mínimo 6 caracteres' }
  }

  try {
    await registerUser({ name, email, password })

    // 🔥 redirige si todo sale bien
    redirect('/login')

  } catch (error: any) {
    return { error: error.message || 'Error al registrar' }
  }
}