import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api, OAUTH2_TOKEN_URL, CLIENT_ID, CLIENT_SECRET } from '../api'
import type { ILoginForm } from '../interfaces/ILoginForm.ts'
import type { ISignupForm } from '../interfaces/ISignupForm.ts'

export const useUserStore = defineStore('userStore', () => {
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'))
  const refreshToken = ref<string | null>(localStorage.getItem('refreshToken'))

  const userLoggedIn = computed(() => !!localStorage.getItem('accessToken'))

  async function signup(userdata: ISignupForm): Promise<void> {
    try {
      const formData = new FormData()
      formData.append('username', userdata.username)
      formData.append('email', userdata.email)
      formData.append('password', userdata.password)
      if (userdata.profile_picture) {
        formData.append('profile_picture', userdata.profile_picture)
      }

      const response = await api.post('/users/', formData)
      if (response.status === 201) {
        await login({
          username: userdata.username,
          password: userdata.password
        })
      }
    } catch (error: any) {
      console.error(error)
      throw error
    }
  }

  async function login(loginForm: ILoginForm): Promise<void> {
    try {
      console.log(CLIENT_ID)
      const response = await api.post(
        OAUTH2_TOKEN_URL,
        {
          grant_type: 'password',
          username: loginForm.username,
          password: loginForm.password,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          scope: 'read write groups'
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }
      )
      accessToken.value = response.data.access_token
      refreshToken.value = response.data.refresh_token
      localStorage.setItem('accessToken', accessToken.value ?? '')
      localStorage.setItem('refreshToken', refreshToken.value ?? '')
      window.location.reload()
    } catch (error) {
      accessToken.value = null
      throw error
    }
  }

  async function refreshAccessToken(): Promise<void> {
    if (!refreshToken.value) throw new Error('No refresh token available')
    try {
      const response = await api.post(
        OAUTH2_TOKEN_URL,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken.value,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET
        },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }
      )
      accessToken.value = response.data.access_token
      refreshToken.value = response.data.refresh_token
      localStorage.setItem('accessToken', accessToken.value ?? '')
      localStorage.setItem('refreshToken', refreshToken.value ?? '')
    } catch (error) {
      await logout()
      throw error
    }
  }

  async function logout(): Promise<void> {
    accessToken.value = null
    refreshToken.value = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    window.location.reload()
  }

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        if (!accessToken.value) {
          return Promise.reject(error)
        }
        originalRequest._retry = true
        try {
          await refreshAccessToken()
          originalRequest.headers['Authorization'] =
            `Bearer ${accessToken.value}`
          return api(originalRequest)
        } catch (refreshError) {
          await logout()
          return Promise.reject(refreshError)
        }
      }
      return Promise.reject(error)
    }
  )

  return { userLoggedIn, signup, login, logout }
})
