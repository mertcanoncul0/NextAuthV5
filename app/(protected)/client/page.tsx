"use client"

import { UserInfo } from "@/components/user-info"
import { useCurrentUser } from "@/hooks/use-current-user"
import { ExtendedUser } from "@/next-auth"

const ClientPage = () => {
  const user = useCurrentUser() as ExtendedUser

  return <UserInfo label="💻 Client Component" user={user} />
}

export default ClientPage
