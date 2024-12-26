import { memo, useEffect, useRef } from "react";
import { IconButton, Image, Skeleton, useBoolean } from "@chakra-ui/react";
import { CrossIcon } from "~/icons/CrossIcon.tsx";

type ImageItemProps = {
    image: File;
    onRemove: () => void;
};

export const ImageItem = memo(
    ({ image, onRemove }: ImageItemProps) => {
        const [isLoading, setIsLoading] = useBoolean(true);
        const imageBase64 = useRef("");

        useEffect(() => {
            const loadImage = async () => {
                setIsLoading.on();
                try {
                    imageBase64.current = await getBase64(image);
                } catch {
                    onRemove();
                } finally {
                    setIsLoading.off();
                }
            };
            loadImage();
        }, [image.name]);

        return (
            <Skeleton
                pos="relative"
                isLoaded={!isLoading}
                borderRadius={4}
                _hover={{ button: { opacity: 1 } }}
            >
                <Image
                    boxSize={24}
                    objectFit="cover"
                    borderRadius={4}
                    src={imageBase64.current}
                />
                <IconButton
                    pos="absolute"
                    top={-2}
                    right={-2}
                    size="xs"
                    variant="solid"
                    colorScheme="red"
                    opacity={0}
                    borderRadius="full"
                    aria-label="Удалить изображение"
                    icon={<CrossIcon boxSize={5} />}
                    _focusVisible={{ opacity: 1, boxShadow: "outline" }}
                    onClick={onRemove}
                />
            </Skeleton>
        );
    },
    (prev, next) => prev.image.name === next.image.name
);

const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });