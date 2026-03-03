"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  type BodyLoginLoginAccessToken as AccessToken,
  loginLoginAccessToken,
  type UserPublic,
  type UserRegister,
  usersReadUserMe,
  usersRegisterUser,
} from "@/client"
import useCustomToast from "@/hooks/useCustomToast"

const isLoggedIn = () => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { showErrorToast } = useCustomToast()

  const { data: user } = useQuery<UserPublic | null, Error>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await usersReadUserMe()
      return response.data!
    },
    enabled: isLoggedIn(),
  })

  const signUpMutation = useMutation({
    mutationFn: (data: UserRegister) => usersRegisterUser({ body: data }),
    onSuccess: () => {
      router.push("/login")
      toast.success("Account created successfully")
    },
    onError: (error: Error) => showErrorToast(error.message),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const login = async (data: AccessToken) => {
    const response = await loginLoginAccessToken({ body: data })
    localStorage.setItem("access_token", response.data!.access_token)
  }

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/")
      toast.success("Logged in successfully")
    },
    onError: (error: Error) => showErrorToast(error.message),
  })

  const logout = () => {
    localStorage.removeItem("access_token")
    router.push("/login")
    toast.success("Logged out successfully")
  }

  return {
    signUpMutation,
    loginMutation,
    logout,
    user,
  }
}

export { isLoggedIn, useAuth }
