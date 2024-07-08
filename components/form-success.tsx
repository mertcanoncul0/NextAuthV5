import { BsCheck, BsCheckCircle } from "react-icons/bs"

type FormSuccessProps = {
  message: string | undefined
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <BsCheckCircle className="text-lg" />
      <p>{message}</p>
    </div>
  )
}

export default FormSuccess
