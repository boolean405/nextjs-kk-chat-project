import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./get-current-user";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error: unknown) {
    console.log(error);
  }
};

export default getConversationById;
