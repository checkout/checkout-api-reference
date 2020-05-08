import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

try {
  const reconciliation = await cko.reconciliation.getPaymentsCsv({
    from: "2019-05-17T16:48:52Z",
    to: "2019-05-20T16:48:52Z",
  });
  // this API call returns a Buffer("reconciliation" will be a buffer)
} catch (err) {
  console.log(err.name);
}
