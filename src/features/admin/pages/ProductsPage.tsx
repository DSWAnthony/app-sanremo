import HeaderSecction from "../components/products/HeaderSecction";
import StatsGrid from "../components/products/StatsGrid";
import FilterProducts from "../components/products/FilterProducts";
import ProductsGrid from "../components/products/ProductsGrid";

const ProductPage = () => {
  return (
    <div>
      <HeaderSecction />
      <br />
      <StatsGrid />
      <br />
      <FilterProducts />
      <br />
      <ProductsGrid />
    </div>
  );
};

export default ProductPage;
