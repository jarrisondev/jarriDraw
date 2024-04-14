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
import { CirclePlus } from "lucide-react"
import { useState } from "react"

const boards = [
	{
		name: "Board 1",
		createdAt: "1 hour ago",
		updatedAt: "10 minutes ago",
	},
	{
		name: "Board 2",
		createdAt: "3 hour ago",
		updatedAt: "1 minutes ago",
	},
	{
		name: "Board 3",
		createdAt: "1 week ago",
		updatedAt: "10 days ago",
	},
]

export type SortType = "alphabetical" | "dateCreated" | "lastViewed"
export type ViewType = "grid" | "list"

export default function Boards() {
	const [viewType, setViewType] = useState<ViewType>("grid")
	const [sortType, setSortType] = useState<SortType>("lastViewed")

	return (
		<Layout
			headerSlot={
				<Button className="flex gap-3" onClick={() => {}}>
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
					{boards.map((board, index) => (
						<CardBoard key={index} board={board} width={300} height={300} />
					))}
				</div>
			</div>
		</Layout>
	)
}
