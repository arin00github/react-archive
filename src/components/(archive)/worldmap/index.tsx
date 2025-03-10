"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import CountryPopup from "./CountryPopup";
import { updateSelectedCountry } from "@/redux/country/countrySlice";

const WorldMapContainer = () => {
  const dispatch = useAppDispatch();
  const selectedCountry = useAppSelector((state) => state.country);
  console.log("selected", selectedCountry.selectedCountryIos);

  return (
    <div>
      {selectedCountry.selectedCountryIos && (
        <CountryPopup
          selectedCountryIos={selectedCountry.selectedCountryIos}
          handleClose={() => dispatch(updateSelectedCountry(undefined))}
        />
      )}
    </div>
  );
};

export default WorldMapContainer;
