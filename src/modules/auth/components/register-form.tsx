"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchema } from "../schemas";
import { useRegister } from "../hooks";
import { cn } from "@/lib/utils";
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";

export const RegisterForm = () => {
  const { mutate, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    mutate({ name: data.name, email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            {...register("name")}
            type="text"
            placeholder="Seu nome"
            className={cn(
              "w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#1e3a7b] focus:ring-1 focus:ring-[#1e3a7b] transition",
              errors.name && "border-red-400",
            )}
          />
        </div>
        {errors.name && (
          <span className="text-xs text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">
          E-mail Profissional
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            {...register("email")}
            type="email"
            placeholder="exemplo@sicrm.com"
            className={cn(
              "w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#1e3a7b] focus:ring-1 focus:ring-[#1e3a7b] transition",
              errors.email && "border-red-400",
            )}
          />
        </div>
        {errors.email && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Senha</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={cn(
                "w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#1e3a7b] focus:ring-1 focus:ring-[#1e3a7b] transition",
                errors.password && "border-red-400",
              )}
            />
          </div>
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Confirmar Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className={cn(
                "w-full border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#1e3a7b] focus:ring-1 focus:ring-[#1e3a7b] transition",
                errors.confirmPassword && "border-red-400",
              )}
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Ao clicar em Criar Conta, você concorda com nossos{" "}
        <span className="text-[#1e3a7b] font-medium cursor-pointer hover:underline">
          Termos de Uso
        </span>{" "}
        e{" "}
        <span className="text-[#1e3a7b] font-medium cursor-pointer hover:underline">
          Política de Privacidade
        </span>
        .
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-sm text-red-600">
            Erro ao criar conta. Tente novamente.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#1e3a7b] hover:bg-[#152d62] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg py-3 transition"
      >
        {isPending ? "Criando..." : "Criar Conta →"}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-[#1e3a7b] font-medium hover:underline"
        >
          Entrar
        </Link>
      </p>
    </form>
  );
};
