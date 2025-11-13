import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Send, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Conversation, Message } from "@/types/application";

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "1",
    applicationId: "1",
    jobTitle: "Image Annotation Specialist",
    companyName: "TechVision AI",
    lastMessage: "We'd like to schedule an interview with you next week.",
    lastMessageTime: "2024-03-12T14:30:00Z",
    unreadCount: 2
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    conversationId: "1",
    senderId: "comp1",
    senderName: "Sarah Johnson",
    senderRole: "company",
    message: "Thank you for applying! We're impressed with your background.",
    timestamp: "2024-03-10T11:00:00Z",
    read: true
  },
  {
    id: "2",
    conversationId: "1",
    senderId: "user1",
    senderName: "Alex Chen",
    senderRole: "annotator",
    message: "Thank you! I'm very excited about this opportunity.",
    timestamp: "2024-03-10T14:00:00Z",
    read: true
  },
  {
    id: "3",
    conversationId: "1",
    senderId: "comp1",
    senderName: "Sarah Johnson",
    senderRole: "company",
    message: "We'd like to schedule an interview with you next week. Are you available on Tuesday or Wednesday afternoon?",
    timestamp: "2024-03-12T14:30:00Z",
    read: false
  }
];

const AccountMessageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");

  const conversation = mockConversations.find(conv => conv.id === id);
  const messages = mockMessages.filter(msg => msg.conversationId === id);

  if (!conversation) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Conversation not found</h2>
          <Button onClick={() => navigate("/account/messages")}>
            Back to Messages
          </Button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    toast({
      title: "Message sent",
      description: "Your message has been sent to the company"
    });

    setNewMessage("");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/account/messages")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Messages
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-light mb-2">
              Conversation about {conversation.jobTitle}
            </h1>
            <p className="text-muted-foreground">at {conversation.companyName}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/account/applications/${conversation.applicationId}`}>
              View application
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border-border">
        <div className="space-y-6 mb-6">
          {messages.map((message, index) => {
            const isAnnotator = message.senderRole === "annotator";
            const showDate = index === 0 || 
              new Date(messages[index - 1].timestamp).toDateString() !== new Date(message.timestamp).toDateString();

            return (
              <div key={message.id}>
                {showDate && (
                  <div className="text-center my-4">
                    <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {new Date(message.timestamp).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                )}
                
                <div className={`flex ${isAnnotator ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] ${isAnnotator ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      isAnnotator
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                      {!isAnnotator && (
                        <p className="text-xs font-medium mb-1">{message.senderName}</p>
                      )}
                      <p className="text-sm leading-relaxed">{message.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 px-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Separator className="my-6" />

        {/* Message Composer */}
        <div className="space-y-3">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            rows={4}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              Press Enter to send, Shift + Enter for new line
            </p>
            <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AccountMessageDetail;
