import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2"

import useAuthApi from "../../../api/auth"

import { loginErrorsMapping } from "../helpers/utils"

interface LoginFormInput {
  email: string
  password: string
}

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordVisited, setPasswordVisited] = useState(false)

  const { loginAccount } = useAuthApi()

  const navigate = useNavigate()

  const loginFormSchema = yup.object().shape({
    email: yup.string().email('* Must be a valid email').required('* Email is required'),
    password: yup.string().required('* Password is required'),
  })

  const { control, formState:{errors},  handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginFormSchema),
  })

  /**
   * Mutation to login the user
   */
  const loginMutation = useMutation({
    mutationFn: async (loginForm: LoginFormInput) => await loginAccount(loginForm),
    onSuccess: () => {
      navigate('/')
    },
    onError: (error: Error) => {
      const errorJson = JSON.parse(error.message)
      const errorMessages = errorJson.map((error: { msg: string }) => error.msg)
      if (errorMessages.length > 0) {
        void Swal.fire({
          title: 'Oops...',
          html: loginErrorsMapping(errorMessages).join('<br />'),
          icon: 'error'
        })
      } else {
        void Swal.fire({
          title: 'Oops...',
          text: 'Something went wrong, please try again. If the problem persists, contact support.',
          icon: 'error'
        })
      }
    }
  })

  /**
   * Function to handle the visibility of the password
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  /**
   * Function to handle the visibility of the password
   */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  /**
   * Function to handle the visibility of the password
   */
  const handleTextFieldFocus = () => {
    setPasswordVisited(true)
  }

  /**
   * Function to handle the visibility of the password
   */
  const handleTextFieldBlur = () => {
    setPasswordVisited(false)
  }

  /**
   * Function to handle the submit of the form
   * @param data 
   */
  const onSubmitLogin = (data: LoginFormInput) => {
    loginMutation.mutate(data)
  }

  return {
    // States
    showPassword,
    passwordVisited,
    control,
    errors,
    loadingLogin: loginMutation.isPending,

    // Functions
    handleClickShowPassword,
    handleMouseDownPassword,
    handleTextFieldFocus,
    handleTextFieldBlur,
    onSubmitLogin,
    handleSubmit,
  }
}

export default useLogin