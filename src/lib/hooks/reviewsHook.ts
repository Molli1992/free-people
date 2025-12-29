import { useState } from 'react';
import { reviewsService } from '@/lib/api/reviewsServices';
import { Review, ReviewPayload, UseReviewsReturn } from '@/types/reviews';
import { handleError } from '@/utils/utils';
import Swal from 'sweetalert2';

export function useReviews(): UseReviewsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getReviews = async (): Promise<Review[]> => {
    setLoading(true);
    setError(null);

    try {
      const reviews = await reviewsService.getReviews();
      return reviews;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al obtener reviews');
      setError(errorReturn);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (data: ReviewPayload): Promise<Review | null> => {
    setLoading(true);
    setError(null);

    try {
      const createdReview = await reviewsService.createReview(data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Review creada correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return createdReview;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al crear review');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (
    id: number,
    data: ReviewPayload
  ): Promise<Review | null> => {
    setLoading(true);
    setError(null);

    try {
      const updatedReview = await reviewsService.updateReview(id, data);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Review editada correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return updatedReview;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al editar review');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (id: number): Promise<Review | null> => {
    setLoading(true);
    setError(null);

    try {
      const deletedReview = await reviewsService.deleteReview(id);

      await Swal.fire({
        title: '¡Éxito!',
        text: 'Review eliminada correctamente',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      return deletedReview;
    } catch (err) {
      const errorReturn = handleError(err, 'Error al eliminar review');
      setError(errorReturn);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getReviews,
    createReview,
    updateReview,
    deleteReview,
  };
}
