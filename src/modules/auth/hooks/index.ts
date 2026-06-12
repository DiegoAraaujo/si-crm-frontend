import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { login, register, logout } from '../api'
import { useAuthStore } from '@/store/auth.store'

export function useLogin() {
  const router = useRouter()
  const { setAccessToken, setUser } = useAuthStore()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      router.push('/dashboard')
    },
  })
}

export function useRegister() {
  const router = useRouter()
  const { setAccessToken, setUser } = useAuthStore()

  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      register(name, email, password),
    onSuccess: (data) => {
      setAccessToken(data.accessToken)
      setUser(data.user)
      router.push('/dashboard')
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const { clear } = useAuthStore()

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clear()
      router.push('/login')
    },
  })
}