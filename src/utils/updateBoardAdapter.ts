import { ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types/types"

export const updateBoardAdapter = (
	data: ExcalidrawInitialDataState
): ExcalidrawInitialDataState => {
	return {
		...data,
		appState: {
			...data.appState,
			collaborators: undefined,
		},
	}
}
