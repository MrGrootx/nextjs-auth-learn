import { Button } from '@/components/ui/button'
import React from 'react'
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
   const { pending } = useFormStatus();
   return (
    <Button 
      disabled={pending}
      className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  )
}

export default SubmitButton
