import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const submitEvidence = await cko.disputes.submit("dsp_bc94ebda8d275i461229");
