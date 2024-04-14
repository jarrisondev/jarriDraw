import { Sun } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import { Icons } from "../icons"
import { ModeToggle } from "../ui/modeToggle"

export default function Header() {
	return (
		<nav className="flex justify-between items-center">
			<Link href="/">
				<Icons.logo />
			</Link>
			<div className="flex items-center gap-5 ">
				<ModeToggle />
				<Button className="flex gap-3">
					Log in
					<Icons.gitHub className="h-5 w-5" />
				</Button>
			</div>
		</nav>
	)
}
