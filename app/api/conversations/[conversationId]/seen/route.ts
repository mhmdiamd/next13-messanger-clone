import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

interface IProps {
  conversationId: string
}

export async function POST(request: Request,
  { params }: { params: IProps }
) {
  try {
    const currentUser = await getCurrentUser()

    const { conversationId } = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Find the existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        messages: {
          include: {
            seen: true
          }
        },
        users: true
      }
    })

    if(!conversation) {
      return new NextResponse("Invalid Id", { status: 400 })
    }

    // Find the last message

    const lastMessage = conversation.messages[conversation.messages.length - 1]

    if(!lastMessage) {
      return NextResponse.json(conversation)
    }

    // Updte seen last message if last message is exists
    const updateMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })


    return NextResponse.json(updateMessage)

  } catch (err: any) {
    console.log(err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}