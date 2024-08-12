import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react"


const Auth = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal" /> 
        {/* // we don't redirect to another page for signin bcoz of modal */}
        <SignUpButton mode="modal"/>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default Auth
