import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

const getFile = await cko.files.getFile("file_zna32sccqbwevd3ldmejtplbhu");
