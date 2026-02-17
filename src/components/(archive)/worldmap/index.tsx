"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import CountryPopup from "./CountryPopup";
import { updateSelectedCountry } from "@/redux/country/countrySlice";
import styled from "styled-components";
import { MapBox } from "./Mapbox";

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const WorldMapContainer = () => {
  const dispatch = useAppDispatch();
  const selectedCountry = useAppSelector((state) => state.country);

  return (
    <MapContainer>
      <MapBox />
      {selectedCountry.selectedCountryIos && (
        <CountryPopup
          selectedCountryIos={selectedCountry.selectedCountryIos}
          handleClose={() => dispatch(updateSelectedCountry(undefined))}
        />
      )}
    </MapContainer>
  );
};

export default WorldMapContainer;
