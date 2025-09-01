import { toast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ChatbotConfig {
  welcomeMessage: string;
  theme: {
    bgColor: string;
    textColor: string;
  };
  responses: {
    greeting: string[];
    research: string[];
    clinical: string[];
    manufacturing: string[];
    default: string[];
  };
}

export interface ChatbotService {
  getConfig(): Promise<ChatbotConfig>;
  sendMessage(message: string): Promise<string>;
}

class ChatbotServiceImpl implements ChatbotService {
  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Chatbot service error:', error);
      toast({
        title: "Error",
        description: "Failed to connect to chatbot service",
        variant: "destructive",
      });
      throw error;
    }
  }

  async getConfig(): Promise<ChatbotConfig> {
    return this.makeRequest<ChatbotConfig>('/api/chatbot-config');
  }

  async sendMessage(message: string): Promise<string> {
    const response = await this.makeRequest<{ response: string; message_hash: string }>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    
    return response.response;
  }
}

export const chatbotService = new ChatbotServiceImpl();
