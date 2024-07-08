"use client"

import { cn } from "@/lib/utils"
import { Poppins as FontPoppins } from "next/font/google"

const fontPoppins = FontPoppins({
  subsets: ["latin"],
  weight: ["600"],
})

const Header = ({ label }: { label: string }) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-3xl font-semibold", fontPoppins.className)}>
        🔐 Auth
      </h1>

      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  )
}

export default Header
