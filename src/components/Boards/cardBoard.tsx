import Image from "next/image"

import { cn } from "@/lib/utils"
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "../ui/context-menu"
import { PencilRuler } from "lucide-react"
import { Board } from "../../../types"
import { useDeleteBoard } from "@/queries/boards"
import { Skeleton } from "../ui/skeleton"
import { useRef } from "react"

interface CardBoardProps extends React.HTMLAttributes<HTMLDivElement> {
	board: Board | null
	width?: number
	height?: number
}

export function CardBoard({ board, width, height, className, ...props }: CardBoardProps) {
	const deleteBoard = useDeleteBoard()
	const isRemoving = useRef(false)

	if (deleteBoard.isPending) isRemoving.current = true
	if (deleteBoard.isError) isRemoving.current = false

	return isRemoving.current || board === null ? (
		<div className={cn("space-y-3 w-[150px]", className)} {...props}>
			<Skeleton className="h-[150px] w-[150px]" />
			<Skeleton className="h-4 w-20" />
			<Skeleton className="h-3 w-16" />
		</div>
	) : (
		<div className={cn("space-y-3 w-[150px] cursor-pointer", className)} {...props}>
			<ContextMenu>
				<ContextMenuTrigger>
					<div className="overflow-hidden rounded-md">
						{board?.cover ? (
							<Image
								src={board.cover}
								alt={board.name}
								width={150}
								height={150}
								className={cn(
									"h-auto w-auto object-cover transition-all hover:scale-105",
									"aspect-square"
								)}
							/>
						) : (
							<div className="bg-[#131313] dark:bg-[#1f1f1f] h-[150px] w-[150px] flex items-center justify-center transition-all hover:scale-110">
								<PencilRuler size={30} className="text-white" />
							</div>
						)}
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent className="w-40">
					<ContextMenuItem>Share</ContextMenuItem>
					<ContextMenuItem>Rename</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem
						onClick={() => {
							deleteBoard.mutate(board.id)
						}}
					>
						Delete
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<div className="space-y-1 text-sm">
				<h3 className="font-medium leading-none">{board.name}</h3>
				<p className="text-xs text-muted-foreground">
					{new Date(board.updated_at).toLocaleDateString()}
				</p>
			</div>
		</div>
	)
}
