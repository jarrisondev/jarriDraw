import { Heart, Sun, Twitter } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import Github from "./icons/github"

export default function Footer() {
	return (
		<footer className="flex flex-col justify-center items-center text-[#8D8D8D] font-light">
			<p className="flex gap-1 items-center">
				Made with
				<Heart color="red" fill="red" size="20" />
				in Medellín, Colombia
			</p>
			<a href="http://jarrison.dev" target="_blank" rel="noopener noreferrer" className="underline">
				Jarrison Cano
			</a>
			<span className="flex gap-2 mt-2">
				<a href="https://twitter.jarrison.dev/" target="_blank" rel="noopener noreferrer">
					<Twitter />
				</a>
				<a href="https://github.jarrison.dev/" target="_blank" rel="noopener noreferrer">
					<Github />
				</a>
			</span>
		</footer>
	)
}
