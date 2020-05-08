import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

try {
  const reconciliation = await cko.reconciliation.getPayment(
    "pay_nezg6bx2k22utmk4xm5s2ughxi"
  );
} catch (err) {
  console.log(err.name);
}
