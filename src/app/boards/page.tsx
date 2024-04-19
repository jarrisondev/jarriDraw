"use client"

import { CardBoard } from "@/components/Boards/cardBoard"
import ModeGrid from "@/components/Boards/modeGrid"
import Layout from "@/components/Layout/layout"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { useRef, useState } from "react"
import { CirclePlus } from "lucide-react"
import { InsertBoard } from "../../../types"
import { useCreateBoard, useDeleteBoard, useGetUserBoards } from "@/queries/boards"

export type SortType = "alphabetical" | "dateCreated" | "lastViewed"
export type ViewType = "grid" | "list"

export default function Boards() {
	const boards = useGetUserBoards()
	const createBoard = useCreateBoard()
	const deleteBoard = useDeleteBoard()
	const boardsLength = useRef(boards.data?.length ?? 0)
	const [viewType, setViewType] = useState<ViewType>("grid")
	const [sortType, setSortType] = useState<SortType>("lastViewed")

	const isCreating = useRef(false)

	if (createBoard.isPending) isCreating.current = true
	if (boards.isSuccess && boards.data?.length !== boardsLength.current) {
		boardsLength.current = boards.data?.length ?? 0
		isCreating.current = false
	}

	const createNewBoard = () => {
		const newBoard: InsertBoard = {
			name: "New Board",
			data: {},
		}
		createBoard.mutate(newBoard)
	}

	return (
		<Layout
			headerSlot={
				<Button disabled={createBoard.isPending} className="flex gap-3" onClick={createNewBoard}>
					<CirclePlus />
					Create a new board
				</Button>
			}
		>
			<div className="mt-28">
				<div className="flex justify-between">
					<h2 className="text-4xl font-bold">Your recent boards</h2>
					<div className="flex gap-3 items-center">
						<Select
							value={sortType}
							onValueChange={(value: SortType) => {
								setSortType(value)
							}}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="alphabetical">Alphabetical</SelectItem>
								<SelectItem value="dateCreated">Date created</SelectItem>
								<SelectItem value="lastViewed">Last viewed</SelectItem>
							</SelectContent>
						</Select>
						<ModeGrid viewType={viewType} setViewType={setViewType} />
					</div>
				</div>
				<div className="flex mt-10 gap-10">
					{boards.isLoading && !boards.data
						? Array.from({ length: 4 }).map((_, index) => (
								<CardBoard key={index} board={null} width={300} height={300} />
						  ))
						: boards.data?.map((board, index) => (
								<CardBoard
									key={index}
									board={board}
									width={300}
									height={300}
									disabled={isCreating.current}
									handleDelete={deleteBoard.mutate}
								/>
						  ))}
					{isCreating.current && <CardBoard board={null} width={300} height={300} />}
				</div>
			</div>
		</Layout>
	)
}
