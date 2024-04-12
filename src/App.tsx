import type { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types'

import { useState } from 'react'

import { Excalidraw, restoreAppState, restoreElements } from '@excalidraw/excalidraw'

export const App = () => {
	// const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null)

	// console.log(excalidrawAPI)

	return (
		<section>
			<h2>Hello</h2>
			<Excalidraw
				theme='light'
				initialData={null}
				onChange={(elements, state) => {
					console.info('Elements :', elements, 'State : ', state)
				}}
				name='Custom name of drawing'
			/>
		</section>
	)
}
