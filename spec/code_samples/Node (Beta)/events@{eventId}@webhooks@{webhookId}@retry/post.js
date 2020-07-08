import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const retry = await cko.events.retry({
  eventId: "evt_c2qelfixai2u3es3ksovngkx3e",
  webhookId: "wh_mpkyioafmajulnhjvwmrklenb4",
});
