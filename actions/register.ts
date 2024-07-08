"use server"

import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { createUser, findUserByEmail } from "../data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "error" }
  }

  const { name, email, password } = validatedFields.data

  const hashedPassword = await bcrypt.hash(password, 10)
  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    return { error: "User already exists" }
  }

  const newUser = await createUser({ email, name, password: hashedPassword })

  if (!newUser) {
    return { error: "Error creating user" }
  }

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(
    verificationToken?.email as string,
    verificationToken?.token as string
  )

  return { success: "Confirmation email sent!" }
}
