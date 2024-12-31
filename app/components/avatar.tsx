"use client";

import Image from "next/image";

import { User } from "@prisma/client";

import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        {user?.image ? (
          <Image src={user?.image} fill objectFit="cover" alt="User avatar" />
        ) : (
          <FaUserCircle className="w-full h-full text-gray-600" />
        )}
      </div>
      <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"></span>
    </div>
  );
};

export default Avatar;
