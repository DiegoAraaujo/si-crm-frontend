import { RegisterForm } from "@/modules/auth/components/register-form";

const RegisterPage = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200')",
          }}
        />
        <div className="absolute inset-0 bg-primary opacity-80" />

        <div className="relative z-10">
          <span className="text-white text-xl font-bold tracking-tight">
            SI CRM
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          <h2 className="text-white text-4xl font-bold leading-tight">
            A excelência na gestão do mercado imobiliário começa aqui.
          </h2>
          <p className="text-blue-200 text-sm max-w-xs">
            Comece a gerenciar seus leads com eficiência institucional.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-text-base">Criar Conta</h1>
            <p className="text-text-muted text-sm">
              Comece a gerenciar seus leads com eficiência institucional.
            </p>
          </div>
          <RegisterForm />
          <p className="text-center text-xs text-text-muted">
            © 2024 SI CRM — PROFESSIONAL PROPERTY MANAGEMENT
          </p>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
