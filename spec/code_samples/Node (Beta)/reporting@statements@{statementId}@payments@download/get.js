import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

try {
  const statement = await cko.reconciliation.getStatementCsv("155613B100981");
  // this API call returns a Buffer("statement" will be a buffer)
} catch (err) {
  console.log(err.name);
}
