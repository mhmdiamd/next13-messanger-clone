import prisma from "../libs/prismadb";

const getMessages = async (conversationId: string) => {
  try{

    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId
      },
      include: {
        sender:true,
        seen: true
      },
      orderBy: {
        createdAt: "asc"
      }
    })

    console.log(messages)

    return messages
  }catch(err : any) {
    return null
  }
}

export default getMessages