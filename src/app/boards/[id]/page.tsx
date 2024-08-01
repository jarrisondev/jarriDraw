"use client"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { routes } from "@/utils/routes"
import { useRouter } from "next/navigation"
import { Excalidraw } from "@/components/excalidraw"
import { getBoard, updateBoardData } from "@/queries/boards"
import {
	ExcalidrawImperativeAPI,
	ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types"
import { useDebounceCallback } from "usehooks-ts"
import { useEffect, useState } from "react"
import { ModeToggle } from "@/components/ui/modeToggle"
import UserAvatar from "@/components/shared/userAvatar"
import { Board } from "../../../../types"

export default function Boards({ params }: { params: { id: string } }) {
	const router = useRouter()
	const { resolvedTheme } = useTheme()
	const [initialData, setInitialData] = useState<ExcalidrawInitialDataState | null>(null)
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)

	const theme = resolvedTheme === "dark" ? "dark" : "light"
	const id = params.id

	const handleSave = useDebounceCallback((data: ExcalidrawInitialDataState) => {
		updateBoardData(data, id)
	}, 5000)

	useEffect(() => {
		return () => {
			if (excalidrawAPI) {
				const state = excalidrawAPI.getAppState()
				const elements = excalidrawAPI.getSceneElements()

				updateBoardData(
					{
						elements,
						appState: state,
					},
					id
				)
			}
		}
	}, [])

	useEffect(() => {
		getBoard(id).then((data: Board) => {
			console.log(data)
			if (data) setInitialData(data.boardData)
		})
	}, [id])

	return (
		<div className="flex flex-col h-screen">
			{initialData === null ? (
				<div>Loading...</div>
			) : (
				<Excalidraw
					theme={theme}
					excalidrawAPI={(api) => setExcalidrawAPI(api)}
					isCollaborating={false}
					initialData={initialData}
					onChange={(elements, appState, files) => {
						handleSave({ elements, appState, files })
					}}
					renderTopRightUI={() => {
						return (
							<div className="flex items-center gap-3">
								<ModeToggle />
								<Button
									variant="secondary"
									className="flex gap-3"
									onClick={() => {
										router.push(routes.boards)
									}}
								>
									Back to my boards
								</Button>
								<UserAvatar />
							</div>
						)
					}}
				/>
			)}
		</div>
	)
}
