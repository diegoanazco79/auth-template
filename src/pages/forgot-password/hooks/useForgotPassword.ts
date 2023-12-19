import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from "sweetalert2"

import useAuthApi from "../../../api/auth"
import { forgotPasswordErrorsMapping } from "../helpers/functions"

interface ForgotPasswordFormInput {
  email: string
}

const useForgotPassword = () => {
  const forgotPasswordFormSchema = yup.object().shape({
    email: yup.string().email('* Must be a valid email').required('* Email is required'),
  })


  const { control, formState:{errors},  handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordFormSchema),
  })

  const { forgotPassword } = useAuthApi()

  /**
   * Mutation to send the email to reset the password
   */
  const forgotPasswordMutation = useMutation({
    mutationFn: async (forgotPasswordForm: string) => await forgotPassword(forgotPasswordForm),
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Please check your email to reset your password.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        reset()
      })
    },
    onError: (error: Error) => {
      const errorJson = JSON.parse(error.message)
      const errorMessages = errorJson.map((error: { msg: string }) => error.msg)
      if (errorMessages.length > 0) {
        void Swal.fire({
          title: 'Oops...',
          html: forgotPasswordErrorsMapping(errorMessages).join('<br />'),
          icon: 'error'
        })
      } else {
        void Swal.fire({
          title: 'Oops...',
          text: 'Something went wrong, please try again. If the problem persists, contact support.',
          icon: 'error'
        })
      }
    },
  })

  /**
   * Function to handle the submit of the form
   * @param data 
   */
  const onSubmitForgotPassword = (data: ForgotPasswordFormInput) => {
    forgotPasswordMutation.mutate(data.email)
  }

  return {
    // States
    control,
    errors,
    loadingSendEmail: forgotPasswordMutation.isPending,

    // Functions
    handleSubmit,
    onSubmitForgotPassword
  }
}

export default useForgotPassword