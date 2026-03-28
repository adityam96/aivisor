import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Types
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

interface SendMessageData {
  recipientId: string;
  content: string;
}

// Hook for fetching conversations
export const useConversations = () => {
  return useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: async () => {
      // In a real app, this would be an API call
      // return axios.get('/api/messages/conversations');
      
      // Mock implementation
      return new Promise<Conversation[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 'conv1',
              participantId: 'user1',
              participantName: 'John Smith',
              participantAvatar: '/avatars/john.jpg',
              lastMessage: 'I have a question about ContentMaster AI',
              lastMessageTimestamp: '2025-05-29T14:30:00Z',
              unreadCount: 2
            },
            {
              id: 'conv2',
              participantId: 'user2',
              participantName: 'Sarah Johnson',
              participantAvatar: '/avatars/sarah.jpg',
              lastMessage: 'Thanks for your help!',
              lastMessageTimestamp: '2025-05-28T09:15:00Z',
              unreadCount: 0
            },
            {
              id: 'conv3',
              participantId: 'user3',
              participantName: 'Michael Chen',
              participantAvatar: '/avatars/michael.jpg',
              lastMessage: 'Is DataAnalyzer Pro compatible with Excel?',
              lastMessageTimestamp: '2025-05-27T16:45:00Z',
              unreadCount: 0
            }
          ]);
        }, 500);
      });
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

// Hook for fetching messages in a conversation
export const useConversationMessages = (conversationId: string) => {
  return useQuery<Message[]>({
    queryKey: ['conversation', conversationId],
    queryFn: async () => {
      if (!conversationId) {
        return [];
      }
      
      // In a real app, this would be an API call
      // return axios.get(`/api/messages/conversations/${conversationId}`);
      
      // Mock implementation
      return new Promise<Message[]>((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 'msg1',
              conversationId,
              senderId: 'user1',
              senderName: 'John Smith',
              senderAvatar: '/avatars/john.jpg',
              recipientId: 'currentUser',
              recipientName: 'You',
              content: 'Hello, I have a question about ContentMaster AI. Does it support multiple languages?',
              timestamp: '2025-05-29T14:30:00Z',
              read: false
            },
            {
              id: 'msg2',
              conversationId,
              senderId: 'currentUser',
              senderName: 'You',
              recipientId: 'user1',
              recipientName: 'John Smith',
              content: 'Hi John! Yes, ContentMaster AI supports over 50 languages including English, Spanish, French, German, Chinese, Japanese, and many more.',
              timestamp: '2025-05-29T14:35:00Z',
              read: true
            },
            {
              id: 'msg3',
              conversationId,
              senderId: 'user1',
              senderName: 'John Smith',
              senderAvatar: '/avatars/john.jpg',
              recipientId: 'currentUser',
              recipientName: 'You',
              content: 'That\'s great! And does it have any translation features built-in?',
              timestamp: '2025-05-29T14:40:00Z',
              read: false
            }
          ]);
        }, 500);
      });
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: !!conversationId
  });
};

// Hook for sending a message
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ conversationId, content }: { conversationId: string; content: string }) => {
      // In a real app, this would be an API call
      // return axios.post(`/api/messages/conversations/${conversationId}`, { content });
      
      // Mock implementation
      return new Promise<Message>((resolve) => {
        setTimeout(() => {
          resolve({
            id: `msg-${Date.now()}`,
            conversationId,
            senderId: 'currentUser',
            senderName: 'You',
            recipientId: 'user1',
            recipientName: 'John Smith',
            content,
            timestamp: new Date().toISOString(),
            read: true
          });
        }, 500);
      });
    },
    onSuccess: (data, variables) => {
      // Update conversation messages
      queryClient.setQueryData<Message[]>(
        ['conversation', variables.conversationId],
        (oldData) => [...(oldData || []), data]
      );
      
      // Update conversations list
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }
  });
};

// Hook for marking messages as read
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ conversationId, messageIds }: { conversationId: string; messageIds: string[] }) => {
      // In a real app, this would be an API call
      // return axios.post(`/api/messages/read`, { messageIds });
      
      // Mock implementation
      return new Promise<{ success: boolean }>((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 300);
      });
    },
    onSuccess: (_, variables) => {
      // Update conversation messages
      queryClient.setQueryData<Message[]>(
        ['conversation', variables.conversationId],
        (oldData) => 
          oldData?.map(message => 
            variables.messageIds.includes(message.id) 
              ? { ...message, read: true } 
              : message
          ) || []
      );
      
      // Update conversations list
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }
  });
};

// Hook for starting a new conversation
export const useStartConversation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ recipientId, content }: SendMessageData) => {
      // In a real app, this would be an API call
      // return axios.post('/api/messages/conversations', { recipientId, content });
      
      // Mock implementation
      return new Promise<{ conversationId: string; message: Message }>((resolve) => {
        setTimeout(() => {
          const conversationId = `conv-${Date.now()}`;
          resolve({
            conversationId,
            message: {
              id: `msg-${Date.now()}`,
              conversationId,
              senderId: 'currentUser',
              senderName: 'You',
              recipientId,
              recipientName: 'New Contact',
              content,
              timestamp: new Date().toISOString(),
              read: true
            }
          });
        }, 500);
      });
    },
    onSuccess: (data) => {
      // Update conversations list
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      
      // Set new conversation messages
      queryClient.setQueryData(['conversation', data.conversationId], [data.message]);
    }
  });
};

// Combined messages hook for convenience
export const useMessages = () => {
  const conversations = useConversations();
  const sendMessage = useSendMessage();
  const markAsRead = useMarkAsRead();
  const startConversation = useStartConversation();
  
  return {
    conversations: conversations.data || [],
    isLoadingConversations: conversations.isLoading,
    getConversationMessages: useConversationMessages,
    sendMessage: sendMessage.mutateAsync,
    isSending: sendMessage.isPending,
    markAsRead: markAsRead.mutateAsync,
    startConversation: startConversation.mutateAsync,
    isStartingConversation: startConversation.isPending
  };
};
