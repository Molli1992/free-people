import Modal from '@/components/modal/modal';
import { ServicesFormProps, ServicePayload } from '@/types/services';
import { useServices } from '@/lib/hooks/servicesHook';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import PrimaryInput from '@/components/inputs/primaryInput';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import Swal from 'sweetalert2';
import { useServicesStore } from '@/zustand/serviceStore';

export default function ServicesForm({
  isOpen,
  onClose,
  isEditMode,
  service,
}: ServicesFormProps) {
  const { addServiceToStore, updateServiceInStore } = useServicesStore();
  const { loading, createService, updateService } = useServices();
  const formDataInitialValue = {
    name: '',
    image:
      'https://grekoplaces.com/wp-content/uploads/2021/01/Greko_Servicio_arquitectura-contruccion2.jpg',
    description: '',
  };
  const [formData, setFormData] =
    useState<ServicePayload>(formDataInitialValue);

  const modalTitle = 'Crear servicio';
  const modalDescription =
    'Completa todos los campos para agregar un nuevo servicio.';

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.image || !formData.description) {
      await Swal.fire({
        title: 'Info!',
        text: 'Completar todos los campos',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    if (isEditMode && service?.id) {
      const updatedService = await updateService(service.id, formData);
      if (updatedService) {
        updateServiceInStore(updatedService);
      }
    } else {
      const newService = await createService(formData);
      if (newService) {
        addServiceToStore(newService);
      }
    }

    setFormData(formDataInitialValue);
    onClose();
  };

  useEffect(() => {
    if (isEditMode && service) {
      setFormData({
        name: service.name,
        image: service.image,
        description: service.description,
      });
    }
  }, [isEditMode, service]);

  const form = (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <PrimaryInput
          label="Nombre del servicio"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Construccion"
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
