import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const disputeDetails = await cko.disputes.getDetails(
  "dsp_bc94ebda8d275i461229"
);
