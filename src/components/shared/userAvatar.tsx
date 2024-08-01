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
import { useGetCurrentUser, useSignInWithGitHub, useSignOut } from "@/queries/login"
import Link from "next/link"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { Icons } from "../icons"

export default function UserAvatar() {
	const signOut = useSignOut()

	const getCurrentUser = useGetCurrentUser()
	const signInWithGitHub = useSignInWithGitHub()

	const user = getCurrentUser.data
	const loading = getCurrentUser.isLoading || signInWithGitHub.isPending

	return user ? (
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
	) : loading ? (
		<Skeleton className="h-10 w-10 rounded-full" />
	) : (
		<Button
			className="flex gap-3"
			disabled={loading}
			onClick={() => {
				signInWithGitHub.mutate()
			}}
		>
			Log in
			<Icons.gitHub className="h-5 w-5" />
		</Button>
	)
}
