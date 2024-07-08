"use server"

import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import { z } from "zod"

export const findUserByEmail = async (email: string) =>
  await db.user.findUnique({ where: { email } })

export const findUserById = async (id: string) =>
  await db.user.findUnique({ where: { id } })

export const createUser = async (values: z.infer<typeof RegisterSchema>) =>
  db.user.create({ data: values })
