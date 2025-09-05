import StatsGrid from "../components/products/StatsGrid";
import ProductsFilter from "../components/products/ProductsFilter";
import ProductsGrid from "../components/products/ProductsGrid";
import SectionHeader from "@/components/common/SectionHeader";

const ProductPage = () => {
  return (
    <div>
      <SectionHeader
        title="Productos"
        subtitle="Explora el catálogo de productos disponibles"
        //buttonText="Agregar producto"
        //onButtonClick={() => {}}
      />
      <br />
      <StatsGrid />
      <br />
      <ProductsFilter />
      <br />
      <ProductsGrid />
    </div>
  );
};

export default ProductPage;
