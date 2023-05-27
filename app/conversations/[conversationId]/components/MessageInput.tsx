"use client"

import clsx from 'clsx'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface MessageInputProps {
  id: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  placeholder?: string
  type?: string
  errors: FieldErrors
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  required,
  register,
  placeholder,
  type,
  errors
}) => {
  return (
    <div
      className="relative w-full"
    >
      <input
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, { required })}
        className={clsx(`
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100
          w-full
          rounded-full
          focus:outline-none
        `,)}
      />
    </div>
  )
}

export default MessageInput