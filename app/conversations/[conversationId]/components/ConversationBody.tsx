"use client"

import useConversation from '@/app/hooks/useConversation'
import { FullMessageType } from '@/app/types'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'
import { pusherClient } from '@/app/libs/pusher'
import { find } from 'lodash'

interface ConversationBodyProps {
  initialMessages: FullMessageType[]
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

  useEffect(() => {
    // Get new Message by Get the triger pusher from server using pusher client
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView()

    const messageHandler = (message: FullMessageType) => {
      // set seen 
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current) => {
        if(find(current, { id: message.id })) {
          return current
        }

        return [...current, message]
      })      

      bottomRef?.current?.scrollIntoView()
    }

    // Update Message Handler
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
          // check if have new message 
          if(currentMessage.id === newMessage.id) {
            return newMessage
          }

          return currentMessage
        })
      )
    }

    // Action when get new message and get seen status
    pusherClient.bind("messages:new", messageHandler)
    pusherClient.bind("messages:update", updateMessageHandler)
    
    // When component unmounted
    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind("messages:new", messageHandler)
      pusherClient.unbind("messages:update", updateMessageHandler)
    }
    
  }, [conversationId])

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
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