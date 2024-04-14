import { cn } from "@/lib/utils"
import Footer from "./footer"
import Header from "./header"

export default function Layout({
	children,
	className,
	headerSlot,
}: Readonly<{
	children: React.ReactNode
	className?: string
	headerSlot?: React.ReactNode
}>) {
	return (
		<main className="max-w-7xl mx-auto flex flex-col justify-between min-h-screen p-5">
			<Header slot={headerSlot} />
			<section className={cn("flex-1", className)}>{children}</section>
			<Footer />
		</main>
	)
}
