import { routes } from "@/utils/routes"
import { User } from "../../../types"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useSignOut } from "@/queries/login"
import Link from "next/link"

interface Props {
	user: User
}

export default function UserAvatar({ user }: Props) {
	const signOut = useSignOut()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<span className="cursor-pointer">
					<Avatar>
						<AvatarImage src={user.avatar_url ?? ""} />
						<AvatarFallback>{user.name ?? ""}</AvatarFallback>
					</Avatar>
					<span className="sr-only">Toggle theme</span>
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<Link href={routes.boards}>
					<DropdownMenuItem>My board</DropdownMenuItem>
				</Link>
				<DropdownMenuItem onClick={() => {}}>Settings</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => {
						signOut.mutate()
					}}
				>
					{signOut.isPending ? "Logging out..." : "Log out"}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
