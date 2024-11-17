import Navbar from "@/components/navigation/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
