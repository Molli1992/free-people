import Modal from '@/components/modal/modal';
import { ServicesFormProps, ServicePayload } from '@/types/services';
import { useServices } from '@/lib/hooks/servicesHook';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import PrimaryInput from '@/components/inputs/primaryInput';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import Swal from 'sweetalert2';
import { useServicesStore } from '@/zustand/serviceStore';
import InputFile from '@/components/inputs/inputFile';

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
    image: '',
    description: '',
  };
  const [formData, setFormData] =
    useState<ServicePayload>(formDataInitialValue);
  const [previews, setPreviews] = useState<string[]>([]);
  const MAX_IMAGES = 1;

  const modalTitle = isEditMode ? 'Editar servicio' : 'Crear servicio';
  const modalDescription = `Completa todos los campos para ${isEditMode ? 'editar el servicio' : 'crear un nuevo servicio'}.`;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: '',
    });

    setPreviews([]);
  };

  const handleClose = () => {
    setFormData(formDataInitialValue);
    setPreviews([])
    onClose();
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const incomingFiles = Array.from(e.target.files);
      const imageLength = formData.image ? 1 : 0;
      const availableSlots = MAX_IMAGES - imageLength;

      if (availableSlots <= 0) {
        Swal.fire({
          title: 'Límite alcanzado',
          text: `Solo puedes subir hasta ${MAX_IMAGES} imágenes`,
          icon: 'warning',
          confirmButtonText: 'Ok',
        });

        return;
      }

      const filesToProcess = incomingFiles.slice(0, availableSlots);

      if (incomingFiles.length > availableSlots) {
        Swal.fire({
          title: 'Info',
          text: `Solo se agregaron ${availableSlots} imágenes para no exceder el límite`,
          icon: 'info',
          confirmButtonText: 'Ok',
        });
      }

      const newPreviews = filesToProcess.map((file) =>
        URL.createObjectURL(file)
      );

      setFormData({
        ...formData,
        image: filesToProcess[0],
      });
      setPreviews(newPreviews);
    }

    e.target.value = '';
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

    handleClose()
  };

  useEffect(() => {
    if (isEditMode && service) {
      setFormData({
        name: service.name,
        image: service.image,
        description: service.description,
      });
      setPreviews([service.image]);
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

      <div>
        <InputFile
          label="Imágen del servicio"
          handleFileChange={handleFileChange}
          previews={previews}
          removeImage={removeImage}
          maxFiles={MAX_IMAGES}
        />
      </div>

      <div className="flex gap-4">
        <GrayButton
          value="Cancelar"
          type="button"
          onClick={handleClose}
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
      onClose={handleClose}
      title={modalTitle}
      description={modalDescription}
    >
      {form}
    </Modal>
  );
}
