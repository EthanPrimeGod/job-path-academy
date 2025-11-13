import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search } from "lucide-react";
import { Conversation } from "@/types/application";

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
  },
  {
    id: "2",
    applicationId: "2",
    jobTitle: "NLP Data Labeler",
    companyName: "ConversaAI",
    lastMessage: "Thank you for your application. We're reviewing it now.",
    lastMessageTime: "2024-03-08T16:00:00Z",
    unreadCount: 0
  }
];

const AccountMessages = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(conv =>
    conv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light mb-2">Messages</h1>
        <p className="text-muted-foreground">Communicate with companies about your applications</p>
      </div>

      {/* Search */}
      <Card className="p-6 bg-card/50 backdrop-blur-glass border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Conversations List */}
      {filteredConversations.length > 0 ? (
        <div className="space-y-4">
          {filteredConversations.map((conversation) => (
            <Link key={conversation.id} to={`/account/messages/${conversation.id}`}>
              <Card className={`p-6 bg-card/50 backdrop-blur-glass border-border hover:border-primary/50 transition-all cursor-pointer ${
                conversation.unreadCount > 0 ? "border-primary/30" : ""
              }`}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h3 className="text-lg font-medium">{conversation.companyName}</h3>
                        <p className="text-sm text-muted-foreground">{conversation.jobTitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="rounded-full">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {getTimeAgo(conversation.lastMessageTime)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center bg-card/50 backdrop-blur-glass border-border">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-3">
            {searchQuery ? "No conversations found" : "No messages yet"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {searchQuery
              ? "Try adjusting your search to find conversations"
              : "Messages from companies about your applications will appear here"}
          </p>
        </Card>
      )}
    </div>
  );
};

export default AccountMessages;
