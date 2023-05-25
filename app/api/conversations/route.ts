import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try{
    const currentUser = await getCurrentUser()
    const body = await request.json()

    const{
      userId, isGroup, members, name
    } = body

    if(!currentUser || !currentUser?.email) {
      return new NextResponse("Unauthorized", {status : 401})
    }

    if(isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Data", {status : 400})
    }

    if(isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name, isGroup,
          users: {
            connect: [
              // Return data Obeject which value is member id [{id: value}, {id: value}] 
              ...members.map((member: {value : string }) => {
                return {
                  id: member.value
                }
              }),
              {
                id: currentUser.id
              }
            ]
          }
        },
        include: {
          users: true
        }
      })

      return NextResponse.json(newConversation)
    }

    // Get Conversation who exsist
    const existingConversation = await prisma.conversation.findMany({
      where: {
        OR : [
          {
            userIds : {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds : {
              equals: [userId, currentUser.id] 
            }
          },
        ]
      }
    })

    const singleConversation = existingConversation[0]

    // IF Conversation Exist, return the conversations
    if(singleConversation) {
      return NextResponse.json(singleConversation)
    }


    // Create new Conversation if there is not conversation between current user and another user
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include :{
        users: true
      }
    })


    return NextResponse.json(newConversation)
  }catch(err: any) {
    return new NextResponse("Internal Server Error", {status : 500})

  }
} 