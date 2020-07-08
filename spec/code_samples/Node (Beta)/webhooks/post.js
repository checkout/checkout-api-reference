import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const webhook = await cko.webhooks.registerWebhook({
  url: "https://example.com/webhook",
  active: true,
  headers: {
    authorization: "1234",
  },
  content_type: "json",
  event_types: ["payment_approved", "payment_captured"],
});
