"use client";

import clsx from "clsx";

import UseConversation from "../hooks/use-conversation";
import EmptyState from "../components/empty-state";

const Home = () => {
  const { isOpen } = UseConversation();

  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Home;
