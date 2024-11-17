import { AdminHeader } from "@/components/admin/admin-header";
import { AdminGrid } from "@/components/admin/admin-grid";

const Admin = () => {
  return (
    <div className="space-y-6 ">
      <AdminHeader />
      <AdminGrid />
    </div>
  );
};

export default Admin;
