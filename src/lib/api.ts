import axios from "axios"

export async function fetchCurrentUser() {
  const token = localStorage.getItem("token")
  if (!token) return null
  try {
    const res = await axios.get("http://localhost:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch {
    return null
  }
}
