import Modal from '@/components/modal/modal';
import { CompanyPayload, CompanyFormProps } from '@/types/companies';
import { useCompanies } from '@/lib/hooks/companiesHook';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import PrimaryInput from '@/components/inputs/primaryInput';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import { validateUrls } from '@/utils/utils';
import Swal from 'sweetalert2';
import { useCompaniesStore } from '@/zustand/companiesStore';

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
    image:
      'https://wallpapers.com/images/featured/imagenes-de-perfil-geniales-4co57dtwk64fb7lv.jpg',
  };
  const [formData, setFormData] =
    useState<CompanyPayload>(formDataInitialValue);

  const modalTitle = isEditMode ? 'Editar compañía' : 'Crear compañía';
  const modalDescription = `Completa todos los campos para ${isEditMode ? 'editar la compañía' : 'crear una nueva compañía'}.`;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    setFormData(formDataInitialValue);
    onClose();
  };

  useEffect(() => {
    if (isEditMode && company) {
      setFormData({
        name: company.name,
        image: company.image,
      });
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
