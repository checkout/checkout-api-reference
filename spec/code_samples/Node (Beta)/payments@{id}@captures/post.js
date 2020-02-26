import import { Checkout } from 'checkout-node-sdk';

const cko = new Checkout('sk_XXXX');

const payment = await cko.payments.capture('pay_je5hbbb4u3oe7k4u3lbwlu3zkq', {
    amount: 1000,
    reference: 'CAPTURE ORDER 1234',
    metadata: {
        value: 'my value'
    }
});