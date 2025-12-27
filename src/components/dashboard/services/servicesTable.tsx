'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/table/dataTable';
import { useServices } from '@/lib/hooks/servicesHook';
import { servicesColumns } from '@/components/table/columns/servicesColumns';
import { useServicesStore } from '@/zustand/serviceStore';
import { Service } from '@/types/services';
import ServicesForm from '@/components/dashboard/services/servicesForm';

export default function ServicesTable() {
  const { getServices, loading, deleteService } = useServices();
  const { services, setServices, removeServiceFromStore, isDataLoad } =
    useServicesStore();

  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const openEditForm = (id: number) => {
    const serviceToEdit = services.find((service) => service.id === id);
    if (serviceToEdit) {
      setEditingService(serviceToEdit);
      setIsOpenEditForm(true);
    }
  };

  const closeEditForm = () => {
    setIsOpenEditForm(false);
    setEditingService(null);
  };

  const onDelete = async (id: number) => {
    await deleteService(id);
    removeServiceFromStore(id);
  };

  const columns = servicesColumns(openEditForm, onDelete);

  useEffect(() => {
    const fetchServices = async () => {
      if (isDataLoad) return;
      const servicesList = await getServices();

      if (servicesList) {
        setServices(servicesList);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="p-4">
      <h1>Tabla de Servicios</h1>
      <DataTable columns={columns} data={services} isLoading={loading} />

      <ServicesForm
        isOpen={isOpenEditForm}
        onClose={closeEditForm}
        isEditMode={true}
        service={editingService}
      />
    </div>
  );
}
