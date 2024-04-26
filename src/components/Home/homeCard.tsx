import { cn } from "@/lib/utils"
import Image from "next/image"

interface Props {
	title: string
	description: string
	imageUrl: string
	reverse?: boolean
	className?: string
}

export default function HomeCard({ title, description, imageUrl, reverse, className }: Props) {
	return (
		<div
			className={cn(
				"flex justify-between items-center gap-16 flex-row max-lg:flex-col max-lg:text-center",
				className,
				{
					"flex-row-reverse": reverse,
				}
			)}
		>
			<Image
				src={imageUrl}
				alt="Image of preview"
				width={550}
				height={500}
				className="w-auto h-auto drop-shadow-[0_0_30px_rgba(255,107,0,0.12)]"
				priority
			/>
			<div className="flex flex-col gap-14">
				<h3 className="text-5xl font-bold">{title}</h3>
				<p className="text-lg font-light text-cGray leading-9">{description}</p>
			</div>
		</div>
	)
}
