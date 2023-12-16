import axios from 'axios'

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
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
   * Handles a verify email request to the API.
   */
  const verifyEmail = async (verifyForm: string) =>{
    try {
      const response = await axios.post(`${API_URL}/auth/verify`, {token:verifyForm})
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    signupService,
    verifyEmail
  }
}

export default useAuthApi
