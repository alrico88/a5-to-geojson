[**a5-to-geojson**](../../README.md)

***

[a5-to-geojson](../../README.md) / [index](../README.md) / lineStringToA5

# Function: lineStringToA5()

> **lineStringToA5**(`line`, `resolution`, `properties?`): `FeatureCollection`\<`Polygon`\>

Defined in: [index.ts:168](https://github.com/alrico88/a5-to-geojson/blob/master/src/index.ts#L168)

Converts a GeoJSON LineString to a FeatureCollection of the A5 cells
it passes through, rendered as polygons.

## Parameters

### line

`LineString` \| `Feature`\<`LineString`, `GeoJsonProperties`\>

The GeoJSON LineString feature or geometry to convert.

### resolution

`number`

The desired A5 resolution.

### properties?

`GeoJsonProperties` = `{}`

Optional properties to include in each feature.

## Returns

`FeatureCollection`\<`Polygon`\>

A GeoJSON FeatureCollection of Polygon features.
