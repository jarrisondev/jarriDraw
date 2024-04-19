export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
	public: {
		Tables: {
			board: {
				Row: {
					created_at: string
					data: Json
					description: string
					id: string
					name: string
					owner_id: string | null
					updated_at: string
				}
				Insert: {
					created_at?: string
					data: Json
					description?: string
					id?: string
					name?: string
					owner_id?: string | null
					updated_at?: string
				}
				Update: {
					created_at?: string
					data?: Json
					description?: string
					id?: string
					name?: string
					owner_id?: string | null
					updated_at?: string
				}
				Relationships: [
					{
						foreignKeyName: "public_board_owner_id_fkey"
						columns: ["owner_id"]
						isOneToOne: false
						referencedRelation: "profiles"
						referencedColumns: ["id"]
					}
				]
			}
			board_user: {
				Row: {
					board_id: string | null
					created_at: string
					id: number
					user_id: string | null
				}
				Insert: {
					board_id?: string | null
					created_at?: string
					id?: number
					user_id?: string | null
				}
				Update: {
					board_id?: string | null
					created_at?: string
					id?: number
					user_id?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "public_board_user_board_id_fkey"
						columns: ["board_id"]
						isOneToOne: false
						referencedRelation: "board"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "public_board_user_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "profiles"
						referencedColumns: ["id"]
					}
				]
			}
			profiles: {
				Row: {
					description: string | null
					email: string | null
					id: string
					language: string | null
					name: string | null
				}
				Insert: {
					description?: string | null
					email?: string | null
					id: string
					language?: string | null
					name?: string | null
				}
				Update: {
					description?: string | null
					email?: string | null
					id?: string
					language?: string | null
					name?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey"
						columns: ["id"]
						isOneToOne: true
						referencedRelation: "users"
						referencedColumns: ["id"]
					}
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
	? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
			Row: infer R
	  }
		? R
		: never
	: never

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
			Insert: infer I
	  }
		? I
		: never
	: never

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
	? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
			Update: infer U
	  }
		? U
		: never
	: never

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
	? PublicSchema["Enums"][PublicEnumNameOrOptions]
	: never
