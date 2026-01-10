import { create } from 'zustand';
import { ReviewStoreProps } from '@/types/stores';

export const useReviewsStore = create<ReviewStoreProps>((set, get) => ({
  reviews: [],
  isDataLoad: false,

  setReviews: (data) =>
    set({
      reviews: data,
      isDataLoad: true,
    }),

  addReviewToStore: (review) => {
    const { reviews } = get();
    const reviewsSinDuplicado = reviews.filter((r) => r.id !== review.id);

    set({ reviews: [...reviewsSinDuplicado, review] });
  },

  updateReviewInStore: (updatedReview) => {
    const { reviews } = get();
    const newData = reviews.map((review) => {
      return review.id === updatedReview.id ? updatedReview : review;
    });

    set({ reviews: newData });
  },

  removeReviewFromStore: (id) => {
    const { reviews } = get();
    const newData = reviews.filter((review) => {
      return review.id !== id;
    });

    set({ reviews: newData });
  },
}));
