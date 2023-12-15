import { useState } from "react"

const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordVisited, setPasswordVisited] = useState(false)

  /**
   * @description Function to handle the visibility of the password
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  /**
   * @description Function to handle the visibility of the password
   */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  /**
   * @description Function to handle the visibility of the password
   */
  const handleTextFieldFocus = () => {
    setPasswordVisited(true)
  }

  /**
   * @description Function to handle the visibility of the password
   */
  const handleTextFieldBlur = () => {
    setPasswordVisited(false)
  }

  /**
   * @description Function to handle the visibility of the password
   */
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return {
    // States
    showPassword,
    password,
    passwordVisited,

    // Functions States

    // Functions
    handleClickShowPassword,
    handleMouseDownPassword,
    handleTextFieldFocus,
    handleTextFieldBlur,
    handlePasswordChange
  }
}

export default useLogin