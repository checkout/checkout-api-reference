import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const webhook = await cko.webhooks.updateWebhook(
  "wh_ahun3lg7bf4e3lohbhni65335u",
  {
    url: "https://example.com/webhooks/updated",
    active: true,
    headers: {
      authorization: "1234",
    },
    content_type: "json",
    event_types: ["payment_approved", "payment_captured"],
  }
);
