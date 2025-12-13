import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env?.VITE_CLERK_PUBLISHABLE_KEY


export default function AppClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {


  if (!PUBLISHABLE_KEY) {
    // throw new Error('Add your Clerk Publishable Key to the .env.local file')
    console.warn("Clerk Publishable Key is missing. Skipping Clerk Provider.")
    return <>{children}</>
  }


  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      {children}
    </ClerkProvider>
  )
}
