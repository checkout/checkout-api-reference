import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const webhooks = await cko.webhooks.retrieveWebhooks();
