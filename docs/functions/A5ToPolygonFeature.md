[**a5-to-geojson**](../README.md)

***

[a5-to-geojson](../README.md) / A5ToPolygonFeature

# Function: A5ToPolygonFeature()

> **A5ToPolygonFeature**(`cell`, `properties?`): `Feature`\<`Polygon`\>

Defined in: index.ts:68

Converts an A5 cell to a GeoJSON Polygon feature.

## Parameters

### cell

`bigint`

The A5 cell to convert.

### properties?

`GeoJsonProperties` = `{}`

Optional properties to include in the feature.

## Returns

`Feature`\<`Polygon`\>

A GeoJSON Polygon feature representing the A5 cell boundary.
