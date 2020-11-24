import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const webhook = await cko.webhooks.removeWebhook(
  "wh_ahun3lg7bf4e3lohbhni65335u"
);
