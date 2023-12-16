import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2"

import useAuthApi from "../../../api/auth"
import { signupErrorsMapping } from "../helpers/utils"

import { REGULAR_USER } from "../helpers/constants"

interface SignupFormInput {
  email: string
  firstName: string
  lastName: string
  password: string
  role: string
}

const useSignup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordVisited, setPasswordVisited] = useState(false)

  const { signupService } = useAuthApi()

  const signupFormSchema = yup.object().shape({
    email: yup.string().email('* Must be a valid email').required('* Email is required'),
    firstName: yup.string().required('* First Name is required'),
    lastName: yup.string().required('* Last Name is required'),
    password: yup.string().required('* Password is required'),
    role: yup.string().required('* Role is required')
  })

  const { control, formState:{errors},  handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: REGULAR_USER
    },
    resolver: yupResolver(signupFormSchema),
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
   * Mutation to signup
   */
  const signupMutation = useMutation({
    mutationFn: async (formvalue: SignupFormInput) => await signupService(formvalue),
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Please confirm your email address to complete your registration.',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(() => {
        reset()
        setShowPassword(false)
      })
    },
    onError: (error: Error) => {
      const errorJson = JSON.parse(error.message)
      const errorMessages = errorJson.map((error: { msg: string }) => error.msg)
      if (errorMessages.length > 0) {
        void Swal.fire({
          title: 'Oops...',
          html: signupErrorsMapping(errorMessages).join('<br />'),
          icon: 'error'
        })
      } else {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
          icon: 'error'
        })
      }
    }
  })

  /**
   * Function to handle the submit of the form
   * @param data 
   */
  const onSubmitSignup = (data: SignupFormInput) => {
    signupMutation.mutate(data)
  }

  return {
    // States
    control,
    errors,
    loadingSignup: signupMutation.isPending,
    showPassword,
    passwordVisited,

    // Functions States

    // Functions
    onSubmitSignup,
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleTextFieldFocus,
    handleTextFieldBlur
  }
}

export default useSignup