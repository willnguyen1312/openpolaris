import { FooterHelpProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const footerHelpPropsItems: PropItem<keyof FooterHelpProps>[] = [
  {
    prop: "children",
    type: "Text",
  },
];

export const FooterHelpTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/navigation/footer-help"
      >
        Footer help
      </DocLink>

      <TailorList items={footerHelpPropsItems} />
    </>
  );
};
