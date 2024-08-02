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
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ModeToggle } from "@/components/ui/modeToggle"
import UserAvatar from "@/components/shared/userAvatar"
import { Skeleton } from "@/components/ui/skeleton"

export default function Boards({ params }: { params: { id: string } }) {
	const router = useRouter()
	const { resolvedTheme } = useTheme()
	const [initialData, setInitialData] = useState<ExcalidrawInitialDataState | null>(null)
	const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI | null>(null)

	const theme = resolvedTheme === "dark" ? "dark" : "light"
	const id = params.id

	const handleSave = useDebounceCallback((data: ExcalidrawInitialDataState) => {
		updateBoardData(data, id)
	}, 4000)

	useLayoutEffect(() => {
		const saveOnUnmount = () => {
			if (excalidrawAPIRef.current) {
				const state = excalidrawAPIRef.current.getAppState()
				const elements = excalidrawAPIRef.current.getSceneElements()
				const files = excalidrawAPIRef.current.getFiles()

				updateBoardData(
					{
						elements,
						appState: state,
						files,
					},
					id
				)
			}
		}

		return () => {
			handleSave.cancel()
			saveOnUnmount()
		}
	}, [id, handleSave])

	useEffect(() => {
		getBoard(id).then((data) => {
			if (data) setInitialData(data.boardData as ExcalidrawInitialDataState)
		})
	}, [id])

	return (
		<div className="flex flex-col h-screen">
			{initialData === null ? (
				<Skeleton className="relative h-full w-full flex items-center justify-center">
					<p className="">Loading...</p>
				</Skeleton>
			) : (
				<Excalidraw
					theme={theme}
					excalidrawAPI={(api) => (excalidrawAPIRef.current = api)}
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
