import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const file = await cko.files.upload({
  path: fs.createReadStream("./test/files/evidence.jpg"),
  purpose: "dispute_evidence",
});
