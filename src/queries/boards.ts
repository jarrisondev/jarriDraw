import { createClient } from "@/utils/supabase/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Board, InsertBoard } from "../../types"
import { redirect } from "next/navigation"
import { routes } from "@/utils/routes"
import { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types"
import { updateBoardAdapter } from "@/utils/updateBoardAdapter"
import { SupabaseClient } from "@supabase/supabase-js"

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

export async function getBoard(id: Board["id"]): Promise<Board | null> {
	const supabase = createClient()
	const board = await supabase.from("board").select("*").eq("id", id)
	const boardData = board?.data?.[0] as Board

	return boardData ?? null
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

export async function updateBoardData(data: ExcalidrawInitialDataState, id: Board["id"]) {
	const supabase = createClient()
	const dataParsed = updateBoardAdapter(data)
	return await supabase
		.from("board")
		.update({ boardData: dataParsed, updated_at: new Date() })
		.eq("id", id)
		.select("*")
}
