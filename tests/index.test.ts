import { describe, expect, test } from 'vitest';
import * as lib from '../src';
import type { Feature, Polygon } from 'geojson';
import { lonLatToCell } from 'a5-js';

test('Library is exported', () => {
  expect(lib).toBeDefined();
});

describe('A5 cell polygon ring closure', () => {
  const testCell = lonLatToCell([-3.694153, 40.410359], 8);

  test('a5ToPolygonFeature returns a closed ring', () => {
    const feature: Feature<Polygon> = lib.a5ToPolygonFeature(testCell);
    const coords = feature.geometry.coordinates[0];

    expect(coords[0]).toEqual(coords[coords.length - 1]); // El anillo debe estar cerrado
  });

  test('a5ToPolygonGeometry returns a closed ring', () => {
    const geometry: Polygon = lib.a5ToPolygonGeometry(testCell);
    const coords = geometry.coordinates[0];

    expect(coords[0]).toEqual(coords[coords.length - 1]); // El anillo debe estar cerrado
  });
});
