"use client"

import Avatar from '@/app/components/Avatar'
import useOtherUser from '@/app/hooks/useOtherUser'
import { Conversation, User } from '@prisma/client'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import ProfileDrawer from '../[conversationId]/components/ProfileDrawer'
import AvatarGroup from '@/app/components/AvatarGroup'
import useActiveList from '@/app/hooks/useActiveList'

interface ConversationHeaderProps {
  conversation : Conversation & {
    users: User[]
  }
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ( {
  conversation
}) => {

  // Get Other or user who chat you in this conversation
  const otherUser = useOtherUser(conversation)

  // Profile Drawer
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { members } = useActiveList()

  const isActive = members.indexOf(otherUser?.email!) !== -1

  const statusText = useMemo(() => {
    if(conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return isActive ? `Active` : 'Offline'
  }, [conversation, isActive])

  return (
    <>
      <ProfileDrawer 
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div
        className='
        bg-white
        w-full
        flex
          border-b-[1px]
          sm:px-4
          py-3
          px-4
          lg:px-6
          justify-between
          items-center
          shadow-sm

          '
      >

        {/* Group or user Information */}
        <div className="flex gap-3 items-center">

          <Link
            className='lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer'
            href={'/conversations'}
          >

            <HiChevronLeft size={32} />
          </Link>

          {/* Group or user profile */}

          {conversation?.isGroup ? (
            <AvatarGroup users={conversation?.users} />
          ): (
            <Avatar user={otherUser} />
          )}

          <div className="flex flex-col">

            {/* Chat Name (group name or user Name) */}
            <div>
              {conversation?.name || otherUser?.name}
            </div>

            {/* Status Active */}
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>

        <HiEllipsisHorizontal 
          size={32}
          onClick={() => setDrawerOpen(true)}
          className='
            text-sky-500
            cursor-pointer
            hover:text-sky-600
            transition
          '
        />
      </div>
    </>

  )
}

export default ConversationHeader