"use client"

import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { FullConversationType } from '@/app/types'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'
import { format } from 'util'

interface ConversationBoxProps {
  data : FullConversationType 
  selected? : boolean
} 

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data, selected
}) => {
  const otherUser = useOtherUser(data)
  const session =  useSession()
  const router = useRouter()

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`)
  }, [data.id, router])

  const lastMessage = useMemo(() => {
    const messages = data.messages || []

    return messages[messages.length - 1]
  }, [data.messages])

  const userEmail = useMemo( () => {
    return session.data?.user?.email
  }, [session.data?.user?.email])

  const hasSeen = useMemo(() => {
    if(!lastMessage) {
      return false
    }
    
    const seenArray = lastMessage?.seen || []

    if(!userEmail) {
      return false
    }

    return seenArray.filter(user => user.email === userEmail).length !== 0
  }, [userEmail, lastMessage])

  const lastMessageText = useMemo(() => {
    if(lastMessage?.image){
      return "Sent an image"
    }

    if(lastMessage?.body) {
      return lastMessage.body
    }

    return "Started a conversation"
  }, [lastMessage])

  return (
    <div
      onClick={handleClick}
      className={clsx(`
        w-full
        relative
        flex
        items-center
        space-x-3
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        p-3
      `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >

      <Avatar user={otherUser} />

      {/* Chat Column */}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex flex-between items-center mb-1">

            {/* User Name */}
            <p className='text-md font-medium text-gray-900'>
              {data.name || otherUser?.name} 
            </p>

            {/* Message Send Time */}
            {lastMessage?.createdAt && (
              <p className='text-xs text-gray-400 font-light'>
                {format(new Date(), 'p')}
              </p>
            )}
          </div>

          <p 
            className={clsx(`text-sm truncate`,
            hasSeen ? "text-gray-500" : "text-black font-medium"
            )}>
              {lastMessageText}
          </p>
        </div>
      </div>
      {/* End Chat Column */}

    </div>
  )
}

export default ConversationBox