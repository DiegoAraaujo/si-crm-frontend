import { LoginForm } from "@/modules/auth/components/login-form";

const LoginPage = () => {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200')",
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
            Eleve seu portfólio imobiliário.
          </h2>
          <p className="text-blue-200 text-sm max-w-xs">
            Junte-se a milhares de agentes de elite gerenciando leads
            multimilionários com o CRM mais intuitivo do mercado.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-text-base">
              Bem-vindo de volta
            </h1>
            <p className="text-text-muted text-sm">
              Insira suas credenciais para acessar o painel.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
