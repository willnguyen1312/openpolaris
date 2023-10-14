import { AppProvider, Box, Button } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Box
        padding={{
          xs: "200",
        }}
      >
        <Button
          variant="primary"
          tone="success"
          onClick={() => alert("Button clicked!")}
        >
          Example button
        </Button>
      </Box>
    </AppProvider>
  );
}
