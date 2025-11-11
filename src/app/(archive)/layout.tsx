import { MapBox } from "@/components/(archive)/worldmap/Mapbox";
//import MobileWorldAside from "@/components/_common/MobileWorldAside";
//import WorldAside from "@/components/_common/WorldAside";
import { ChildrenWrapper } from "@/interfaces/common";

const ArchiveLayout = (props: ChildrenWrapper) => {
  return (
    <div>
      <MapBox />
      <div>{props.children}</div>
    </div>
  );
};

export default ArchiveLayout;
