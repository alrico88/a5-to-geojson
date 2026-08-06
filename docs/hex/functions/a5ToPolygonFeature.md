[**a5-to-geojson**](../../README.md)

***

[a5-to-geojson](../../README.md) / [hex](../README.md) / a5ToPolygonFeature

# Function: a5ToPolygonFeature()

> **a5ToPolygonFeature**(`cell`, `properties?`): `Feature`\<`Polygon`\>

Defined in: [hex.ts:97](https://github.com/alrico88/a5-to-geojson/blob/master/src/hex.ts#L97)

Converts an A5 cell to a GeoJSON Polygon feature.

## Parameters

### cell

`string`

The A5 cell to convert, in hex form.

### properties?

`GeoJsonProperties` = `{}`

Optional properties to include in the feature.

## Returns

`Feature`\<`Polygon`\>

A GeoJSON Polygon feature representing the A5 cell boundary.
