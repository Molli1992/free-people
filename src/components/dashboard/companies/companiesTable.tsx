'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/table/dataTable';
import { useCompanies } from '@/lib/hooks/companiesHook';
import { companiesColumns } from '@/components/table/columns/companiesColumns';
import { useCompaniesStore } from '@/zustand/companiesStore';
import { Company } from '@/types/companies';
import CompaniesForm from '@/components/dashboard/companies/companiesForm';

export default function CompaniesTable() {
  const { getCompanies, loading, deleteCompany } = useCompanies();
  const { companies, setCompanies, removeCompaniesFromStore, isDataLoad } =
    useCompaniesStore();

  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | undefined>(
    undefined
  );

  const openEditForm = (id: number) => {
    const companyToEdit = companies.find((company) => company.id === id);
    if (companyToEdit) {
      setEditingCompany(companyToEdit);
      setIsOpenEditForm(true);
    }
  };

  const closeEditForm = () => {
    setEditingCompany(undefined);
    setIsOpenEditForm(false);
  };

  const onDelete = async (id: number) => {
    await deleteCompany(id);
    removeCompaniesFromStore(id);
  };

  const columns = companiesColumns(openEditForm, onDelete);

  useEffect(() => {
    const fetchCompanies = async () => {
      if (isDataLoad) return;
      const companiesList = await getCompanies();

      if (companiesList) {
        setCompanies(companiesList);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-4">
      <h1>Tabla de Usuarios</h1>
      <DataTable columns={columns} data={companies} isLoading={loading} />

      <CompaniesForm
        isOpen={isOpenEditForm}
        onClose={closeEditForm}
        isEditMode={true}
        company={editingCompany}
      />
    </div>
  );
}
