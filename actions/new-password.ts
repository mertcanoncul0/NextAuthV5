"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token"
import { findUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { NewPasswordSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { z } from "zod"

const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" }
  }

  const validateFields = NewPasswordSchema.safeParse(values)

  if (!validateFields.success) {
    return { error: "Invalid fields!" }
  }

  const { password } = validateFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: "Invalid token!" }
  }

  const hasExpried = new Date(existingToken.expires) < new Date()

  if (hasExpried) {
    return { error: "Token has expired!" }
  }

  const existingUser = await findUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  })

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  })

  return { success: "Password updated!" }
}

export default newPassword
