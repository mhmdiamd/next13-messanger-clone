import { User } from "@prisma/client";
import { FullConversationType } from "../types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (conversation: FullConversationType | {
  users: User[]
}) => {
  const session = useSession()

  const otherUser = useMemo(() => {

    // Get user Login Email
    const currentUserEmail = session?.data?.user?.email
    
    // Get user who email not match with user login, the same thing like get other user
    const otherUser = conversation.users?.filter(user => user.email !== currentUserEmail)

    return otherUser
  }, [session?.data?.user?.email, conversation.users])

  return otherUser[0]
}

export default useOtherUser