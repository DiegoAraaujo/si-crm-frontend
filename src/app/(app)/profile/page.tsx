"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useMe, useUpdateMe } from "@/modules/users/hooks";
import { profileSchema, type ProfileSchema } from "@/modules/users/schemas";
import { cn } from "@/lib/utils";

const ProfilePage = () => {
  const { data: user, isLoading } = useMe();
  const { mutate: updateMe, isPending, isSuccess } = useUpdateMe();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) reset({ name: user.name });
  }, [user, reset]);

  const onSubmit = (data: ProfileSchema) => {
    updateMe(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Perfil</h1>
        <p className="text-text-muted text-sm mt-1">
          Gerencie suas informações pessoais.
        </p>
      </div>

      <div className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="font-semibold text-text-base">{user?.name}</p>
            <p className="text-sm text-text-muted">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-base">
              Nome completo
            </label>
            <input
              {...register("name")}
              className={cn(
                "w-full border border-border rounded-lg px-3 py-2.5 text-sm text-text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary transition",
                errors.name && "border-danger",
              )}
            />
            {errors.name && (
              <span className="text-xs text-danger">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-text-base">E-mail</label>
            <input
              value={user?.email}
              disabled
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm text-text-muted bg-gray-50 cursor-not-allowed"
            />
            <span className="text-xs text-text-muted">
              O e-mail não pode ser alterado.
            </span>
          </div>

          {isSuccess && (
            <div className="bg-warm/10 border border-warm/20 rounded-lg px-4 py-3">
              <p className="text-sm text-warm font-medium">
                Perfil atualizado com sucesso!
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 text-sm font-semibold bg-primary hover:bg-primary-dark text-white rounded-lg transition disabled:opacity-50"
            >
              {isPending ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
