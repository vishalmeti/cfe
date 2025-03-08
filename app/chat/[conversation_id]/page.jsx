"use client";

import { fetchMessages } from "@/store/chatStore/chatSlice";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Send, Paperclip, MoreVertical, Search, X, ArrowUp, ArrowDown, Reply, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

export default function ChatPage() {
  const { conversation_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatUser, setChatUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const scrollAreaRef = useRef(null);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
    const [replyTo, setReplyTo] = useState(null);


  // redux store
  const dispatch = useDispatch();
  const { messages_by_id, messages_by_convId, status, error } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(fetchMessages(conversation_id));
  }, [conversation_id]);

  // Fetch chat history and user data
  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockCurrentUser = {
      id: "current-user-id",
      name: "You",
      avatar: "/avatars/user.jpg"
    };
    
    const mockChatUser = {
      id: conversation_id,
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
        sender: conversation_id,
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
        sender: conversation_id,
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
        sender: conversation_id,
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
        sender: conversation_id,
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
        sender: conversation_id,
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
        sender: conversation_id,
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
        sender: conversation_id,
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
        sender: conversation_id,
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
    //       fetch(`/api/users/${conversation_id}`),
    //       fetch(`/api/chats/${currentUserId}/${conversation_id}/messages`)
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
  }, [conversation_id]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
    // Search functionality
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const results = messages.reduce((matches, message, index) => {
            if (message.text.toLowerCase().includes(searchQuery.toLowerCase())) {
                matches.push({ messageIndex: index, content: message.text });
            }
            return matches;
        }, []);

        setSearchResults(results);
        setCurrentSearchIndex(0);

        if (results.length > 0 && scrollAreaRef.current) {
            scrollToSearchResult(0);
        }
    }, [searchQuery]);

    const scrollToSearchResult = (resultIndex) => {
        if (!searchResults.length) return;

        const messageIndex = searchResults[resultIndex].messageIndex;
        const messageElement = document.getElementById(`message-${messageIndex}`);

        if (messageElement && scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                const containerRect = scrollContainer.getBoundingClientRect();
                const elementRect = messageElement.getBoundingClientRect();

                scrollContainer.scrollTop = scrollContainer.scrollTop +
                    (elementRect.top - containerRect.top) - (containerRect.height / 2) + (elementRect.height / 2);

                // Add a highlight effect
                messageElement.classList.add("search-highlight");
                setTimeout(() => {
                    messageElement.classList.remove("search-highlight");
                }, 1000);
            }
        }
    };

    const handleNextResult = () => {
        if (!searchResults.length) return;
        const nextIndex = (currentSearchIndex + 1) % searchResults.length;
        setCurrentSearchIndex(nextIndex);
        scrollToSearchResult(nextIndex);
    };

    const handlePrevResult = () => {
        if (!searchResults.length) return;
        const prevIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
        setCurrentSearchIndex(prevIndex);
        scrollToSearchResult(prevIndex);
    };

    const handleReply = (message, index) => {
        setReplyTo({ message, index });
        // Focus on input field
        document.getElementById('message-input').focus();
    };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: currentUser.id,
      text: inputMessage,
      timestamp: new Date().toISOString(),
        replyTo: replyTo ? replyTo.index : null,
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
      setReplyTo(null);
    
    // In a real app, you'd send to API:
    // fetch('/api/messages', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     sender: currentUser.id,
    //     recipient: conversation_id,
      //     text: inputMessage,
      //     replyToMessageId: replyTo ? replyTo.message.id : null
    //   })
    // });
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

    const getReplyContent = (index) => {
        if (index === null || index === undefined || !messages[index]) return null;
        return messages[index];
    };

    const scrollToMessage = (index) => {
        const messageElement = document.getElementById(`message-${index}`);

        if (messageElement && scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Add a highlight effect
                messageElement.classList.add("search-highlight");
                setTimeout(() => {
                    messageElement.classList.remove("search-highlight");
                }, 1000);
            }
        }
    };

  if (!chatUser) {
    return <div className="flex items-center justify-center h-[calc(100vh-64px)]">Loading chat...</div>;
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-background">
          {/* Chat Header - Sticky */}
          <div className="sticky top-0 z-10 bg-background flex flex-col">
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
                  <div className="flex items-center gap-2">
                      <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowSearch(prev => !prev)}
                          className={showSearch ? "text-primary" : ""}
                      >
                          <Search size={20} />
                      </Button>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                  <MoreVertical size={20} />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                              <Separator />
                              <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </div>
              </div>

              {/* Search bar */}
              {showSearch && (
                  <div className="flex items-center gap-2 p-2 border-b bg-background/95 backdrop-blur-sm">
                      <Search className="h-4 w-4 text-muted-foreground ml-2" />
                      <Input
                          className="flex-1"
                          placeholder="Search in conversation"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                      />
                      <div className="flex items-center gap-1">
                          {searchResults.length > 0 && (
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {currentSearchIndex + 1} of {searchResults.length}
                              </span>
                          )}
                          <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={!searchResults.length}
                              onClick={handlePrevResult}
                          >
                              <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={!searchResults.length}
                              onClick={handleNextResult}
                          >
                              <ArrowDown className="h-4 w-4" />
                          </Button>
                          <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                  setShowSearch(false);
                                  setSearchQuery("");
                                  setSearchResults([]);
                              }}
                          >
                              <X className="h-4 w-4" />
                          </Button>
                      </div>
                  </div>
              )}
          </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="flex flex-col gap-3 pb-4">
                  {messages.map((message, index) => {
            const isOwnMessage = message.sender === currentUser.id;
                      const replyMessage = message.replyTo !== null ? getReplyContent(message.replyTo) : null;
            
            return (
              <div 
                    key={message.id}
                    id={`message-${index}`}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} transition-colors group`}
                >
                    {!isOwnMessage && (
                        <div className="mr-2 opacity-0 group-hover:opacity-100 flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleReply(message, index)}
                            >
                                <Reply className="h-3 w-3" />
                            </Button>
                        </div>
                    )}

                    <div className="flex flex-col max-w-[70%] relative">
                        {replyMessage && (
                            <div
                                className={`px-4 py-2 rounded-t-lg ${isOwnMessage ? 'bg-primary/20 ml-auto' : 'bg-muted/60'} 
                      text-xs mb-1 cursor-pointer flex items-center`}
                                onClick={() => scrollToMessage(message.replyTo)}
                            >
                                <Reply className="h-3 w-3 mr-1" />
                                <div className="truncate">
                                    <span className="font-medium">
                                        {replyMessage.sender === currentUser.id ? 'You' : chatUser.name}:
                                    </span> {replyMessage.text}
                                </div>
                            </div>
                        )}
                        <div 
                            className={`rounded-lg px-4 py-2 ${replyMessage ? (isOwnMessage ? 'rounded-tr-none bg-primary text-primary-foreground' : 'rounded-tl-none bg-muted') :
                                (isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-muted')
                                }`}
                        >
                            <p>{message.text}</p>
                            <p className={`text-xs mt-1 ${isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                {formatTime(message.timestamp)}
                            </p>
                        </div>
                    </div>

                    {isOwnMessage && (
                        <div className="ml-2 opacity-0 group-hover:opacity-100 flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleReply(message, index)}
                            >
                                <Reply className="h-3 w-3" />
                            </Button>
                        </div>
                    )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
      
          {/* Reply Preview */}
          {replyTo && (
              <div className="px-4 pt-2 border-t bg-muted/20">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                          <Reply className="h-3 w-3 mr-2" />
                          <span className="font-medium">Reply to </span>
                          <span className="ml-1 text-muted-foreground truncate max-w-[200px]">
                              {replyTo.message.sender === currentUser.id ? 'yourself' : chatUser.name}
                          </span>
                      </div>
                      <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setReplyTo(null)}
                      >
                          <XCircle className="h-4 w-4" />
                      </Button>
                  </div>
                  <div className="text-xs text-muted-foreground ml-5 mb-2 truncate">
                      "{replyTo.message.text}"
                  </div>
              </div>
          )}

      {/* Input Area */}
          <div className="p-4 border-t sticky bottom-0 bg-background">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Button type="button" size="icon" variant="outline">
            <Paperclip size={20} />
          </Button>
          <Input
                      id="message-input"
            className="flex-1"
                      placeholder={replyTo ? "Reply to message..." : "Type a message"}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send size={20} />
          </Button>
        </form>
      </div>

          {/* Add search highlight styles */}
          <style jsx global>{`
        .search-highlight {
          animation: highlight-pulse 1s ease-in-out;
        }
        
        @keyframes highlight-pulse {
          0%, 100% { 
            box-shadow: none; 
          }
          50% { 
            box-shadow: 0 0 0 2px rgba(var(--primary), 0.5); 
            background-color: rgba(var(--primary), 0.1); 
          }
        }
        
        /* Force showing reply buttons on mobile */
        @media (max-width: 640px) {
          .group:hover .opacity-0 {
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}