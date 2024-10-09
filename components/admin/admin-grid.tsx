import { AdminUsers } from "./admin-users";
import { AdminServers } from "./admin-servers";

export const AdminGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      <AdminUsers />
      <AdminServers />
    </div>
  );
};
