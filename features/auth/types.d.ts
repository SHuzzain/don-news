import { User as SupabaseUser } from "@supabase/supabase-js";

declare module "@supabase/supabase-js" {
  interface User extends SupabaseUser {
    // Add your custom fields here
    initial_setup: boolean;
  }
}
