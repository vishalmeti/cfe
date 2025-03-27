"use client";

import { fetchMessages, sendMessage } from "@/store/chatStore/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";

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
import UserService from "@/services/userService";
import { set } from "lodash";

export default function ChatPage() {
  const { reciever_id } = useParams();
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
  const [conversation, setconversation] = useState({})

  // redux store
  const dispatch = useDispatch();
  const { messages_by_id, messages_by_convId, status, error } = useSelector((state) => state.chat);
  const chatMessages = useSelector((state) => {
    const messageIds = state.chat.messages_by_convId[conversation.id]

    return messageIds ??.map(id => state.chat.messages_by_id[id])
  });

  // Fix async effect - using proper async pattern
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const conversation = await UserService.getRecipientConversation(reciever_id);
        setconversation(conversation);
        localStorage.setItem("conversation", JSON.stringify(conversation));
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };
    
    fetchConversation();
  }, [reciever_id]);

  // Fetch chat history and user data
  useEffect(() => {
    if (conversation?.id) {
      dispatch(fetchMessages(reciever_id));
    }
    
    const mockCurrentUser = {
      id:get(JSON.parse(localStorage.getItem("user")),"id",null),
      name: get(JSON.parse(localStorage.getItem("user")), "username", "You"),
      avatar: "/avatars/user.jpg"
    };

    const workspaceUsers = JSON.parse(localStorage.getItem("conversation"));

    const conversationObjFromLocalStorage = JSON.parse(localStorage.getItem("conversation"));
    const user1_username = conversationObjFromLocalStorage.user1_username;
    const user2_username = conversationObjFromLocalStorage.user2_username;

    const reciever_username = user1_username === mockCurrentUser.name ? user2_username : user1_username;
    const mockChatUser = {
      id: reciever_id,
      name: reciever_username, // Get the user's name from the workspaceUsers array",
      avatar: "/avatars/john.jpg",
      status: "online"
    };
    
    setCurrentUser(mockCurrentUser);
    setChatUser(mockChatUser);
  }, [reciever_id, conversation?.id, dispatch]);

  // Update messages when chatMessages changes - add null check and prevent loop
  useEffect(() => {
    if (chatMessages && Array.isArray(chatMessages) && chatMessages.length > 0) {
      // Only update if the messages are different to prevent update loops
      const currentIds = messages?.map(m => m.id).join(',');
      const newIds = chatMessages?.map(m => m.id).join(',');
      
      if (currentIds !== newIds) {
        setMessages(chatMessages);
      }
    }
  }, [chatMessages]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
    console.log("Messages updated", messages);
  }, [messages]);
  
  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const results = messages.reduce((matches, message, index) => {
      if (message.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        matches.push({
          messageIndex: index,
          content: message.text,
          message: message
        });
      }
      return matches;
    }, []);

    setSearchResults(results);
    setCurrentSearchIndex(0);

    // If we have results and are not in the middle of typing (debounce)
    if (results.length > 0 && scrollAreaRef.current) {
      // Use setTimeout to avoid too frequent scrolling while typing
      const timer = setTimeout(() => {
        scrollToSearchResult(0);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [searchQuery, messages]);

  // Function to get filtered messages based on search query
  const getFilteredMessages = () => {
    if (!searchQuery.trim()) {
      return messages;
    }
    return messages.filter(message =>
      message.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Function to highlight search terms in message text
  const highlightSearchText = (text) => {
    if (!searchQuery.trim()) return text;

    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts?.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ?
            <span key={i} className="search-match">{part}</span> : part
        )}
      </>
    );
  };

  const scrollToSearchResult = (resultIndex) => {
    if (!searchResults.length) return;

    const messageIndex = searchResults[resultIndex].messageIndex;
    const messageElement = document.getElementById(`message-${messageIndex}`);

    if (messageElement && scrollAreaRef.current) {
      // Reset any existing highlights first
      document.querySelectorAll('.message-highlight').forEach(el => {
        el.classList.remove('message-highlight');
      });

      // Add highlight to the current result
      messageElement.classList.add("message-highlight");

      // Use setTimeout to ensure the DOM has updated before scrolling
      setTimeout(() => {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          // Get the element's position relative to the viewport
          const elementRect = messageElement.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();

          // Calculate scroll position to position message at the top with a small offset
          // This ensures the message is at the top of the chat view for better readability
          const topOffset = 20; // Pixels from top
          const scrollTop = scrollContainer.scrollTop + (elementRect.top - containerRect.top) - topOffset;

          // Perform the scroll
          scrollContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });

          // Add a temporary visual indicator for better visibility
          messageElement.style.transition = 'background-color 2s';
          messageElement.style.backgroundColor = 'hsla(var(--primary), 0.15)';

          // Remove the background after animation completes
          setTimeout(() => {
            messageElement.style.backgroundColor = '';
          }, 2000);
        }
      }, 50);
    }
  };

  const handleNextResult = () => {
    if (!searchResults.length) return;
    const nextIndex = (currentSearchIndex + 1) % searchResults.length;
    setCurrentSearchIndex(nextIndex);
    setTimeout(() => {
      scrollToSearchResult(nextIndex);
    }, 10);
  };

  const handlePrevResult = () => {
    if (!searchResults.length) return;
    const prevIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    setCurrentSearchIndex(prevIndex);
    setTimeout(() => {
      scrollToSearchResult(prevIndex);
    }, 10);
  };

  const handleReply = (message, index) => {
    setReplyTo({ message, messageId: message.id, index });
    // Focus on input field
    document.getElementById('message-input').focus();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      content: inputMessage,
      conversation: conversation.id,
      reply_to: replyTo ? replyTo.message.id : null
    };

    try {
      await dispatch(sendMessage(newMessage)).unwrap();
      setInputMessage("");
      setReplyTo(null);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getReplyContent = (messageId) => {
    if (!messageId) return null;
    const replyMessage = messages.find(msg => msg.id === messageId);
    return replyMessage || null;
  };

  const scrollToMessage = (messageId) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    const messageElement = document.getElementById(`message-${messageIndex}`);

    if (messageElement && scrollAreaRef.current) {
      // Reset any existing highlights first
      document.querySelectorAll('.message-highlight').forEach(el => {
        el.classList.remove('message-highlight');
      });

      // Add highlight to the message
      messageElement.classList.add("message-highlight");

      // Use setTimeout to ensure the DOM has updated
      setTimeout(() => {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          // Get the element's position relative to the viewport
          const elementRect = messageElement.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();

          // Calculate scroll position to position message at the top with a small offset
          const topOffset = 20; // Pixels from top
          const scrollTop = scrollContainer.scrollTop + (elementRect.top - containerRect.top) - topOffset;

          // Perform the scroll
          scrollContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });

          // Remove highlight after animation
          setTimeout(() => {
            messageElement.classList.remove('message-highlight');
          }, 1500);
        }
      }, 50);
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
                  {searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}
                </span>
              )}
              {/* Navigation controls for search results */}
              {searchResults.length > 0 && (
                <>
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
                </>
              )}
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
          {/* When searching, show filtered messages; otherwise show all messages */}
          {(searchQuery.trim() ? getFilteredMessages() : messages)?.map((message, index) => {
            const isOwnMessage = message.sender === currentUser.id;
            const replyMessage = message.replyToId ? getReplyContent(message.replyToId) : null;
            
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
                      onClick={() => scrollToMessage(message.replyToId)}
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
                    <p>{highlightSearchText(message.text)}</p>
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

          {searchQuery.trim() && getFilteredMessages().length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No messages matching "{searchQuery}"
            </div>
          )}
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

      {/* Improved search highlight styles */}
      <style jsx global>{`
        .message-highlight {
          animation: highlight-pulse 1.5s ease-in-out;
          position: relative;
          z-index: 1;
          border-left: 3px solid hsl(var(--primary));
          margin-left: -3px;
        }
        
        @keyframes highlight-pulse {
          0%, 100% { 
            box-shadow: none; 
          }
          30%, 70% { 
            box-shadow: 0 0 0 3px hsl(var(--primary) / 0.5);
            background-color: hsl(var(--primary) / 0.15);
          }
        }
        
        /* Properly highlight search matches within text */
        .search-match {
          background-color: hsl(var(--primary) / 0.3);
          border-radius: 2px;
          padding: 0 2px;
          font-weight: 600;
        }
        
        /* Force showing reply buttons on mobile */
        @media (max-width: 640px) {
          .group:hover .opacity-0 {
            opacity: 1 !important;
          }
        }
        
        /* Filter mode indicator */
        .filter-active {
          position: relative;
        }
        
        .filter-active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: hsl(var(--primary));
        }
      `}</style>
    </div>
  );
}