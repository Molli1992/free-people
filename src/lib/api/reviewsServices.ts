import { Review, ReviewPayload } from '@/types/reviews';
import axios from 'axios';

export const reviewsService = {
  /**
   * Gets the list of reviews.
   * @returns Promise<Review[]>
   */
  getReviews: async (): Promise<Review[]> => {
    const response = await axios.get('/api/reviews');
    return response.data;
  },

  /**
   * Create a review.
   * @param data Data to create new review
   * @returns Promise<Review>
   */
  createReview: async (data: ReviewPayload): Promise<Review> => {
    const response = await axios.post(`/api/reviews`, data);
    return response.data.data;
  },

  /**
   * Update a review.
   * @param id review ID
   * @param data Data to update
   * @returns Promise<Review>
   */
  updateReview: async (id: number, data: ReviewPayload): Promise<Review> => {
    const response = await axios.put(`/api/reviews/${id}`, data);
    return response.data.data;
  },

  /**
   * Remove a review.
   * @param id review ID
   * @returns Promise<Review>
   */
  deleteReview: async (id: number): Promise<Review> => {
    const response = await axios.delete(`/api/reviews/${id}`);
    return response.data;
  },
};
