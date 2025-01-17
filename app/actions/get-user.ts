import prisma from "@/app/libs/prismadb";

import getSession from "./get-session";

const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) return [];

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: unknown) {
    console.log(error);
    return [];
  }
};

export default getUsers;