import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const webhook = await cko.webhooks.retrieveWebhook(
  "wh_tdt72zlbe7cudogxdgit6nwk6i"
);
