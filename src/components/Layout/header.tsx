import Link from "next/link"
import { Icons } from "../icons"
import { routes } from "@/utils/routes"
import { ModeToggle } from "../ui/modeToggle"
import UserAvatar from "../shared/userAvatar"

interface Props {
	slot?: React.ReactNode
}

export default function Header({ slot }: Props) {
	return (
		<nav className="flex justify-between items-center">
			<Link href={routes.home}>
				<Icons.logo />
			</Link>
			<div className="flex items-center gap-5">
				{slot}
				<ModeToggle />
				<UserAvatar />
			</div>
		</nav>
	)
}
