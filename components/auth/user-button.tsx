"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogOut, LogOutIcon } from "lucide-react"
import { logout } from "@/actions/logout"

const UserButton = () => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.image || ""}
            className="h-12 w-12 rounded-full"
          />
          <AvatarFallback className="bg-sky-500 h-12 w-12 rounded-full flex items-center justify-center p-2">
            <FaUser className="text-white h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => await logout()}
        >
          <LogOutIcon className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
