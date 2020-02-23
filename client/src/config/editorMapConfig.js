export const editorMapConfig = {
  sources: ['cls-source', 'ixps-source', 'cables-source', 'facilities-source'],
  layers: [
    {
      id: 'cables-layer',
      source: 'cables-source',
      // 'source-layer': 'cables-layer',
      type: 'line',
      paint: {
        'line-width': 1.5,
        'line-color': '#7288b0'
      }
    },
    {
      id: 'cls-layer',
      type: 'circle',
      source: 'cls-source',
      // 'source-layer': 'cls-layer',
      paint: {
        'circle-radius': 4,
        'circle-color': '#f78682',
        'circle-stroke-width': 1,
        'circle-stroke-color': '#333333'
      }
    },
    {
      id: 'ixps-layer',
      type: 'circle',
      source: 'ixps-source',
      minzoom: 12,
      layout: {},
      paint: {
        'circle-color': '#666666',
        'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 1.75, 5, 6],
        'circle-stroke-color': '#ffffff'
      }
    },
    {
      id: 'facilities-layer',
      type: 'fill-extrusion',
      source: 'facilities-source',
      minzoom: 14,
      layout: {},
      paint: {
        'fill-extrusion-color': '#666666',
        'fill-extrusion-height': ['/', ['get', 'height'], 1.25]
      }
    }
  ]
}
