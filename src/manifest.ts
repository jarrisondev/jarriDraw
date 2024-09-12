import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "JarriDraw - Next level Excalidraw experience",
		short_name: "JarriDraw",
		description:
			"Unlock your creativity with our advanced Excalidraw tool. Save, manage, and share multiple boards effortlessly.",
		start_url: "/",
		display: "standalone",
		background_color: "#09090B",
		theme_color: "#000000",
		icons: [
			{
				src: "/logo.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	}
}
