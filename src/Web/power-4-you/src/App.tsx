import { useState, useEffect } from 'react'
import getUserTest from './api/getUserTest'

const App = () => {
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserTest()
        setUser(data.user)
        setLoading(false)
      } catch (err) {
        console.error('Error:', err)
        setError('Fehler beim Laden des Users')
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome</h1>
      {loading && <p>Lädt...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user && <p>Aktueller User: <strong>{user}</strong></p>}
    </div>
  )
}

export default App