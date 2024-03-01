import { useEffect, useState } from 'react'
import { useApi } from '../hooks/useApi'
import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { api } = useApi()
  const { auth } = useAuth()

  useEffect(() => {
    setLoading(true)
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profile/${auth?.user?.id}`)
        setUser(response?.data?.user)
        setPosts(response?.data?.posts)
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

     fetchProfile()
  }, [auth.user.id])

  if (loading) {
    return <div className="">Fetching your profile data...</div>
  }
  return (
    <>
      Welcome, {user?.firstName} {user?.lastName}
      <p>You have {posts.length} posts.</p>
    </>
  )
}
