import { UserInfo } from "@/components/user-info"
import { currentUser } from "@/lib/auth"
import { ExtendedUser } from "@/next-auth"

const ServerPage = async () => {
  const user = (await currentUser()) as ExtendedUser

  return <UserInfo label="💻 Server Component" user={user} />
}

export default ServerPage
