import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useUpdateBoardName } from "@/queries/boards"

interface Props {
	id: string
	name: string
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function RenameBoardDialog({ id, name, open, onOpenChange }: Props) {
	const updateBoardName = useUpdateBoardName()
	const [value, setValue] = useState(name)

	const handleSave = () => {
		updateBoardName.mutateAsync({ name: value, id }).then(() => {
			onOpenChange(false)
		})
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Rename board</DialogTitle>
					<DialogDescription>Enter a new name for your board</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Name
						</Label>
						<Input
							defaultValue={name}
							value={value}
							onChange={(e) => {
								setValue(e.target.value)
							}}
						/>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<Button
						type="button"
						className="px-3 flex gap-2"
						disabled={value === "" || updateBoardName.isPending}
						onClick={handleSave}
					>
						<span>Save</span>
						<Save className="h-4 w-4" />
					</Button>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
