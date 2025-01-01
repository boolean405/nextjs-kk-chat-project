import getConversation from "../actions/get-conversation";
import Sidebar from "../components/side-bar/sidebar";
import ConversationList from "./components/conversation-list";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversation = await getConversation();
  return (
    <Sidebar>
      <ConversationList initialItems={conversation} />
      <div className="h-full">{children} </div>
    </Sidebar>
  );
}
