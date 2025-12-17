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

export default function ProjectsForm({
  isOpen,
  onClose,
  isEditMode,
  project,
}: ProjectsFormProps) {
  const { addProjectsToStore, updateProjectsInStore } = useProjectsStore();
  const { loading, createProject, updateProject } = useProjects();
  const formDataInitialValue = {
    images: [
      'https://content.arquitecturaydiseno.es/medio/2022/07/15/xv-beau-museo-de-arte-contemporaneo-helga-de-alvear-por-tunon-arquitectos-fotografialuis-asin-y-amores-pictures-1_58f6a29b_1280x794.jpg',
      'https://images.adsttc.com/media/images/5b86/ba2d/f197/ccda/a100/0116/newsletter/776_3_HR_ZeitzMOCAA_HeatherwickStudio_Credit_Iwan_Baan_View_of_Zeitz_MOCAA_in_Silo_Square.jpg?1535556132',
      'https://www.experimenta.es/wp-content/uploads/2019/09/proyecto-de-visualizacion-de-tree-house-constantia-un-trabajo-de-leskea.jpg',
      'https://images.adsttc.com/media/images/6272/a578/2bff/4224/f2ef/21f9/newsletter/rh2758-0069.jpg?1651680724',
      'https://www.metalocus.es/sites/default/files/styles/mopis_news_carousel_item_desktop/public/metalocus_glass_house_philip_johnson_24.jpg?itok=SyHdxzH9',
    ],
    title: '',
    type: '',
    description: '',
    challenge: '',
    finalView: '',
  };
  const [formData, setFormData] =
    useState<ProjectPayload>(formDataInitialValue);

  const modalTitle = 'Crear proyecto';
  const modalDescription =
    'Completa todos los campos para crear un nuevo proyecto.';

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    setFormData(formDataInitialValue);
    onClose();
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
