import * as reviewsServices from './reviewsServices';
import { ReviewPayload } from '@/types/reviews';

export const getReviews = async () => {
  const reviews = await reviewsServices.getFullReviews();
  return reviews;
};

export const addReview = async (data: ReviewPayload) => {
  if (!data.name || !data.occupation || !data.description) {
    throw new Error('Faltan datos obligatorios');
  }

  const createdReview = await reviewsServices.createReview(data);
  const newReview = await reviewsServices.getReviewById(createdReview.insertId);

  if (!newReview) {
    throw new Error('Error recuperando la review creada');
  }

  return {
    message: 'Review creada correctamente.',
    data: newReview,
  };
};

export const updateReview = async (id: number, data: ReviewPayload) => {
  const result = await reviewsServices.updateReview(id, data);

  if (result && result.affectedRows === 0) {
    throw new Error('Review no encontrada o no hubo cambios');
  }

  const updatedReview = await reviewsServices.getReviewById(id);

  if (!updatedReview) {
    throw new Error('Error recuperando la Review actualizada');
  }

  return {
    message: 'Review actualizada correctamente',
    data: updatedReview,
  };
};

export const deleteReview = async (id: number) => {
  const result = await reviewsServices.deleteReview(id);
  if (result.affectedRows === 0) throw new Error('Review no encontrada');

  return { message: 'Review eliminada correctamente' };
};
