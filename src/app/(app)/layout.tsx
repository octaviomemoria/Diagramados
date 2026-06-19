import { AppSidebar } from "@/components/layout/app-sidebar"
import { MobileHeader } from "@/components/layout/mobile-header"
import { redirect } from "next/navigation"
import { isSupabaseConfigured } from "@/lib/supabase/config"
import { createClient } from "@/lib/supabase/server"
import { RemoteDataBridge } from "@/components/supabase/remote-data-bridge"

export const dynamic = "force-dynamic"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    if (!data?.claims) redirect("/login")
  }
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <MobileHeader />
      <RemoteDataBridge />
      <main className="min-h-screen lg:pl-[232px]">{children}</main>
    </div>
  )
}
