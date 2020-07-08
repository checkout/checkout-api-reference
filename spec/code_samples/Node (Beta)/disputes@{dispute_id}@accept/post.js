import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const accept = await cko.disputes.accept("dsp_bc94ebda8d275i461229");
