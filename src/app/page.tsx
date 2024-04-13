import { Icons } from "@/components/icons"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<Layout>
			<div className="m-32 text-center flex flex-col items-center gap-3">
				<h1 className="font-extrabold text-7xl">
					Next-Level <br />{" "}
					<span className="bg-gradient-to-r from-[#FF0000] from-15% to-[#FF8A00] text-transparent bg-clip-text">
						Excalidraw
					</span>{" "}
					experience
				</h1>
				<p className="text-cGray text-xl font-extralight w-4/5">
					Unlock your creativity with our advanced Excalidraw tool. Save, manage, and share multiple
					boards effortlessly.
				</p>
				<Button
					size="lg"
					variant="outline"
					className="mt-7 flex gap-3 text-base dark:bg-[#222] dark:hover:bg-[#1a1a1a] border-[#4E4E4E]"
				>
					<Icons.gitHub className="h-5 w-5" />
					Continue with GitHub
				</Button>
			</div>
		</Layout>
	)
}
