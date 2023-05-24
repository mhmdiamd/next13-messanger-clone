"use client"

import Button from '@/app/components/Button'
import Input from '@/app/components/inputs/Input'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs'

type Props = {}
type Variant = "LOGIN" | "REGISTER"

const AuthForm = (props: Props) => {
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const toggleVariant = () => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === "LOGIN") {
      // Axios Register
    }

    if (variant === "REGISTER") {
      // Next Auth Signin
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)

    // Next Auth social Signin
  }

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">

        <form
          className='space-y-6'
          onSubmit={handleSubmit(onSubmit)}
        >

          {variant === "REGISTER" && (
            <Input id='name' label='Name' register={register} errors={errors} disabled={isLoading}/>
          )}

          <Input
            id='email'
            label='Email address'
            type='email'
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input 
            id='password' 
            label='Password' 
            type='password' 
            register={register} 
            errors={errors} 
            disabled={isLoading}
          />

          <Button
            disabled={isLoading}
            fullWidth
            type='submit'
          >
            {variant === "LOGIN" ? "Sign In" : "Register"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            {/* Create the line under login / register button */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            {/* End Create the line under login / register button */}

            <div className="relative text-sm flex justify-center">
              <span className='px-2 text-gray-500 bg-white'>Or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6 px-2 text-sm text-gray-500">
          <div>{variant === "LOGIN" ? "New to Messenger?" : "Already have account"}</div>
          <div
            onClick={toggleVariant}
            className='underline cursor-pointer'
          >{variant === "LOGIN" ? "Create an account" : "Login"}</div>
        </div>

      </div>
    </div>
  )
}

export default AuthForm