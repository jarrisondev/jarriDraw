"use client"
import { useTheme } from "next-themes"
import Header from "@/components/Layout/header"
import { Button } from "@/components/ui/button"
import { routes } from "@/utils/routes"
import { useRouter } from "next/navigation"
import { Excalidraw } from "@/components/excalidraw"

export default function Boards({ params }: { params: { id: string } }) {
	const router = useRouter()
	const { resolvedTheme } = useTheme()

	const theme = resolvedTheme === "dark" ? "dark" : "light"
	return (
		<div className="flex flex-col h-screen">
			<div className="mx-4 my-1">
				<Header
					slot={
						<Button
							size="sm"
							variant="secondary"
							className="flex gap-3"
							onClick={() => {
								router.push(routes.boards)
							}}
						>
							Back to my boards
						</Button>
					}
				/>
			</div>
			<div className="w-full flex-1">
				<Excalidraw
					theme={theme}
					renderTopRightUI={() => {
						return (
							<>
								<Button disabled size="sm" className="flex gap-3" onClick={() => {}}>
									Share
								</Button>
							</>
						)
					}}
				/>
			</div>
		</div>
	)
}
