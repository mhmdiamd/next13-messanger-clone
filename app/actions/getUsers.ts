import { getSession } from "next-auth/react";
import prisma from "../libs/prismadb";
import { User } from "@prisma/client";


const getUsers = async (): Promise<Array<User>> => {
  try{
    const session = await getSession()

    if(session?.user?.email) {
      return []
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where : {
        NOT: {
          email: session?.user?.email
        }
      }
    })

    return users as User[]
  } catch(err: any) {
    return []
  } 
}

export default getUsers