import getConversationById from '@/app/actions/getConversationId'
import getMessages from '@/app/actions/getMessages'
import EmptyState from '@/app/components/EmptyState'
import React from 'react'
import ConversationHeader from '../components/ConversationHeader'
import ConversationBody from './components/ConversationBody'
import ConversationForm from './components/ConversationForm'

interface IProps {
  conversationId: string
}

const ConversationId = async ({ params }: { params: IProps }) => {
  console.log(params)
  const conversation = await getConversationById(params?.conversationId)
  const messages = await getMessages(params?.conversationId)


  // Check is it have any conversation exists?
  if(!conversation) {
    return (
      <div className="lg:pl-80">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <ConversationHeader conversation={conversation} />
        <ConversationBody initialMessages={messages}/>
        <ConversationForm />
      </div>
    </div>
  )
}

export default ConversationId