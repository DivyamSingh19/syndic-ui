import React from 'react'
import OtpForm from '@/components/ui/forms/OtpForm'

const OTP = () => {
   return (
     <div className="min-h-screen flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-md space-y-6 text-center">
         <div className="space-y-2">
           <h1 className="text-4xl font-bold">Verify Your Account</h1>
           <p className="text-muted-foreground text-sm">
             Enter the verification code sent to your device
           </p>
         </div>
         <OtpForm />
       </div>
     </div>
   );
}

export default OTP