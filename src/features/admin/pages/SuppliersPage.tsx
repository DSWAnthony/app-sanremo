import SectionHeader from "@/components/common/SectionHeader";
import SearchSupplier from "../components/suppliers/SearchSupplier";
import StatsGrid from "../components/suppliers/StatsGrid";
import SuppliersGrid from "../components/suppliers/SuppliersGrid";

const SupplierPage = () => {
  return (
    <>
      <SectionHeader
        title="Proveedores"
        subtitle="Gestiona la información de tus proveedores"
        buttonText="Agregar proveedor"
        //onButtonClick={() => {}}
      />
      <br />
      <StatsGrid />
      <br />
      <SearchSupplier />
      <br />
      <SuppliersGrid />
    </>
  );
};

export default SupplierPage;
