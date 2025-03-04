import { MapBox } from "@/components/(archive)/worldmap/Mapbox";
import WorldAside from "@/components/_common/WorldAside";
import { ChildrenWrapper } from "@/interfaces/common";

const ArchiveLayout = (props: ChildrenWrapper) => {
  return (
    <div>
      <MapBox />
      <WorldAside />
      <div>{props.children}</div>
    </div>
  );
};

export default ArchiveLayout;
