import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const payment = await cko.payments.refund("pay_je5hbbb4u3oe7k4u3lbwlu3zkq", {
  amount: 1000,
  reference: "REFUND ORDER 1234",
  metadata: {
    value: "my value"
  }
});
