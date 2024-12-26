import { BoxProps, Center } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

type QrCodeProps = {
    size: number;
} & BoxProps;

export const QrCode = ({ size, ...props }: QrCodeProps) => {
    const location = useLocation();

    return (
        <Center p={2} bg="white" borderRadius={8} {...props}>
            <QRCodeSVG size={size} value={`${window.origin}${location.pathname}`} />
        </Center>
    );
};