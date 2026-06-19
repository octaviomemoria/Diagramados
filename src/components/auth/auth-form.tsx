import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { login, signup } from "@/app/(auth)/login/actions"

export function AuthForm({ mode, error, message }: { mode: "login" | "register"; error?: string; message?: string }) {
  const registering = mode === "register"
  return <Card className="w-full max-w-md border-0 bg-transparent shadow-none sm:border sm:bg-card sm:shadow-sm"><CardHeader className="p-0 pb-7 sm:p-7 sm:pb-6"><CardTitle className="text-3xl tracking-[-0.04em]">{registering ? "Crie sua conta" : "Bem-vindo de volta"}</CardTitle><CardDescription className="text-sm">{registering ? "Comece a estruturar sua organização." : "Entre para continuar seus projetos."}</CardDescription></CardHeader><CardContent className="p-0 sm:px-7 sm:pb-7"><form action={registering ? signup : login}><FieldGroup>{registering ? <Field><FieldLabel htmlFor="name">Nome</FieldLabel><Input id="name" name="name" required autoComplete="name" /></Field> : null}<Field><FieldLabel htmlFor="email">E-mail</FieldLabel><Input id="email" name="email" type="email" required autoComplete="email" /></Field><Field><FieldLabel htmlFor="password">Senha</FieldLabel><Input id="password" name="password" type="password" minLength={6} required autoComplete={registering ? "new-password" : "current-password"} /></Field>{error ? <p className="rounded-lg bg-[#fff0ed] px-3 py-2 text-xs font-medium text-destructive">{error}</p> : null}{message ? <p className="rounded-lg bg-[#e8f7ef] px-3 py-2 text-xs font-medium text-[#117a48]">{message}</p> : null}<Button type="submit" size="lg" className="w-full">{registering ? "Criar conta" : "Entrar"}</Button><p className="text-center text-sm text-muted-foreground">{registering ? "Já possui conta?" : "Ainda não possui conta?"} <Link className="font-semibold text-primary hover:underline" href={registering ? "/login" : "/register"}>{registering ? "Entrar" : "Criar conta"}</Link></p></FieldGroup></form></CardContent></Card>
}
