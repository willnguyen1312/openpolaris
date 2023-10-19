import { AccountConnectionProps, Link } from "@shopify/polaris";
import { PropItem, TailorList } from "./shared";

const accountConnectionPropsItem: PropItem<keyof AccountConnectionProps>[] = [
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
      <Link
        target="_blank"
        url="https://polaris.shopify.com/components/actions/account-connection"
      >
        Account connection
      </Link>

      <TailorList items={accountConnectionPropsItem} />
    </>
  );
};
