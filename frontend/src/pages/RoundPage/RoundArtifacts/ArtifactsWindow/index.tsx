import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Window, WindowProps } from "~/components/Window";
import { RoundArtifact } from "~/types/round";
import { ArtifactItem } from "~/pages/RoundPage/RoundArtifacts/ArtifactsWindow/ArtifactItem";

type Props = {
  defaultArtifactId?: string;
  artifacts: RoundArtifact[];
};

export const ArtifactsWindow = ({
  defaultArtifactId,
  artifacts,
  ...props
}: WindowProps<Props>) => {
  const defaultItem = artifacts.findIndex((a) => a.id === defaultArtifactId);

  return (
    <Window
      {...props}
      isHideCancel
      isHideSubmit
      contentProps={{ w: "100vw" }}
      bodyProps={{ p: 0 }}
    >
      <Carousel
        autoFocus
        useKeyboardArrows
        showThumbs={false}
        showStatus={false}
        selectedItem={defaultItem !== -1 ? defaultItem : 0}
      >
        {artifacts.map((artifact) => (
          <ArtifactItem key={artifact.id} artifact={artifact} />
        ))}
      </Carousel>
    </Window>
  );
};
