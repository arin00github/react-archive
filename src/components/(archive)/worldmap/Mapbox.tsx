"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

import { Map, View } from "ol";
import { click } from "ol/events/condition";
import GeoJSON from "ol/format/GeoJSON";
import { Select } from "ol/interaction";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

const geojson_url = process.env.NEXT_PUBLIC_GEOJSON_WORLD_MAP;

export const MapBox = () => {
  const [mapObject, setMapObject] = useState<Map | null>(null);

  const handleFeatureclick = useCallback(() => {
    mapObject?.on("click", (event) => {
      const features = event.map.getFeaturesAtPixel(event.pixel);
      if (features.length <= 1 && features.length > 0) {
        features.forEach((feature) => {
          // dispatch(putSelectedCountry({ name: feature.get("admin"), iso: feature.get("iso_a2") }));
          console.log("feature", feature.getProperties());
        });
      } else if (features.length > 1) {
        console.log("popup list display");
      } else {
        // dispatch(putSelectedCountry(null));
      }
      // setSelectedFeature(features);
    });
  }, [mapObject]);

  useEffect(() => {
    if (!geojson_url) return;
    const source = new VectorSource({
      format: new GeoJSON(),
      url: geojson_url,
    });
    const vectorLayerStyle = new Style({
      fill: new Fill({
        color: "#dddddd",
      }),
      stroke: new Stroke({
        color: "#fff",
      }),
    });

    const vector = new VectorLayer({
      source: source,
      background: "white",
      style: vectorLayerStyle,
    });

    const mapInstance = new Map({
      layers: [vector],
      target: "world-map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    setMapObject(mapInstance);

    return () => {
      mapInstance.setTarget(undefined);
    };
  }, [geojson_url]);

  const featureClick = useMemo(() => {
    const selected = new Style({
      fill: new Fill({
        color: "#0460ff",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 2,
      }),
    });
    return new Select({
      condition: click,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style: (feature: any) => {
        const color = feature.get("COLOR") || "#0460ff";
        const fill = selected.getFill();
        if (fill) {
          fill.setColor(color);
        }

        return selected;
      },
    });
  }, []);

  useEffect(() => {
    if (mapObject) {
      mapObject.addInteraction(featureClick);
      handleFeatureclick();
    }
  }, [mapObject, featureClick, handleFeatureclick]);

  return <div id="world-map" style={{ width: "100%", height: "100vh" }}></div>;
};
