import Modal from '@/components/modal/modal';
import { CompanyPayload, CompanyFormProps } from '@/types/companies';
import { useCompanies } from '@/lib/hooks/companiesHook';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import PrimaryInput from '@/components/inputs/primaryInput';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import Swal from 'sweetalert2';
import { useCompaniesStore } from '@/zustand/companiesStore';
import InputFile from '@/components/inputs/inputFile';

export default function CompaniesForm({
  isOpen,
  onClose,
  isEditMode,
  company,
}: CompanyFormProps) {
  const { addCompaniesToStore, updateCompaniesInStore } = useCompaniesStore();
  const { loading, createCompany, updateCompany } = useCompanies();
  const formDataInitialValue = {
    name: '',
    image: '',
  };
  const [formData, setFormData] =
    useState<CompanyPayload>(formDataInitialValue);
  const [previews, setPreviews] = useState<string[]>([]);
  const MAX_IMAGES = 1;

  const modalTitle = isEditMode ? 'Editar compañía' : 'Crear compañía';
  const modalDescription = `Completa todos los campos para ${isEditMode ? 'editar la compañía' : 'crear una nueva compañía'}.`;

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

    if (!formData.name || !formData.image) {
      await Swal.fire({
        title: 'Info!',
        text: 'Completar todos los campos',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    if (isEditMode && company?.id) {
      const updatedCompany = await updateCompany(company.id, formData);
      if (updatedCompany) {
        updateCompaniesInStore(updatedCompany);
      }
    } else {
      const newCompany = await createCompany(formData);
      if (newCompany) {
        addCompaniesToStore(newCompany);
      }
    }

    handleClose()
  };

  useEffect(() => {
    if (isEditMode && company) {
      setFormData({
        name: company.name,
        image: company.image,
      });
      setPreviews([company.image]);
    }
  }, [isEditMode, company]);

  const form = (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <PrimaryInput
          label="Nombre"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Nombre de la compañía"
        />
      </div>

      <div>
        <InputFile
          label="Logo de la compañía"
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
