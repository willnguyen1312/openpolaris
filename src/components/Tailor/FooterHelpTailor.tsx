import { FooterHelpProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const footerHelpPropsItems: PropItem<keyof FooterHelpProps>[] = [
  {
    prop: "children",
    type: "Text",
  },
];

export const FooterHelpTailor = () => {
  return (
    <>
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/navigation/footer-help"
      >
        Footer help
      </Link>

      <TailorList items={footerHelpPropsItems} />
    </>
  );
};
