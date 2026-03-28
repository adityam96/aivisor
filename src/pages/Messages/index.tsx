import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useMessages } from '../../hooks/useMessages';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  subject: string;
  content: string;
  createdAt: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
}

const MessagesPage: React.FC = () => {
  const { conversations: conversationsData, isLoadingConversations, getConversationMessages, sendMessage: sendMessageApi } = useMessages();
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'archived'>('inbox');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  // Fetch conversations on component mount
  useEffect(() => {
    setIsLoading(true);
    try {
      // Use the conversations data from the hook
      if (conversationsData) {
        // Type assertion to allow mapping
        const conversationsArray = conversationsData as any[];
        // Map the data to match our local interface if needed
        const mappedConversations: Conversation[] = conversationsArray.map((conv: {
          id: string;
          participantId: string;
          participantName: string;
          lastMessage: string;
          lastMessageTimestamp: string;
          unreadCount: number;
        }) => ({
          id: conv.id,
          participantId: conv.participantId,
          participantName: conv.participantName,
          lastMessage: conv.lastMessage,
          lastMessageDate: conv.lastMessageTimestamp,
          unreadCount: conv.unreadCount
        }));
        setConversations(mappedConversations);
        setIsLoading(false);
      }
    } catch (err) {
      setError('Failed to load conversations');
      setIsLoading(false);
    }
  }, [conversationsData, isLoadingConversations]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setIsLoading(true);
      
      const { data: conversationMessages, isLoading: messagesLoading, error: messagesError } = getConversationMessages(selectedConversation);
      
      if (conversationMessages) {
        // Type assertion to allow mapping
        const messagesArray = conversationMessages as any[];
        // Map the data to match our local interface if needed
        const mappedMessages: Message[] = messagesArray.map((msg: {
          id: string;
          senderId: string;
          senderName: string;
          recipientId: string;
          conversationId: string;
          content: string;
          timestamp: string;
          read: boolean;
        }) => ({
          id: msg.id,
          senderId: msg.senderId,
          senderName: msg.senderName,
          recipientId: msg.recipientId,
          subject: msg.conversationId, // Using conversationId as subject since it's not in the original data
          content: msg.content,
          createdAt: msg.timestamp,
          read: msg.read
        }));
        setMessages(mappedMessages);
        setIsLoading(false);
      } else if (messagesError) {
        setError('Failed to load messages');
        setIsLoading(false);
      }
    }
  }, [selectedConversation, getConversationMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    setIsSending(true);
    try {
      // Type assertion to allow the function to be called with the expected parameters
      const sendMessageFn = sendMessageApi as unknown as (params: {
        conversationId: string;
        content: string;
      }) => Promise<any>;
      
      await sendMessageFn({
        conversationId: selectedConversation,
        content: newMessage
      });
      
      // Clear the input field
      setNewMessage('');
      
      // The message will be added to the conversation via the hook's onSuccess callback
    } catch (err) {
      setError('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="flex h-[calc(100vh-200px)] max-h-[800px]">
              {/* Conversation List */}
              <div className="w-1/3 border-r border-gray-200">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('inbox')}
                    className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'inbox'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Inbox
                  </button>
                  <button
                    onClick={() => setActiveTab('sent')}
                    className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'sent'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Sent
                  </button>
                  <button
                    onClick={() => setActiveTab('archived')}
                    className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'archived'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Archived
                  </button>
                </div>

                {/* Conversation List */}
                <div className="overflow-y-auto h-full">
                  {isLoading && !selectedConversation ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No conversations found
                    </div>
                  ) : (
                    <ul className="divide-y divide-gray-200">
                      {conversations.map((conversation) => (
                        <li
                          key={conversation.id}
                          onClick={() => setSelectedConversation(conversation.id)}
                          className={`cursor-pointer hover:bg-gray-50 ${
                            selectedConversation === conversation.id ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                                    {conversation.participantName.charAt(0)}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="flex items-center">
                                    <h3 className={`text-sm font-medium ${conversation.unreadCount > 0 ? 'text-gray-900 font-semibold' : 'text-gray-700'}`}>
                                      {conversation.participantName}
                                    </h3>
                                    {conversation.unreadCount > 0 && (
                                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {conversation.unreadCount}
                                      </span>
                                    )}
                                  </div>
                                  <p className={`text-sm ${conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-500'} truncate`}>
                                    {conversation.lastMessage}
                                  </p>
                                </div>
                              </div>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="text-xs text-gray-500">
                                  {formatDate(conversation.lastMessageDate)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="w-2/3 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Message Header */}
                    <div className="border-b border-gray-200 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                            {conversations.find(c => c.id === selectedConversation)?.participantName.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3">
                          <h2 className="text-lg font-medium text-gray-900">
                            {conversations.find(c => c.id === selectedConversation)?.participantName}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {isLoading ? (
                        <div className="flex justify-center items-center h-32">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                      ) : (
                        messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg px-4 py-3 ${
                                message.senderId === 'current-user'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">
                                  {message.senderId === 'current-user' ? 'You' : message.senderName}
                                </span>
                                <span className="text-xs opacity-75 ml-2">
                                  {formatDate(message.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-gray-200 p-4">
                      <form onSubmit={handleSendMessage} className="flex">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 border border-gray-300 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={2}
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim() || isSending}
                          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white ${
                            !newMessage.trim() || isSending
                              ? 'bg-blue-300'
                              : 'bg-blue-600 hover:bg-blue-700'
                          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                          {isSending ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                          )}
                          Send
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Select a conversation from the list to view messages.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
