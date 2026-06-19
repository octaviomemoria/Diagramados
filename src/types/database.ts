export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_generation_logs: {
        Row: {
          created_at: string
          generation_type: string
          id: string
          input_excerpt: string | null
          provider: string
          status: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          generation_type: string
          id?: string
          input_excerpt?: string | null
          provider?: string
          status: string
          user_id?: string
          workspace_id?: string
        }
        Update: {
          created_at?: string
          generation_type?: string
          id?: string
          input_excerpt?: string | null
          provider?: string
          status?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_generation_logs_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          deleted_at: string | null
          employee_count: number | null
          id: string
          name: string
          notes: string | null
          segment: string | null
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          employee_count?: number | null
          id: string
          name: string
          notes?: string | null
          segment?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          employee_count?: number | null
          id?: string
          name?: string
          notes?: string | null
          segment?: string | null
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      org_chart_edges: {
        Row: {
          created_at: string
          id: string
          label: string | null
          org_chart_id: string
          source_node_id: string
          target_node_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id: string
          label?: string | null
          org_chart_id: string
          source_node_id: string
          target_node_id: string
          workspace_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          org_chart_id?: string
          source_node_id?: string
          target_node_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_chart_edges_org_chart_id_fkey"
            columns: ["org_chart_id"]
            isOneToOne: false
            referencedRelation: "org_charts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_chart_edges_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "org_chart_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_chart_edges_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "org_chart_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_chart_edges_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      org_chart_nodes: {
        Row: {
          color: string | null
          created_at: string
          department: string | null
          id: string
          notes: string | null
          occupant_name: string | null
          org_chart_id: string
          position_x: number
          position_y: number
          reports_to_node_id: string | null
          status: string
          title: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          department?: string | null
          id: string
          notes?: string | null
          occupant_name?: string | null
          org_chart_id: string
          position_x?: number
          position_y?: number
          reports_to_node_id?: string | null
          status?: string
          title: string
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          department?: string | null
          id?: string
          notes?: string | null
          occupant_name?: string | null
          org_chart_id?: string
          position_x?: number
          position_y?: number
          reports_to_node_id?: string | null
          status?: string
          title?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_chart_nodes_org_chart_id_fkey"
            columns: ["org_chart_id"]
            isOneToOne: false
            referencedRelation: "org_charts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_chart_nodes_reports_to_node_id_fkey"
            columns: ["reports_to_node_id"]
            isOneToOne: false
            referencedRelation: "org_chart_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_chart_nodes_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      org_charts: {
        Row: {
          company_id: string
          created_at: string
          deleted_at: string | null
          description: string | null
          id: string
          name: string
          revision: number
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
          viewport: Json | null
          workspace_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id: string
          name: string
          revision?: number
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          viewport?: Json | null
          workspace_id?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: string
          name?: string
          revision?: number
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          viewport?: Json | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_charts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_charts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      process_edges: {
        Row: {
          created_at: string
          id: string
          label: string | null
          process_map_id: string
          source_handle: string | null
          source_node_id: string
          target_handle: string | null
          target_node_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id: string
          label?: string | null
          process_map_id: string
          source_handle?: string | null
          source_node_id: string
          target_handle?: string | null
          target_node_id: string
          workspace_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string | null
          process_map_id?: string
          source_handle?: string | null
          source_node_id?: string
          target_handle?: string | null
          target_node_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_edges_process_map_id_fkey"
            columns: ["process_map_id"]
            isOneToOne: false
            referencedRelation: "process_maps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_edges_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "process_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_edges_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "process_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_edges_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      process_maps: {
        Row: {
          company_id: string
          created_at: string
          deleted_at: string | null
          department: string | null
          description: string | null
          id: string
          name: string
          process_owner: string | null
          revision: number
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
          viewport: Json | null
          workspace_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          deleted_at?: string | null
          department?: string | null
          description?: string | null
          id: string
          name: string
          process_owner?: string | null
          revision?: number
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          viewport?: Json | null
          workspace_id?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          deleted_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          name?: string
          process_owner?: string | null
          revision?: number
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
          viewport?: Json | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_maps_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_maps_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      process_nodes: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          id: string
          notes: string | null
          position_x: number
          position_y: number
          process_map_id: string
          responsible_role: string | null
          title: string
          type: string
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          id: string
          notes?: string | null
          position_x?: number
          position_y?: number
          process_map_id: string
          responsible_role?: string | null
          title: string
          type: string
          updated_at?: string
          workspace_id?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          position_x?: number
          position_y?: number
          process_map_id?: string
          responsible_role?: string | null
          title?: string
          type?: string
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "process_nodes_process_map_id_fkey"
            columns: ["process_map_id"]
            isOneToOne: false
            referencedRelation: "process_maps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_nodes_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      workspace_members: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      save_org_chart_snapshot: {
        Args: {
          p_edges: Json
          p_expected_revision: number
          p_nodes: Json
          p_org_chart_id: string
          p_viewport?: Json
        }
        Returns: number
      }
      save_process_snapshot: {
        Args: {
          p_edges: Json
          p_expected_revision: number
          p_nodes: Json
          p_process_map_id: string
          p_viewport?: Json
        }
        Returns: number
      }
    }
    Enums: {
      project_status: "DRAFT" | "ACTIVE" | "ARCHIVED"
      workspace_role: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      project_status: ["DRAFT", "ACTIVE", "ARCHIVED"],
      workspace_role: ["OWNER", "ADMIN", "EDITOR", "VIEWER"],
    },
  },
} as const

