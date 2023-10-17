import { AppProvider, Grid } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import { Header } from "./components/Header";
import { LeftSideBar } from "./components/LeftSideBar";
import { MainBody } from "./components/MainBody";
import { RightSideBar } from "./components/RightSideBar";

export default function AppSettingsLayoutExample() {
  return (
    <AppProvider i18n={enTranslations}>
      <Header />
      <Grid gap={{ lg: "0", xl: "0" }}>
        <Grid.Cell columnSpan={{ lg: 2, xl: 2 }}>
          <LeftSideBar />
        </Grid.Cell>

        <Grid.Cell columnSpan={{ lg: 8, xl: 8 }}>
          <MainBody />
        </Grid.Cell>

        <Grid.Cell columnSpan={{ lg: 2, xl: 2 }}>
          <RightSideBar />
        </Grid.Cell>
      </Grid>
    </AppProvider>
  );
}
