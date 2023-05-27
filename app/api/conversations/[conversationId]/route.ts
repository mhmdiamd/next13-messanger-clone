import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"

interface IProps {
  conversationId: string
}

export async function DELETE(
  request: Request, { params }: { params: IProps }
) {
  try {
    const { conversationId } = params
    const currentUser = await getCurrentUser()


    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check Existing conversation
    const existingConversation = await prisma.conversation.findUnique({
      where : {
        id: conversationId
      },
      include: {
        users: true
      }
    })

    if(!existingConversation) {
      return new NextResponse("Invalid Id", { status: 400 })
    }

    // Delete Conversation
    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds : {
          hasSome: [currentUser.id]
        }
      }
    })

    return NextResponse.json(deletedConversation)

  } catch (err) {
    console.log(err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}