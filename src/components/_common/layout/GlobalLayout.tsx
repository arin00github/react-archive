"use client";

import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ChildrenWrapper } from "@/interfaces/common";
import GlobalBody from "./GlobalBody";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

const GlobalLayout = (props: ChildrenWrapper) => {
  const matches = useMediaQuery("(max-width:600px)");

  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  console.log("match", matches);

  return (
    <>
      {matches ? (
        <MobileNavigation isOpen={isNavOpen} handleToggle={handleNavToggle} />
      ) : (
        <Navigation isOpen={isNavOpen} handleToggle={handleNavToggle} />
      )}
      <GlobalBody isOpen={isNavOpen} handleToggle={handleNavToggle}>
        {props.children}
      </GlobalBody>
    </>
  );
};

export default GlobalLayout;
