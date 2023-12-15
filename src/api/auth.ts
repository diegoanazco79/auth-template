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

  return {
    signupService
  }
}

export default useAuthApi
