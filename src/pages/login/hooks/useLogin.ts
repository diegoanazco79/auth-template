import { useForm } from "react-hook-form"
import { useState } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface LoginFormInput {
  email: string
  password: string
}

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordVisited, setPasswordVisited] = useState(false)

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
    console.log(data)
  }

  return {
    // States
    showPassword,
    passwordVisited,
    control,
    errors,

    // Functions States

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