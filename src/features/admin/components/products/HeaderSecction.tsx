const HeaderSecction = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Catálogo de Productos
        </h1>
        <p className="text-muted-foreground">
          Explora nuestro catálogo de productos disponibles
        </p>
      </div>
    </div>
  );
};

export default HeaderSecction;
