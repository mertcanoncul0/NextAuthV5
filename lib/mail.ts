import { Resend } from "resend"

const resend = new Resend(`${process.env.RESEND_API_KEY}`)

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Token",
    html: `<p>Your 2FA Code ${token}</p>`,
  })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `Please click the following link to reset your password: <a href="${resetLink}">Reset Link</a>`,
  })
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
  console.log(email, token)

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email address",
    html: `Please click the following link to confirm your email address: <a href="${confirmLink}">Confirm Link</a>`,
  })
}
