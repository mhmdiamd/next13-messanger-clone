"use client"

import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/types'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'

interface ConversationBodyProps {
  initialMessages: FullMessageType[] | null
}

const ConversationBody: React.FC<ConversationBodyProps> = ({ 
  initialMessages
}) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)


  const {conversationId} = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages?.map((message, i) => (
        <MessageBox 
          key={i} 
          isLast={i === messages.length - 1}
          data={message}
        />
      ))}
    </div>
  )
}

export default ConversationBody