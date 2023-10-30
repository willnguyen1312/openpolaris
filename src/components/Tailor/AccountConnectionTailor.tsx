import { AccountConnectionProps } from "@shopify/polaris";
import { DocLink, PropItem, TailorList } from "./shared";

const accountConnectionPropsItems: PropItem<keyof AccountConnectionProps>[] = [
  {
    prop: "title",
    type: "Text",
  },
  {
    prop: "details",
    type: "Text",
  },
  {
    prop: "termsOfService",
    type: "Text",
  },
  {
    prop: "accountName",
    type: "Text",
  },
  {
    prop: "avatarUrl",
    type: "Text",
  },
  {
    prop: "connected",
    type: "Checkbox",
  },
  {
    prop: "action",
    type: "Complex",
  },
];

export const AccountConnectionTailor = () => {
  return (
    <>
      <DocLink
        target="_blank"
        url="https://polaris.shopify.com/components/actions/account-connection"
      >
        Account connection
      </DocLink>

      <TailorList items={accountConnectionPropsItems} />
    </>
  );
};
