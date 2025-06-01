"use client";

import { ChildrenWrapper } from "@/interfaces/common";
import GlobalBody from "./GlobalBody";
import Navigation from "./Navigation";
import { useState } from "react";

const GlobalLayout = (props: ChildrenWrapper) => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <Navigation isOpen={isNavOpen} handleToggle={handleNavToggle} />
      <GlobalBody isOpen={isNavOpen}>{props.children}</GlobalBody>
    </>
  );
};

export default GlobalLayout;
