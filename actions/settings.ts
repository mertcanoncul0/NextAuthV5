"use server"

import { auth } from "@/auth"
import { findUserByEmail, findUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { SettingsSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { z } from "zod"

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser()
  const session = (await auth()) as any

  if (!user) {
    return { error: "Unauthorized" }
  }

  const existingUser = await findUserById(user.id as string)

  if (!existingUser) {
    return { error: "User not found" }
  }

  if (user.isOAuth) {
    values.email = undefined
    values.password = undefined
    values.newPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if (values.email && values.email !== existingUser.email) {
    const user = await findUserByEmail(values.email)

    if (user && user.id !== existingUser.id) {
      return { error: "Email already in use" }
    }

    const verificationToken = await generateVerificationToken(values.email)

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: "Verification email sent!" }
  }

  if (values.password && values.newPassword && existingUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      existingUser.password
    )

    if (!passwordMatch) {
      return { error: "Password wrong!" }
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10)

    values.password = hashedPassword
    values.newPassword = undefined
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      ...values,
    },
  })

  return { success: "Settings updated!" }
}
