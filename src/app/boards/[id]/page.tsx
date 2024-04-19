"use client"
import { useTheme } from "next-themes"
import Header from "@/components/Layout/header"
import { Excalidraw } from "@/components/excalidraw"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { routes } from "@/utils/routes"

export default function Boards({ params }: { params: { id: string } }) {
	const { resolvedTheme } = useTheme()

	const theme = resolvedTheme === "dark" ? "dark" : "light"
	return (
		<div className="flex flex-col h-screen">
			<div className="mx-4 my-2">
				<Header
					slot={
						<Link href={routes.boards}>
							<Button size="sm" variant="secondary" className="flex gap-3">
								Back to my boards
							</Button>
						</Link>
					}
				/>
			</div>
			<div className="w-full flex-1">
				<Excalidraw theme={theme} />
			</div>
		</div>
	)
}
