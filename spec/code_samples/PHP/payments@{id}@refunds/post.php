<?php

$checkout = new CheckoutApi('your secret key');
$paymentID = 'pay_y3oqhf46pyzuxjbcn2giaqnb44';

// Full refund
$refund = new Refund($paymentID);

// Or partial refund
$refund = new Refund($paymentID);
$refund->reference = 'your reference';
$refund->amount = 100;

return $checkout->payments()->refund($refund);
