import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const evidence = await cko.disputes.provideEvidence(
  "dsp_bc94ebda8d275i461229",
  {
    proof_of_delivery_or_service_text: "http://checkout.com/document.pdf",
  }
);
