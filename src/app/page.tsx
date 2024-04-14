import HomeCard from "@/components/Home/homeCard"
import { Icons } from "@/components/icons"
import Layout from "@/components/Layout/layout"
import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<Layout>
			<div className="my-36">
				<div className="mb-44 text-center flex flex-col items-center gap-3">
					<h1 className="font-extrabold text-7xl">
						Next-Level <br />{" "}
						<span className="bg-gradient-to-r from-[#FF0000] from-15% to-[#FF8A00] text-transparent bg-clip-text">
							Excalidraw
						</span>{" "}
						experience
					</h1>
					<p className="text-cGray text-xl font-extralight w-4/5">
						Unlock your creativity with our advanced Excalidraw tool. Save, manage, and share
						multiple boards effortlessly.
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
				<section className="flex flex-col gap-44 mt-52">
					<HomeCard
						title="Limitless Drawing"
						description="Unlock limitless creativity with our powerful Excalidraw editor seamlessly integrated into your workflow. Create dynamic diagrams, sketches, and visual notes with ease."
						imageUrl="/images/home-1.jpg"
					/>
					<HomeCard
						title="Your Projects, One Click Away"
						description="View and manage all your boards and projects in a clear, structured manner. Stay on top of your work and enhance your productivity."
						imageUrl="/images/home-2.jpg"
						reverse
					/>
				</section>
			</div>
		</Layout>
	)
}
