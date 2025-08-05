import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
   const { pending } = useFormStatus();
   return (
    <Button 
      disabled={pending}
      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {pending ? "Signing in..." : "Sign In"}
    </Button>
  )
}

export default SubmitButton