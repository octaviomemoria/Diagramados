"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/supabase/config"

export async function login(formData: FormData) {
  if (!isSupabaseConfigured()) redirect("/dashboard")
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") })
  if (error) redirect(`/login?error=${encodeURIComponent("E-mail ou senha inválidos.")}`)
  redirect("/dashboard")
}

export async function signup(formData: FormData) {
  if (!isSupabaseConfigured()) redirect("/dashboard")
  const supabase = await createClient()
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")
  const fullName = String(formData.get("name") ?? "")
  const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
  if (error) redirect(`/register?error=${encodeURIComponent(error.message)}`)
  redirect("/login?message=Confira seu e-mail para confirmar a conta.")
}

export async function logout() {
  if (isSupabaseConfigured()) { const supabase = await createClient(); await supabase.auth.signOut() }
  redirect("/login")
}
