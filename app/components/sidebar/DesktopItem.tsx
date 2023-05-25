"use client"

import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

interface DesktopItemInterface {
  href: string
  label : string
  icon : any
  active: boolean
  onClick? : () => void
}

const DesktopItem: React.FC<DesktopItemInterface> = ({
  label,
  icon : Icon,
  href,
  active,
  onClick
}) => {
  const handleClick = () => {
    if(onClick) {
      return onClick()
    }
  }

  return (
    <Link href={href} className={clsx(`
      group
      flex
      gap-x-3
      rounded-md
      p-3
      text-sm
      leading-6
      font-semibold
      text-gray-500
      hover:text-black
      hover:bg-gray-100
    `)} >
      <Icon className={'h-6 w-6 shrink-0'} />
      <span className='sr-only'>{label}</span>
    </Link>
  )
}

export default DesktopItem