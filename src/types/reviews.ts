export type Review = {
  id: number;
  name: string;
  occupation: string;
  description: string;
};

export type ReviewPayload = {
  name: string;
  occupation: string;
  description: string;
};

export type CardReviewProps = {
  name: string;
  occupation: string;
  description: string;
};

export interface UseReviewsReturn {
  loading: boolean;
  error: string | null;
  getReviews: () => Promise<Review[]>;
  createReview: (data: ReviewPayload) => Promise<Review | null>;
  updateReview: (id: number, data: ReviewPayload) => Promise<Review | null>;
  deleteReview: (id: number) => Promise<Review | null>;
}

export interface ReviewsFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  review?: Review;
}
