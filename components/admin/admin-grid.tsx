import { AdminUsers } from "./admin-users";
import { AdminServers } from "./admin-servers";

export const AdminGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <AdminUsers />
      <AdminServers />
    </div>
  );
};
