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
import "ol/ol.css";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateSelectedCountry } from "@/redux/country/countrySlice";
import styled from "styled-components";
import media from "@/styles/media";

const geojson_url = process.env.NEXT_PUBLIC_GEOJSON_WORLD_MAP;

export const MapBox = () => {
  const dispatch = useAppDispatch();
  const selectedCountry = useAppSelector(
    (state) => state.country.selectedCountryIos
  );
  const [mapObject, setMapObject] = useState<Map | null>(null);

  const handleFeatureclick = useCallback(() => {
    mapObject?.on("click", (event) => {
      const features = event.map.getFeaturesAtPixel(event.pixel);
      if (features.length <= 1 && features.length > 0) {
        features.forEach((feature) => {
          const properties = feature.getProperties();
          dispatch(updateSelectedCountry(properties.iso_a2));
          console.log("iso_a2", properties.iso_a2);
        });
      } else if (features.length > 1) {
        console.log("popup list display");
      } else {
        dispatch(updateSelectedCountry(undefined));
        // dispatch(putSelectedCountry(null));
      }
      // setSelectedFeature(features);
    });
  }, [mapObject, dispatch]);

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

  useEffect(() => {
    if (selectedCountry === undefined) {
      featureClick.getFeatures().clear();
    }
  }, [selectedCountry, featureClick]);

  return <StyledMapDiv id="world-map"></StyledMapDiv>;
};

const StyledMapDiv = styled.div`
  top: 0;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  ${media.large`
    top: 60px;
  `}
`;
