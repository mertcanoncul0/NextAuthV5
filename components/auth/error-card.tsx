import { BsExclamationCircle } from "react-icons/bs"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { BackButton } from "./back-button"
import CardWrapper from "./card-wrapper"
import Header from "./header"

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <BsExclamationCircle className="text-lg" />
      </div>
    </CardWrapper>
  )
}

export default ErrorCard
