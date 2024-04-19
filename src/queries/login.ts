import { createClient } from "@/utils/supabase/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { User } from "../../types"

export function useSignInWithGitHub() {
	return useMutation({
		mutationFn: async () => {
			const supabase = createClient()
			await supabase.auth.signInWithOAuth({
				provider: "github",
			})
		},
	})
}

export function useSignOut() {
	return useMutation({
		mutationFn: async () => {
			const supabase = createClient()

			const { error } = await supabase.auth.signOut()
			window.location.reload()
			return { error }
		},
	})
}

export function useGetCurrentUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const supabase = createClient()
			const { data } = await supabase.auth.getUser()
			if (!data.user?.id) return null
			const response = await supabase.from("profiles").select().eq("id", data.user.id)

			const user: User | null = response.data?.[0] ?? null
			return user
		},
	})
}
