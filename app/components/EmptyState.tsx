import React from 'react'

type Props = {}

const EmptyState = (props: Props) => {
  return (
    <div
      className="
        px-4
        py-10
        sm:px-6
        lg:px-8
        flex
        justify-center
        items-center
        h-full
        bg-gray-100
      "
    >
      <div className="text-center items-center flex flex-col">
        <h3 className='mt-2 text-3xl text-gray-900 font-semibold'>Select a chat or start a new Conversation</h3>
      </div>
    </div>
  )
}

export default EmptyState