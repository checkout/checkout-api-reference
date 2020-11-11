<?php

$checkout = new CheckoutApi('your secret key');

$method = new TokenSource('tok_ubfj2q76miwundwlk72vxt2i7q');
$payment = new Payment($method, 'USD');

$customer = new Customer();
$customer->email = 'john.smith@email.com';
$customer->name = 'John Smith';

$address = new Address();
$address->address_line1 = '14-17 Wells Mews';
$address->address_line2 = 'Fitzrovia';
$address->city = 'London';
$address->state = 'London';
$address->zip = 'W1T 3HF';
$address->country = 'UK';

$phone = new Phone();
$phone->country_code = '0044';
$phone->number = '02073233888';

$payment->shipping = new Shipping($address, $phone);
$payment->billing_descriptor = new BillingDescriptor("Dynamic desc charge", "City charge");
$payment->amount = 5600;
$payment->capture = false;
$payment->reference = 'ORD-090857';
$payment->threeDs = new ThreeDs(true);
$payment->risk = new Risk(true);
$payment->setIdempotencyKey(createMyUniqueKeyForThis());

try {
    $details = $checkout->payments()->request($payment);

    $redirection = $details->getRedirection();
    if ($redirection) {
        return $redirection;
    }

    return $details;
} catch (CheckoutModelException $ex) {
    return $ex->getErrors();
} catch (CheckoutHttpException $ex) {
    return $ex->getErrors();
}
