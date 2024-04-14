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

interface CardBoardProps extends React.HTMLAttributes<HTMLDivElement> {
	board: any
	width?: number
	height?: number
}

export function CardBoard({ board, width, height, className, ...props }: CardBoardProps) {
	return (
		<div className={cn("space-y-3 w-[150px]", className)} {...props}>
			<ContextMenu>
				<ContextMenuTrigger>
					<div className="overflow-hidden rounded-md">
						{board.cover ? (
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
					<ContextMenuItem>Delete</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			<div className="space-y-1 text-sm">
				<h3 className="font-medium leading-none">{board.name}</h3>
				<p className="text-xs text-muted-foreground">{board.updatedAt}</p>
			</div>
		</div>
	)
}
