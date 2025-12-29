import Modal from '@/components/modal/modal';
import { ReviewsFormProps, ReviewPayload } from '@/types/reviews';
import { useReviews } from '@/lib/hooks/reviewsHook';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import PrimaryInput from '@/components/inputs/primaryInput';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import Swal from 'sweetalert2';
import { useReviewsStore } from '@/zustand/reviewsStore';

export default function ReviewsForm({
  isOpen,
  onClose,
  isEditMode,
  review,
}: ReviewsFormProps) {
  const { addReviewToStore, updateReviewInStore } = useReviewsStore();
  const { loading, createReview, updateReview } = useReviews();
  const formDataInitialValue = {
    name: '',
    occupation: '',
    description: '',
  };
  const [formData, setFormData] = useState<ReviewPayload>(formDataInitialValue);

  const modalTitle = isEditMode ? 'Editar review' : 'Crear review';
  const modalDescription = `Completa todos los campos para ${isEditMode ? 'editar la review' : 'agregar una nueva review'}.`;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.occupation || !formData.description) {
      await Swal.fire({
        title: 'Info!',
        text: 'Completar todos los campos',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    if (isEditMode && review?.id) {
      const updatedReview = await updateReview(review.id, formData);
      if (updatedReview) {
        updateReviewInStore(updatedReview);
      }
    } else {
      const newReview = await createReview(formData);
      if (newReview) {
        addReviewToStore(newReview);
      }
    }

    setFormData(formDataInitialValue);
    onClose();
  };

  useEffect(() => {
    if (isEditMode && review) {
      setFormData({
        name: review.name,
        occupation: review.occupation,
        description: review.description,
      });
    }
  }, [isEditMode, review]);

  const form = (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <PrimaryInput
          label="Nombre completo"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="John Dalton"
        />
      </div>

      <div>
        <PrimaryInput
          label="Ocupacion"
          type="text"
          id="occupation"
          name="occupation"
          value={formData.occupation}
          onChange={onChange}
          placeholder="Escribe la ocupacion"
        />
      </div>

      <div>
        <PrimaryInput
          label="Descripcion"
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Descripcion..."
          maxLength={255}
        />
      </div>

      <div className="flex gap-4">
        <GrayButton
          value="Cancelar"
          type="button"
          onClick={onClose}
          disabled={loading}
        />
        <BlackButton
          value={isEditMode ? 'Editar' : 'Crear'}
          type="submit"
          disabled={loading}
          loading={loading}
        />
      </div>
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      description={modalDescription}
    >
      {form}
    </Modal>
  );
}
