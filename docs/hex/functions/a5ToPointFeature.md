[**a5-to-geojson**](../../README.md)

***

[a5-to-geojson](../../README.md) / [hex](../README.md) / a5ToPointFeature

# Function: a5ToPointFeature()

> **a5ToPointFeature**(`cell`, `properties?`): `Feature`\<`Point`\>

Defined in: [hex.ts:75](https://github.com/alrico88/a5-to-geojson/blob/master/src/hex.ts#L75)

Converts an A5 cell to a GeoJSON Point feature.

## Parameters

### cell

`string`

The A5 cell to convert, in hex form.

### properties?

`GeoJsonProperties` = `{}`

Optional properties to include in the feature.

## Returns

`Feature`\<`Point`\>

A GeoJSON Point feature representing the A5 cell.
