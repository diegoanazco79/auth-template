import axios, { isAxiosError } from 'axios'

import { SignupFormInputApi } from './interfaces/auth'
import { API_URL } from './helpers/constants'

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
      throw new Error('An error occurred during the invitation process.')
    }
  }

  /**
   * Handles a verify email request to the API.
   */
  const verifyEmail = async (verifyForm: string) =>{
    try {
      const response = await axios.post(`${API_URL}/auth/verify`, {token:verifyForm})
      return response.data
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
      throw new Error('An error occurred during the invitation process.')
    }
  }

  return {
    signupService,
    verifyEmail
  }
}

export default useAuthApi
