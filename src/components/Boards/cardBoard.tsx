import Image from "next/image"

import { cn } from "@/lib/utils"

import { Ellipsis, PencilRuler } from "lucide-react"
import { Board } from "../../../types"
import { Skeleton } from "../ui/skeleton"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { routes } from "@/utils/routes"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { RenameBoardDialog } from "./renameBoardDialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface CardBoardProps extends React.HTMLAttributes<HTMLDivElement> {
	board: Board | null
	width?: number
	height?: number
	disabled?: boolean
	handleDelete?: (id: Board["id"]) => void
}

export function CardBoard({
	board,
	width,
	height,
	className,
	disabled,
	handleDelete,
	...props
}: CardBoardProps) {
	const router = useRouter()

	const [renameBoardDialog, setRenameBoardDialog] = useState(false)
	const [settingsMenu, setSettingsMenu] = useState(false)

	const handleClick = (id: string) => () => {
		router.push(routes.board(id))
	}

	return board === null ? (
		<div className={cn("space-y-3 w-[150px]", className)} {...props}>
			<Skeleton className="h-[150px] w-[150px]" />
			<Skeleton className="h-4 w-20" />
			<Skeleton className="h-3 w-16" />
		</div>
	) : (
		<div className={cn("space-y-3 w-[150px]", className)} {...props}>
			<div
				className="overflow-hidden rounded-md hover:opacity-85 cursor-pointer"
				onClick={handleClick(board.id)}
			>
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
					<div className="bg-[#131313] dark:bg-[#1f1f1f]  h-[150px] w-[150px] flex items-center justify-center transition-all hover:scale-110">
						<PencilRuler size={30} className="text-white" />
					</div>
				)}
			</div>
			<div className="text-sm space-y-1">
				<div className="flex gap-1">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<h3 className="flex-1 font-medium  truncate">{board.name}</h3>
							</TooltipTrigger>
							<TooltipContent>
								<p>{board.name}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<DropdownMenu
						open={settingsMenu}
						onOpenChange={(open) => {
							setSettingsMenu(open)
						}}
					>
						<DropdownMenuTrigger asChild>
							<span className="cursor-pointer">
								<Ellipsis size={16} />
							</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem disabled onClick={() => {}}>
								Shared
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={(e) => {
									setRenameBoardDialog(true)
									setSettingsMenu(false)
								}}
							>
								Rename
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									if (handleDelete) {
										handleDelete(board.id)
									}
									setSettingsMenu(false)
								}}
							>
								<p className="text-red-500">Delete</p>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<p className="text-xs text-muted-foreground">
					{new Date(board.updated_at ?? 0).toLocaleDateString()}
				</p>
			</div>
			<RenameBoardDialog
				id={board.id}
				name={board.name}
				open={renameBoardDialog}
				onOpenChange={(open) => {
					setRenameBoardDialog(open)
				}}
			/>
		</div>
	)
}
