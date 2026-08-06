[**a5-to-geojson**](../../README.md)

***

[a5-to-geojson](../../README.md) / [index](../README.md) / polygonToA5

# Function: polygonToA5()

> **polygonToA5**(`polygon`, `resolution`, `properties?`): `FeatureCollection`\<`Polygon`\>

Defined in: [index.ts:145](https://github.com/alrico88/a5-to-geojson/blob/master/src/index.ts#L145)

Converts a GeoJSON Polygon to a FeatureCollection of the A5 cells
whose centers fall inside it, rendered as polygons.

## Parameters

### polygon

`Polygon` \| `Feature`\<`Polygon`, `GeoJsonProperties`\>

The GeoJSON Polygon feature or geometry to convert.

### resolution

`number`

The desired A5 resolution.

### properties?

`GeoJsonProperties` = `{}`

Optional properties to include in each feature.

## Returns

`FeatureCollection`\<`Polygon`\>

A GeoJSON FeatureCollection of Polygon features.
