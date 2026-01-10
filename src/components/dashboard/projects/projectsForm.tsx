import Modal from '@/components/modal/modal';
import { ProjectsFormProps, ProjectPayload } from '@/types/projects';
import { useProjects } from '@/lib/hooks/projectsHook';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import PrimaryInput from '@/components/inputs/primaryInput';
import BlackButton from '@/components/buttons/blackButton';
import GrayButton from '@/components/buttons/grayButton';
import Swal from 'sweetalert2';
import { useProjectsStore } from '@/zustand/projectsStore';
import PrimaryTextArea from '@/components/inputs/primaryTextArea';
import InputFile from '@/components/inputs/inputFile';

export default function ProjectsForm({
  isOpen,
  onClose,
  isEditMode,
  project,
}: ProjectsFormProps) {
  const { addProjectsToStore, updateProjectsInStore } = useProjectsStore();
  const { loading, createProject, updateProject } = useProjects();
  const formDataInitialValue = {
    images: [],
    title: '',
    type: '',
    description: '',
    challenge: '',
    finalView: '',
  };
  const [formData, setFormData] =
    useState<ProjectPayload>(formDataInitialValue);
  const [previews, setPreviews] = useState<string[]>([]);
  const MAX_IMAGES = 5;

  const modalTitle = isEditMode ? 'Editar proyecto' : 'Crear proyecto';
  const modalDescription = `Completa todos los campos para ${isEditMode ? 'editar el proyecto' : 'crear un nuevo proyecto'}.`;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));

    setPreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[indexToRemove]);
      return newPreviews.filter((_, index) => index !== indexToRemove);
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const incomingFiles = Array.from(e.target.files);
      const availableSlots = MAX_IMAGES - formData.images.length;

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

      setFormData({
        ...formData,
        images: [...formData.images, ...filesToProcess],
      });

      const newPreviews = filesToProcess.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prev) => [...prev, ...newPreviews]);
    }

    e.target.value = '';
  };

  const closeForm = () => {
    setFormData(formDataInitialValue);
    setPreviews([]);
    onClose();
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.images.length < 5 ||
      !formData.title ||
      !formData.type ||
      !formData.description ||
      !formData.challenge ||
      !formData.finalView
    ) {
      await Swal.fire({
        title: 'Info!',
        text: 'Completar todos los campos',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    if (formData.description.length < 300) {
      await Swal.fire({
        title: 'Info!',
        text: 'El cambo de "Descripcion" debe tener minimo 300 caracteres.',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    if (formData.challenge.length < 300) {
      await Swal.fire({
        title: 'Info!',
        text: 'El cambo de "Desafios" debe tener minimo 300 caracteres.',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    if (formData.finalView.length < 300) {
      await Swal.fire({
        title: 'Info!',
        text: 'El cambo de "Mirada final" debe tener minimo 300 caracteres.',
        icon: 'info',
        confirmButtonText: 'Ok',
      });

      return;
    }

    if (isEditMode && project?.id) {
      const updatedProject = await updateProject(project.id, formData);
      if (updatedProject) {
        updateProjectsInStore(updatedProject);
      }
    } else {
      const newProject = await createProject(formData);
      if (newProject) {
        addProjectsToStore(newProject);
      }
    }

    closeForm();
  };

  useEffect(() => {
    if (isEditMode && project) {
      setFormData({
        images: project.images,
        title: project.title,
        type: project.type,
        description: project.description,
        challenge: project.challenge,
        finalView: project.finalView,
      });
      setPreviews(project.images);
    }
  }, [isEditMode, project]);

  const form = (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <PrimaryInput
          label="Nombre del proyecto"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Renovación de techos"
        />
      </div>

      <div>
        <PrimaryInput
          label="Tipo de proyecto"
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={onChange}
          placeholder="Reparaciones"
        />
      </div>

      <div>
        <PrimaryTextArea
          label="Description del proyecto"
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Descripcion"
          maxLength={600}
        />
      </div>

      <div>
        <PrimaryTextArea
          label="Desafios"
          id="challenge"
          name="challenge"
          value={formData.challenge}
          onChange={onChange}
          placeholder="Desafios del proyecto"
          maxLength={600}
        />
      </div>

      <div>
        <PrimaryTextArea
          label="Mirada final"
          id="finalView"
          name="finalView"
          value={formData.finalView}
          onChange={onChange}
          placeholder="Mirada final del proyecto"
          maxLength={600}
        />
      </div>

      <div>
        <InputFile
          label="Imágenes del proyecto"
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
          onClick={closeForm}
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
      onClose={closeForm}
      title={modalTitle}
      description={modalDescription}
    >
      {form}
    </Modal>
  );
}
