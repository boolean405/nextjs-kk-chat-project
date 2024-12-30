"use client";

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  label: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        `
    group
    flex
    gap-x-3
    p-4
    text-sm
    leading-6
    font-semibold
    w-full
    justify-center
    text-gray-500
    hover:text-black
    hover:bg-gray-100
    `,
        active && "bg-gray-100 text-black"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
