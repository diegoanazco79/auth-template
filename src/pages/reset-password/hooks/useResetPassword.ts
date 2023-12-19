import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2"

import useAuthApi from "../../../api/auth"

interface ResetPasswordFormInput {
  password: string;
  token: string;
}

const useResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordVisited, setPasswordVisited] = useState(false)

  const navigate = useNavigate()

  const resetPasswordFormSchema = yup.object().shape({
    password: yup.string().required('* Password is required'),
    token: yup.string().required('* Token is required')
  })

  const { token } = useParams()

  const { control, formState:{errors},  handleSubmit, reset } = useForm({
    defaultValues: {
      password: '',
      token: token ?? ''
    },
    resolver: yupResolver(resetPasswordFormSchema),
  })

  const { resetPassword } = useAuthApi()

  /**
   * Mutation to reset the password
   */
  const resetPasswordMutation = useMutation({
    mutationFn: async (resetPasswordForm: ResetPasswordFormInput) => await resetPassword(resetPasswordForm),
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Your password has been reset.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        reset()
        setShowPassword(false)
        navigate('/login')
      })
    },
    onError: () => {
      void Swal.fire({
        title: 'Oops...',
        text: 'Something went wrong, please try again. If the problem persists, contact support.',
        icon: 'error'
      })
      
    },
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
  const onSubmitResetPassword = (data: ResetPasswordFormInput) => {
    resetPasswordMutation.mutate(data)
  }

  return {
    // States
    control,
    errors,
    showPassword,
    passwordVisited,
    loadingResetPassword: resetPasswordMutation.isPending,

    // Functions
    onSubmitResetPassword,
    handleSubmit,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleTextFieldFocus,
    handleTextFieldBlur,
  }
}

export default useResetPassword
