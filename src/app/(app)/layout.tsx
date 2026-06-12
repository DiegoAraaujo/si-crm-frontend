import { Sidebar } from "@/shared/components/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="flex-1 lg:ml-60 p-6 pb-24 lg:pb-6">{children}</main>
    </div>
  );
};

export default AppLayout;
