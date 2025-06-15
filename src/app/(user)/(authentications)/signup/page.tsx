import React from 'react'
import SignUpForm from '@/components/app/SignUpForm'

export default function SignUpPage() {

  return (
    <div className='flex flex-col justify-center items-center gap-y-10 min-h-screen'>
      <div className=''>
        <h2 className='text-3xl font-bold'>SignUp - Nexlo</h2>
      </div>
      <div className='w-full sm:w-lg px-4'>
        <SignUpForm />
      </div>
    </div>
  ) 
}



