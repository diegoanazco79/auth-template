import { useEffect, useRef } from "react"
import { useMutation } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"

import useAuthApi from "../../../api/auth"

const useVerifyEmail = () => {
  const { verifyEmail } = useAuthApi()
  const { token } = useParams()

  const currentToken = token ?? ""
  const isMounted = useRef(true)

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  /**
   * Handles a verify email request to the API.
   */
  const verifyEmailMutation = useMutation({
    mutationFn: async () => await verifyEmail(currentToken),
    onSuccess: () => {
      console.log("Email verified")
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Oops, something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "Ok",
      })
    },
  })

  useEffect(() => {
    if (!verifyEmailMutation.isPending && isMounted.current) {
      verifyEmailMutation.mutate()
    }
  }, []) // eslint-disable-line

  return {
    // States
    currentToken,
    verifyEmailMutation,
    loadingVerifyEmail: verifyEmailMutation.isPending,
  }
}

export default useVerifyEmail
