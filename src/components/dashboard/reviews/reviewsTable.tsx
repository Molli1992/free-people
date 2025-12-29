'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/table/dataTable';
import { useReviews } from '@/lib/hooks/reviewsHook';
import { reviewsColumns } from '@/components/table/columns/reviewsColumns';
import { useReviewsStore } from '@/zustand/reviewsStore';
import { Review } from '@/types/reviews';
import ReviewsForm from '@/components/dashboard/reviews/reviewsForm';

export default function ReviewsTable() {
  const { getReviews, loading, deleteReview } = useReviews();
  const { reviews, setReviews, removeReviewFromStore, isDataLoad } =
    useReviewsStore();

  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | undefined>(
    undefined
  );

  const openEditForm = (id: number) => {
    const reviewToEdit = reviews.find((review) => review.id === id);
    if (reviewToEdit) {
      setEditingReview(reviewToEdit);
      setIsOpenEditForm(true);
    }
  };

  const closeEditForm = () => {
    setIsOpenEditForm(false);
    setEditingReview(undefined);
  };

  const onDelete = async (id: number) => {
    await deleteReview(id);
    removeReviewFromStore(id);
  };

  const columns = reviewsColumns(openEditForm, onDelete);

  useEffect(() => {
    const fetchReviews = async () => {
      if (isDataLoad) return;
      const reviewsList = await getReviews();

      if (reviewsList) {
        setReviews(reviewsList);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h1>Tabla de Reviews</h1>
      <DataTable columns={columns} data={reviews} isLoading={loading} />

      <ReviewsForm
        isOpen={isOpenEditForm}
        onClose={closeEditForm}
        isEditMode={true}
        review={editingReview}
      />
    </div>
  );
}
