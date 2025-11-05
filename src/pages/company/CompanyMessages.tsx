import { useState } from "react";
import { CompanyLayout } from "@/components/company/CompanyLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { mockThreads, mockMessages } from "@/data/company-mock";
import { useParams, Link } from "react-router-dom";
import { Search, Paperclip, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function CompanyMessages() {
  const { threadId } = useParams();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [messageText, setMessageText] = useState("");

  const filteredThreads = mockThreads.filter(thread => {
    const matchesSearch = thread.participantName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "unread" && thread.unread);
    return matchesSearch && matchesFilter;
  });

  const activeThread = threadId ? mockThreads.find(t => t.id === threadId) : null;
  const messages = threadId && mockMessages[threadId as keyof typeof mockMessages] 
    ? mockMessages[threadId as keyof typeof mockMessages] 
    : [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    toast({
      title: "Message sent",
      description: "Your message has been delivered",
    });
    setMessageText("");
  };

  return (
    <CompanyLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Messages</h1>
          <p className="text-muted-foreground">Communicate with candidates and team members</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
          {/* Inbox List */}
          <Card className="lg:col-span-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border/50 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === "all" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={filter === "unread" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setFilter("unread")}
                >
                  Unread
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredThreads.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <p>No messages found</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/company/applicants">Go to Applicants</Link>
                  </Button>
                </div>
              ) : (
                filteredThreads.map((thread) => (
                  <Link
                    key={thread.id}
                    to={`/company/messages/${thread.id}`}
                    className={`block p-4 border-b border-border/50 hover:bg-muted/50 transition-colors ${
                      threadId === thread.id ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>{thread.participantAvatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm truncate">{thread.participantName}</p>
                          {thread.unread && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs mb-1">
                          {thread.context}
                        </Badge>
                        <p className="text-sm text-muted-foreground truncate">{thread.lastMessage}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>

          {/* Thread View */}
          <Card className="lg:col-span-2 flex flex-col overflow-hidden">
            {!activeThread ? (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p>Select a conversation to view messages</p>
                  <Button asChild variant="link" className="mt-2">
                    <Link to="/company/applicants">Start a new conversation</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Thread Header */}
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{activeThread.participantAvatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{activeThread.participantName}</p>
                        <p className="text-sm text-muted-foreground">{activeThread.context}</p>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      {activeThread.contextType === "job" ? (
                        <Link to={`/company/jobs/${activeThread.jobId}/applicants/${activeThread.applicantId}`}>
                          View Application
                        </Link>
                      ) : (
                        <Link to={`/company/modules/${activeThread.moduleId}`}>
                          View Module
                        </Link>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "company" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "company"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === "company" 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { 
                            hour: "2-digit", 
                            minute: "2-digit" 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Composer */}
                <div className="p-4 border-t border-border/50">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={2}
                      className="resize-none"
                    />
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button size="icon" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </CompanyLayout>
  );
}
