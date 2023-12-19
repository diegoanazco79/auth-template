import axios, { isAxiosError } from "axios"

import { ResetPasswordFormApi, SignupFormInputApi } from "./interfaces/auth"
import { API_URL } from "./helpers/constants"

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

  return {
    signupService,
    verifyEmail,
    forgotPassword,
    resetPassword
  }
}

export default useAuthApi
