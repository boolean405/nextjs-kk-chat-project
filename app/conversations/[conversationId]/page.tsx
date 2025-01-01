import getConversationById from "@/app/actions/get-conversation-by-id";
import getMessages from "@/app/actions/get-messages";
import EmptyState from "@/app/components/empty-state";

import Header from "./components/header";
import Body from "./components/body";
import Form from "./components/form";

interface IParams {
  conversationId: string;
}

const conversationId = async ({ params }: { params: IParams }) => {
  const { conversationId } = await params;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default conversationId;
