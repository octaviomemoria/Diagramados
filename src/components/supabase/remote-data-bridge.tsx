"use client"

import { useEffect } from "react"
import { toast } from "sonner"
import { loadRemoteData, remoteEnabled } from "@/lib/supabase/remote-data"
import { useDiagramadosStore } from "@/store/use-diagramados-store"

export function RemoteDataBridge() {
  const setRemoteData = useDiagramadosStore((state) => state.setRemoteData)
  useEffect(() => {
    if (!remoteEnabled()) return
    loadRemoteData().then((data) => { if (data) setRemoteData(data) }).catch(() => toast.error("Não foi possível sincronizar com o Supabase."))
  }, [setRemoteData])
  return null
}
