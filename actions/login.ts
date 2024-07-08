"use server"

import { signIn } from "@/auth"
import { findUserByEmail } from "@/data/user"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail"
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token"
import { db } from "@/lib/db"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password, code } = validatedFields.data

  const existingUser = await findUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" }
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password)

  if (!passwordMatch) {
    return { error: "Password wrong!" }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    )

    await sendVerificationEmail(
      verificationToken?.email as string,
      verificationToken?.token as string
    )

    return { error: "Email not verified!", success: "Confirmation Email Sent!" }
  }

  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) {
        return { error: "Invalid Code" }
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid Code" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: "Code Expired" }
      }

      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      )

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorEmail(existingUser.email, twoFactorToken.token)

      return { twoFactor: true }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" }

        default:
          return { error: "Someting went wrong!" }
      }
    }

    throw error
  }
}
