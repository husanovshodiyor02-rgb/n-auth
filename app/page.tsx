import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { SignOutButton } from "./components/SignOutButton"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container">
      <div className="card">
        <div className="profile">
          {session.user.image && (
            <img src={session.user.image} alt={session.user.name || "User"} />
          )}
          <h2>{session.user.name}</h2>
          <p>{session.user.email}</p>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}
