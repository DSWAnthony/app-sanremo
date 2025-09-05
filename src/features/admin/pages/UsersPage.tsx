import SectionHeader from "@/components/common/SectionHeader";
import StatsGrid from "../components/users/StatsGrid";
import UsersFilter from "../components/users/UsersFilter";
import UsersGrid from "../components/users/UsersGrid";

const UserPage = () => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Usuarios"
        subtitle="Gestiona los usuarios del sistema"
        buttonText="Agregar usuario"
        onButtonClick={() => {}}
      />
      <StatsGrid />
      <UsersFilter></UsersFilter>
      <UsersGrid />
    </div>
  );
};

export default UserPage;
