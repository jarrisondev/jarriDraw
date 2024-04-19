import { Database } from "./supabase"

export type User = Database["public"]["Tables"]["profiles"]["Row"]

export type Board = Database["public"]["Tables"]["board"]["Row"]
export type InsertBoard = Database["public"]["Tables"]["board"]["Insert"]

export type BoardUser = Database["public"]["Tables"]["board_user"]["Row"]
