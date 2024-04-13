import { Sun } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"

export default function Header() {
	return (
		<nav className="flex justify-between items-center">
			<Image src="/logo.svg" alt="Vercel Logo" width={131} height={64} priority />
			<div className="flex items-center gap-5">
				<Button variant="ghost" size="icon">
					<Sun />
				</Button>
				<Button className="flex gap-3">
					Log in
					<Image src="/icons/github.svg" alt="Vercel Logo" width={22} height={22} priority />
				</Button>
			</div>
		</nav>
	)
}
