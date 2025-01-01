"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { FullMessageType } from "@/app/types";
import UseConversation from "@/app/hooks/use-conversation";

import MessageBox from "./message-box";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = UseConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`).then((res) => {});
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
