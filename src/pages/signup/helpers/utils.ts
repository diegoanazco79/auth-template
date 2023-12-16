import { findKey, includes } from "lodash"

/**
 * Maps the errors from the server to the errors that will be displayed to the user.
 * @param errors The errors from the server.
 * @returns The mapped errors.
 */
export const signupErrorsMapping = (errors: string[]) => {
  const keywords: { [key: string]: string } = {
    "already exists": "The email address is already in use by another account.",
  }

  const mappedErrors = errors.map((error) => {
    const unescapedError = error.replace(/\\(.)/g, "$1").toLowerCase()
    const foundKey = findKey(keywords, (_message, key) =>
      includes(unescapedError.toLowerCase(), key)
    )
    return foundKey ? keywords[foundKey] : error
  })
  return mappedErrors
}
