import api from './api';

export const chatService = {
  /**
   * Sends a message to the Django AI Consultant.
   * @param message - The user's question
   * @param animalId - (Optional) The ID of the cow currently being viewed
   */
  askExpert: async (message: string, animalId?: number) => {
    try {
      const response = await api.post('/chat/ask/', {
        message: message,
        animal_context_id: animalId
      });
      return response.data; // Expected { text: "AI Response...", status: "success" }
    } catch (error) {
      console.error("Chat Service Error:", error);
      throw error;
    }
  },
};