import { Checkout } from "checkout-node-sdk";

const cko = new Checkout("sk_XXXX");

try {
  const payment = await cko.sources.add({
    // infered type: "sepa"
    reference: "X-080957-N34",
    source_data: {
      first_name: "Sophie",
      last_name: "Bonneville",
      account_iban: "DE25100100101234567893",
      bic: "PBNKDEFFXXX",
      billing_descriptor: "Thanks for shopping",
      mandate_type: "recurring",
    },
    billing_address: {
      address_line1: "101 Avenue de Gaulle",
      city: "Paris",
      zip: "75013",
      country: "FR",
    },
    phone: {
      country_code: "+33",
      number: "6 78 91 01 11",
    },
    customer: {
      email: "sophie.bonneville@ckomail.com",
    },
  });
} catch (err) {
  console.log(err.name);
}
