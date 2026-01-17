import Modal from '@/components/modal/modal';
import { TeamFormProps } from '@/types/team';
import { useTeam } from '@/lib/hooks/teamHook';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import PrimaryInput from '@/components/inputs/primaryInput';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import { TeamPayload } from '@/types/team';
import { validateUrls } from '@/utils/utils';
import Swal from 'sweetalert2';
import { useTeamStore } from '@/zustand/teamStore';
import InputFile from '@/components/inputs/inputFile';

export default function TeamForm({
  isOpen,
  onClose,
  isEditMode,
  teamMember,
}: TeamFormProps) {
  const { addTeamMemberToStore, updateTeamMemberInStore } = useTeamStore();
  const { loading, createTeamMember, updateTeamMember } = useTeam();
  const formDataInitialValue = {
    name: '',
    profession: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    image: '',
  };
  const [formData, setFormData] = useState<TeamPayload>(formDataInitialValue);
  const [previews, setPreviews] = useState<string[]>([]);
  const MAX_IMAGES = 1;

  const modalTitle = isEditMode ? 'Editar integrante' : 'Crear integrante';
  const modalDescription = `Completa todos los campos para ${isEditMode ? 'editar el integrante' : 'crear un nuevo integrante'}.`;

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
    setPreviews([]);
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

    if (
      !formData.name ||
      !formData.profession ||
      !formData.linkedin ||
      !formData.instagram ||
      !formData.facebook ||
      !formData.image
    ) {
      await Swal.fire({
        title: 'Info!',
        text: 'Completar todos los campos',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    const isValid = validateUrls(formData);
    if (isValid.linkedin || isValid.instagram || isValid.facebook) {
      await Swal.fire({
        title: 'Info!',
        text: isValid.linkedin || isValid.instagram || isValid.facebook,
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    if (isEditMode && teamMember?.id) {
      const updatedTeamMember = await updateTeamMember(teamMember.id, formData);
      if (updatedTeamMember) {
        updateTeamMemberInStore(updatedTeamMember);
      }
    } else {
      const newTeamMember = await createTeamMember(formData);
      if (newTeamMember) {
        addTeamMemberToStore(newTeamMember);
      }
    }

    handleClose()
  };

  useEffect(() => {
    if (isEditMode && teamMember) {
      setFormData({
        name: teamMember.name,
        profession: teamMember.profession,
        linkedin: teamMember.linkedin,
        instagram: teamMember.instagram,
        facebook: teamMember.facebook,
        image: teamMember.image,
      });
      setPreviews([teamMember.image]);
    }
  }, [isEditMode, teamMember]);

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
          maxLength={20}
        />
      </div>

      <div>
        <PrimaryInput
          label="Profesion"
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={onChange}
          placeholder="Arquitecto"
          maxLength={20}
        />
      </div>

      <div>
        <PrimaryInput
          label="Linkedin"
          type="text"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin}
          onChange={onChange}
          placeholder="Url del perfil de linkedin"
        />
      </div>

      <div>
        <PrimaryInput
          label="Instagram"
          type="text"
          id="instagram"
          name="instagram"
          value={formData.instagram}
          onChange={onChange}
          placeholder="Url del perfil de instagram"
        />
      </div>

      <div>
        <PrimaryInput
          label="Facebook"
          type="text"
          id="facebook"
          name="facebook"
          value={formData.facebook}
          onChange={onChange}
          placeholder="Url del perfil de facebook"
        />
      </div>

      <div>
        <InputFile
          label="Imágen de perfil"
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
