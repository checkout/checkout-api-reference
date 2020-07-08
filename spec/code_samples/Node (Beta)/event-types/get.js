import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const events = await cko.events.retrieveEventTypes();
