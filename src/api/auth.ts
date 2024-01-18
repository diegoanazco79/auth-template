import axios, { isAxiosError } from "axios"

import { LoginFormApi, ResetPasswordFormApi, SignupFormInputApi } from "./interfaces/auth"

const API_URL = import.meta.env.VITE_API_URL

const useAuthApi = () => {
  /**
   * Handles a signup request to the API.
   */
  const signupService = async (signupForm: SignupFormInputApi) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, signupForm)
      return response.data
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
      throw new Error("An error occurred during the signup process.")
    }
  }

  /**
   * Handles a verify email request to the API.
   */
  const verifyEmail = async (verifyForm: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/verify`, {
        token: verifyForm,
      })
      return response.data
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
      throw new Error("An error occurred during the verify email process.")
    }
  }

  /**
   * Handles a forgot password request to the API.
   */
  const forgotPassword = async (forgotPasswordForm: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, {
        email: forgotPasswordForm,
      })
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
      throw new Error("An error occurred during the forgot password process.")
    }
  }

  /**
   * Handles a reset password request to the API.
   * @param resetPasswordForm The reset password form.
   */
  const resetPassword = async (resetPasswordForm: ResetPasswordFormApi) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password`,
        resetPasswordForm
      )
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
      throw new Error("An error occurred during the reset password process.")
    }
  }

  /**
   * Handles a login request to the API.
   * @param loginForm The login form.
   */
  const loginAccount = async (loginForm: LoginFormApi) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, loginForm)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
      throw new Error("An error occurred during the login process.")
    }
  }

  /**
   * Handles a Google login request to the API.
   * @param token The Google token.
   */
  const loginGoogleAccount = async (token: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google-login`, {
        token,
      })
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
    }
  }

  return {
    signupService,
    verifyEmail,
    forgotPassword,
    resetPassword,
    loginAccount,
    loginGoogleAccount
  }
}

export default useAuthApi
