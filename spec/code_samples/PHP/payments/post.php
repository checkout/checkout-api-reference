<?php

$checkout = new CheckoutApi('your secret key');

$method = new TokenSource('tok_ubfj2q76miwundwlk72vxt2i7q');
$payment = new Payment($method, 'USD');

$payment->amount = 5600;
$payment->capture = false;
$payment->reference = 'ORD-090857';
$payment->threeDs = new ThreeDs(true);

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
