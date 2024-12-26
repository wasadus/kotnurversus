import {
  Grid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Dropzone } from "~/components/Dropzone";
import { Window, WindowProps } from "~/components/Window";
import { useCustomToast } from "~/hooks/useCustomToast";
import { ImageItem } from "~/pages/RoundPage/RoundArtifacts/AddImagesWindow/ImageItem.tsx";

const MAX_IMAGES = 10;

type Props = {
  onSubmit: (images: File[]) => Promise<void>;
};

export const AddImagesWindow = ({ onSubmit, ...props }: WindowProps<Props>) => {
  const toast = useCustomToast();
  const [chosenImages, setChosenImages] = useState<File[]>([]);

  const handleAddImages = async (newImages: File[]) => {
    const images = Object.values(
      Object.fromEntries(
        [...chosenImages, ...newImages].map((image) => [image.name, image])
      )
    );

    if (images.length > 10) {
      toast.warning({
        description: `За один раз можно прикрепить максимум ${MAX_IMAGES} изображений`,
      });
      return;
    }
    setChosenImages(images);
  };

  const handleRemove = (image: File) => () => {
    setChosenImages((images) => images.filter((i) => i.name !== image.name));
  };

  const handleSubmit = async () => {
    await onSubmit(chosenImages);
    setChosenImages([]);
  };

  return (
    <Window
      {...props}
      heading="Прикрепить материал"
      contentProps={{ w: "600px" }}
      submitProps={{
        isDisabled: chosenImages.length < 1,
        onClick: handleSubmit,
        children: "Сохранить",
      }}
    >
      <Stack spacing={4}>
        <Text fontSize="md">
          Прикрепите изображения в формате jpg, jpeg, png
        </Text>
        <Dropzone
          onDrop={handleAddImages}
          accept={{
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
            "image/png": [".png"],
          }}
        />
        {chosenImages.length > 0 && (
          <Grid
            gap={4}
            justifyContent="center"
            gridTemplateColumns="repeat(5, 96px)"
          >
            {chosenImages.map((image) => (
              <ImageItem
                key={image.name}
                image={image}
                onRemove={handleRemove(image)}
              />
            ))}
          </Grid>
        )}
      </Stack>
    </Window>
  );
};
