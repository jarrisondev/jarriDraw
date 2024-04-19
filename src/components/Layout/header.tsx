import Link from "next/link"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { ModeToggle } from "../ui/modeToggle"
import UserAvatar from "../shared/userAvatar"
import { useGetCurrentUser, useSignInWithGitHub } from "@/queries/login"
import { routes } from "@/utils/routes"

interface Props {
	slot?: React.ReactNode
}

export default function Header({ slot }: Props) {
	const getCurrentUser = useGetCurrentUser()
	const signInWithGitHub = useSignInWithGitHub()

	const user = getCurrentUser.data
	const loading = getCurrentUser.isLoading || signInWithGitHub.isPending

	return (
		<nav className="flex justify-between items-center">
			<Link href={routes.home}>
				<Icons.logo />
			</Link>
			<div className="flex items-center gap-5">
				{slot}
				<ModeToggle />
				{user ? (
					<UserAvatar user={user} />
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
				)}
			</div>
		</nav>
	)
}
