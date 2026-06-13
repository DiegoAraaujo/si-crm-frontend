import { Sidebar } from "@/shared/components/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-bg overflow-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-60 p-6 pb-24 lg:pb-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
