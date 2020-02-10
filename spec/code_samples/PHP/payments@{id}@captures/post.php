<?php

$checkout = new CheckoutApi('your secret key');
$paymentID = 'pay_y3oqhf46pyzuxjbcn2giaqnb44';

// Full capture
$capture = new Capture($paymentID);

// Or partial capture
$capture = new Capture($paymentID);
$capture->reference = 'your reference';
$capture->amount = 100;

return $checkout->payments()->capture($capture);
