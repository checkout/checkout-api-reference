import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const notification = await cko.events.retrieveEventNotification({
  eventId: "evt_c2qelfixai2u3es3ksovngkx3e",
  notificationId: "ntf_wqjkqpgjy33uxoywcej4fnw6qm",
});
