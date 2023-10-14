import { AppProvider, Button, Card, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page title="Example app">
        <Card>
          <Button onClick={() => alert("Button clicked!")}>
            Example button
          </Button>
        </Card>
      </Page>
    </AppProvider>
  );
}
