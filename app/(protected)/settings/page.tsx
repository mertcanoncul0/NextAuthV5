"use server"

import { auth } from "@/auth"
import SettingsCard from "@/components/settings-card"
import { Card, CardHeader } from "@/components/ui/card"

const SettingsPage = async () => {
  const session = await auth()
  console.log(session)

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <h2 className="text-2xl font-semibold text-center">⚙︎ Settings</h2>
      </CardHeader>

      <SettingsCard user={session?.user} />
    </Card>
  )
}

export default SettingsPage
