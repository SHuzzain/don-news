export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          id: string;
          image_url: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      locations: {
        Row: {
          created_at: string;
          id: string;
          local_street: string[] | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          local_street?: string[] | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          local_street?: string[] | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "locations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      news_sources: {
        Row: {
          created_at: string;
          id: string;
          image_url: string | null;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_url?: string | null;
          name?: string | null;
        };
        Relationships: [];
      };
      profile_category: {
        Row: {
          category_id: string | null;
          created_at: string;
          id: number;
          user_id: string | null;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          category_id?: string | null;
          created_at?: string;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profile_category_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: true;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_category_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profile_location: {
        Row: {
          created_at: string;
          id: string;
          location_id: string | null;
          title: string | null;
          user_Id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          location_id?: string | null;
          title?: string | null;
          user_Id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          location_id?: string | null;
          title?: string | null;
          user_Id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profile_location_location_id_fkey";
            columns: ["location_id"];
            isOneToOne: true;
            referencedRelation: "locations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profile_location_user_Id_fkey";
            columns: ["user_Id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          categories: string[] | null;
          email: string | null;
          full_name: string | null;
          id: string;
          initial_setup: boolean | null;
          primary_location: string | null;
          secondary_locatoin: string[] | null;
          sources: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          categories?: string[] | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          initial_setup?: boolean | null;
          primary_location?: string | null;
          secondary_locatoin?: string[] | null;
          sources?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          categories?: string[] | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          initial_setup?: boolean | null;
          primary_location?: string | null;
          secondary_locatoin?: string[] | null;
          sources?: string[] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
