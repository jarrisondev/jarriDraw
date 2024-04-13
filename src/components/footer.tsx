import { Heart, Sun, Twitter } from "lucide-react"
import Image from "next/image"
import { Icons } from "./icons"

export default function Footer() {
	return (
		<footer className="flex flex-col justify-center items-center dark:text-[#8D8D8D] text-black font-light">
			<p className="flex gap-1 items-center">
				Made with
				<Heart color="red" fill="red" size="20" />
				in Medellín, Colombia
			</p>
			<a href="http://jarrison.dev" target="_blank" rel="noopener noreferrer" className="underline">
				Jarrison Cano
			</a>
			<span className="flex gap-2 mt-2 items-center">
				<a href="https://twitter.jarrison.dev/" target="_blank" rel="noopener noreferrer">
					<Icons.twitter className="h-5 w-5" />
				</a>
				<a href="https://github.jarrison.dev/" target="_blank" rel="noopener noreferrer">
					<Icons.gitHub className="h-5 w-5" />
				</a>
			</span>
		</footer>
	)
}
