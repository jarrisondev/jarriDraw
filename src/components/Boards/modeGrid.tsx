import { AlignJustify, LayoutGrid } from "lucide-react"
import { Toggle } from "../ui/toggle"
import { ViewType } from "@/app/boards/page"
import { Dispatch, SetStateAction } from "react"

interface ModeGridProps {
	viewType: ViewType
	setViewType: Dispatch<SetStateAction<ViewType>>
}

export default function ModeGrid({ viewType, setViewType }: ModeGridProps) {
	return (
		<>
			<Toggle
				variant="outline"
				// className="bg-white"
				pressed={viewType === "grid"}
				onPressedChange={() => {
					setViewType("grid")
				}}
			>
				<LayoutGrid />
			</Toggle>
			<Toggle
				variant="outline"
				// className="bg-white"
				pressed={viewType === "list"}
				onPressedChange={() => {
					setViewType("list")
				}}
			>
				<AlignJustify size="28" />
			</Toggle>
		</>
	)
}
