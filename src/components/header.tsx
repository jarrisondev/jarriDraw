import Image from "next/image"

export default function Header() {
	return (
		<nav>
			<Image src="/logo.svg" alt="Vercel Logo" width={121} height={54} priority />
			JarriDraw
			<p>Hello</p>
		</nav>
	)
}
