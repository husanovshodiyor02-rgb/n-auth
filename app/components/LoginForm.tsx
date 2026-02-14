"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Username yoki parol noto'g'ri")
      } else {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      setError("Xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: "github" | "netlify" | "yandex") => {
    setLoading(true)
    await signIn(provider, { callbackUrl: "/" })
  }

  return (
    <>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleCredentialsLogin} className="form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          required
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
          disabled={loading}
        />
        <button type="submit" className="button button-primary" disabled={loading}>
          {loading ? "Yuklanmoqda..." : "Kirish"}
        </button>
      </form>

      <div className="divider">yoki</div>

      <div className="form">
        <button
          onClick={() => handleOAuthLogin("github")}
          className="button button-secondary"
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub bilan kirish
        </button>
        <button
          onClick={() => handleOAuthLogin("netlify")}
          className="button button-secondary"
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#00C7B7">
            <path d="M17.13 9.68 22 7.59l-2.17-2.18-2.09 4.87zM14.4 11.27l-4.93-4.93-2.4 5.6 1.73 1.73 5.6-2.4zM11.27 14.4l-5.6 2.4-1.73-1.73 2.4-5.6 4.93 4.93zM9.68 17.13 7.59 22l-2.18-2.17 4.87-2.09zM22 16.41l-4.87-2.09-2.4 5.6 2.18 2.17L22 16.41zM2 7.59l4.87 2.09 2.4-5.6L7.09 2 2 7.59zM16.41 2l2.09 4.87 5.6-2.4L22 2h-5.59zM2 16.41 7.59 22l2.09-4.87-5.6-2.4L2 16.41z"/>
          </svg>
          Netlify bilan kirish
        </button>
        <button
          onClick={() => handleOAuthLogin("yandex")}
          className="button button-secondary"
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FC3F1D">
            <path d="M13.7 17.3V6.9h-1.4c-2.7 0-4.2 1.4-4.2 3.6 0 2.3 1.2 3.5 3.6 4.8l3.1 2.1-4.8 6.6H6.8l4.3-5.9c-2.8-1.6-4.6-3.5-4.6-6.7C6.5 7.5 9.1 5 13.3 5h4.4v17.3h-4z"/>
          </svg>
          Yandex bilan kirish
        </button>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#666" }}>
        <p>Test uchun:</p>
        <p>Username: <strong>emilys</strong></p>
        <p>Password: <strong>emilyspass</strong></p>
      </div>
    </>
  )
}
