"use client"

import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

type LoginButtonProps = {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild = false,
}: LoginButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push("/auth/login")
  }

  if (mode === "modal") {
    return <span>TODO: Implement modal</span>
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
