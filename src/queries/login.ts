import { createClient } from "@/utils/supabase/client"
import { useMutation, useQuery } from "@tanstack/react-query"

export function useSignInWithGitHub() {
	return useMutation({
		mutationFn: async () => {
			const supabase = createClient()

			const { data } = await supabase.auth.signInWithOAuth({
				provider: "github",
			})

			return data
		},
	})
}

export async function signOut() {
	const supabase = createClient()

	const { error } = await supabase.auth.signOut()

	return { error }
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
