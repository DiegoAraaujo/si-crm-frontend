"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schemas";
import { useLogin } from "../hooks";
import { cn } from "@/lib/utils";
import { Mail, Lock, Eye } from "lucide-react";
import Link from "next/link";

export const LoginForm = () => {
  const { mutate, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    mutate({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-base">
          Endereço de E-mail
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            {...register("email")}
            type="email"
            placeholder="agent@sicrm.com"
            className={cn(
              "w-full border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-text-base placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary transition",
              errors.email &&
                "border-danger focus:border-danger focus:ring-danger",
            )}
          />
        </div>
        {errors.email && (
          <span className="text-xs text-danger">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-base">Senha</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            className={cn(
              "w-full border border-border rounded-lg pl-10 pr-10 py-3 text-sm text-text-base placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary transition",
              errors.password &&
                "border-danger focus:border-danger focus:ring-danger",
            )}
          />
          <Eye className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted cursor-pointer" />
        </div>
        {errors.password && (
          <span className="text-xs text-danger">{errors.password.message}</span>
        )}
      </div>

      {error && (
        <div className="bg-danger-light border border-danger/20 rounded-lg px-4 py-3">
          <p className="text-sm text-danger">E-mail ou senha inválidos.</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg py-3 transition"
      >
        {isPending ? "Entrando..." : "Entrar no Painel"}
      </button>

      <p className="text-sm text-text-muted text-center">
        Não tem uma conta?{" "}
        <Link
          href="/register"
          className="text-primary font-medium hover:underline"
        >
          Criar Conta
        </Link>
      </p>
    </form>
  );
};
