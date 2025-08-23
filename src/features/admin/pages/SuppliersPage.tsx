import HeaderSection from "../components/suppliers/HeaderSection";
import SearchSupplier from "../components/suppliers/SearchSypplier";
import StatsGrid from "../components/suppliers/StatsGrid";
import SuppliersGrid from "../components/suppliers/SuppliersGrid";

const SupplierPage = () => {
  return (
    <>
      <HeaderSection />
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
