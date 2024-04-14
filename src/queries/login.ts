import { createClient } from "@/utils/supabase/client"
import { useMutation, useQuery } from "@tanstack/react-query"

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

			return data.user
		},
	})
}
