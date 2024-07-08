import { BsExclamationCircle } from "react-icons/bs"

type FormErrorProps = {
  message: string | undefined
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <BsExclamationCircle className="text-lg" />
      <p>{message}</p>
    </div>
  )
}

export default FormError
