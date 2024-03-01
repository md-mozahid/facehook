import { useEffect } from 'react'
import { api } from '../api'
import { useAuth } from './useAuth'

export const useApi = () => {
  const { auth, setAuth } = useAuth()
  useEffect(() => {
    // add a request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // add a response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = auth?.refreshToken
            const response = await api.post('/auth/refresh-token', {
              refreshToken,
            })
            const { token } = response.data
            console.log(`New token: ${token}`)
            setAuth({ ...auth, authToken: token })

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          } catch (error) {
            console.error(error)
          }
        }

        return Promise.reject(error)
      }
    )

    // cleaner function
    return () => {
      api.interceptors.request.eject(requestInterceptor)
      api.interceptors.request.eject(responseInterceptor)
    }
  }, [auth.authToken])

  return { api }
}
