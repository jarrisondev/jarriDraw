import { createClient } from "@/utils/supabase/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Board, InsertBoard } from "../../types"
import { redirect } from "next/navigation"
import { routes } from "@/utils/routes"

export function useCreateBoard() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (board: InsertBoard) => {
			const supabase = createClient()
			await supabase.from("board").insert(board)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["boards"] })
		},
	})
}

export function useGetUserBoards() {
	return useQuery({
		queryKey: ["boards"],
		queryFn: async () => {
			const supabase = createClient()
			const {
				data: { session },
			} = await supabase.auth.getSession()
			if (!session?.user.id) redirect(routes.home)

			const res = await supabase
				.from("board_user")
				.select("board_id")
				.eq("user_id", session?.user.id)

			const boardIds = res?.data?.map((board: any) => board.board_id) ?? []

			const boards = await supabase.from("board").select("*").in("id", boardIds)
			return boards.data as Board[]
		},
	})
}

export function useDeleteBoard() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (id: Board["id"]) => {
			const supabase = createClient()
			await supabase.from("board").delete().eq("id", id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["boards"] })
		},
	})
}
