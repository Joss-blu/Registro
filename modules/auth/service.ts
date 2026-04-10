import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function registerUser({
  name,
  email,
  password
}: {
  name: string
  email: string
  password: string
}) {
  // Verificar duplicado
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('El usuario ya existe')
  }

  // Hash
  const hashedPassword = await bcrypt.hash(password, 10)

  // Guardar
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })
}