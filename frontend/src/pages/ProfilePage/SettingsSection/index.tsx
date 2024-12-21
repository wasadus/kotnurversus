import { BoxProps, Grid } from "@chakra-ui/react";
import { getUser } from "~/utils/auth";
import { LoginSettings } from "./LoginSettings";
import { PasswordSettings } from "./PasswordSettings";
import { SettingsLayout } from "./SettingsLayout";
import { LogoutButton } from "~/pages/ProfilePage/SettingsSection/LogoutButton.tsx";

export const SettingsSection = (props: BoxProps) => {
  const user = getUser();

  if (!user) return null;

  return (
    <Grid
      {...props}
      p={6}
      mx="auto"
      w="75%"
      gridRowGap={4}
      gridColumnGap={6}
      gridTemplateColumns="0.75fr 1.5fr 1fr"
      boxShadow="base"
      borderRadius={8}
      border="1px solid"
      borderColor="blackAlpha.500"
      _dark={{ borderColor: "whiteAlpha.500" }}
    >
      {/* TODO временно */}
      {/* <SettingsLayout
        name="Организатор"
        value="Billy Herrington"
        Form={NameSettings}
      /> */}
      <SettingsLayout name="Логин" value={user.email} Form={LoginSettings} />
      <SettingsLayout
        name="Пароль"
        value="**********"
        Form={PasswordSettings}
      />
      <LogoutButton gridColumn="3" justifySelf="flex-end" />
    </Grid>
  );
};
