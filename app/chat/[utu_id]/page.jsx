"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Paperclip, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatPage() {
  const { utu_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const scrollAreaRef = useRef(null);
  
  // Fetch chat history and user data
  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCurrentUser = {
      id: "current-user-id",
      name: "You",
      avatar: "/avatars/user.jpg"
    };
    
    const mockChatUser = {
      id: utu_id,
      name: "John Doe",
      avatar: "/avatars/john.jpg",
      status: "online"
    };
    
    const mockMessages = [
      {
        id: 1,
        sender: "current-user-id",
        text: "Hi there! How are you doing?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        sender: utu_id,
        text: "I'm doing great! Just finished the project we were working on.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: 1,
        sender: "current-user-id",
        text: "Hi there! How are you doing?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        sender: utu_id,
        text: "I'm doing great! Just finished the project we were working on.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: 1,
        sender: "current-user-id",
        text: "Hi there! How are you doing?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        sender: utu_id,
        text: "I'm doing great! Just finished the project we were working on.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: 1,
        sender: "current-user-id",
        text: "Hi there! How are you doing?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        sender: utu_id,
        text: "I'm doing great! Just finished the project we were working on.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: 1,
        sender: "current-user-id",
        text: "Hi there! How are you doing?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        sender: utu_id,
        text: "I'm doing great! Just finished the project we were working on.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: 1,
        sender: "current-user-id",
        text: "Hi there! How are you doing?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        sender: utu_id,
        text: "I'm doing great! Just finished the project we were working on.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: 1,
        sender: "current-user-id",
        text: "Hi there! How are you doing?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        sender: utu_id,
        text: "I'm doing great! Just finished the project we were working on.",
        timestamp: new Date(Date.now() - 3500000).toISOString(),
      },
      {
        id: 3,
        sender: "current-user-id",
        text: "That's awesome! Can you share the details?",
        timestamp: new Date(Date.now() - 3400000).toISOString(),
      },
      {
        id: 3,
        sender: "current-user-id",
        text: "That's awesome! Can you share the details?",
        timestamp: new Date(Date.now() - 340000).toISOString(),
      },
      {
        id: 4,
        sender: utu_id,
        text: "Sure, I'll send you the documentation in a bit.",
        timestamp: new Date(Date.now() - 3300000).toISOString(),
      },
    ];
    
    setCurrentUser(mockCurrentUser);
    setChatUser(mockChatUser);
    setMessages(mockMessages);
    
    // In a real app, you'd fetch data like this:
    // const fetchChatData = async () => {
    //   try {
    //     const [userResponse, messagesResponse] = await Promise.all([
    //       fetch(`/api/users/${utu_id}`),
    //       fetch(`/api/chats/${currentUserId}/${utu_id}/messages`)
    //     ]);
    //     const userData = await userResponse.json();
    //     const messagesData = await messagesResponse.json();
    //     setChatUser(userData);
    //     setMessages(messagesData);
    //   } catch (error) {
    //     console.error("Failed to fetch chat data:", error);
    //   }
    // };
    // fetchChatData();
  }, [utu_id]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: currentUser.id,
      text: inputMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
    
    // In a real app, you'd send to API:
    // fetch('/api/messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     sender: currentUser.id,
    //     recipient: utu_id,
    //     text: inputMessage
    //   })
    // });
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  if (!chatUser) {
    return <div className="flex items-center justify-center h-[calc(100vh-64px)]">Loading chat...</div>;
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chatUser.avatar} alt={chatUser.name} />
            <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{chatUser.name}</h2>
            {/* <p className="text-sm text-muted-foreground">{chatUser.status}</p> */}
          </div>
        </div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <Separator />
              <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="flex flex-col gap-3 pb-4">
          {messages.map((message) => {
            const isOwnMessage = message.sender === currentUser.id;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isOwnMessage 
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      
      {/* Input Area */}
      <div className="p-4 border-t mt-auto sticky bottom-0 bg-background">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button type="button" size="icon" variant="outline">
            <Paperclip size={20} />
          </Button>
          <Input
            className="flex-1"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}