import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser?.id) {
    return []
  }

  try{
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        // where conversations userIds have id user login or currentUser, same like user get their conversation
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        messages: {
          include: {
            sender: true,
            seen: true
          }
        },
        users: true
      }
    })

    return conversations
  }catch(err: any) {
    return []
  }
}

export default getConversations