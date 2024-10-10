import Navbar from "@/components/auth-page/navbar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-grow">
        <div className="w-11/12 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
