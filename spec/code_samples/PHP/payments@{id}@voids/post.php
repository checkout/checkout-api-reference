<?php

$checkout = new CheckoutApi('your secret key');
$paymentID = 'pay_y3oqhf46pyzuxjbcn2giaqnb44';

return $checkout->payments()->void(new Voids($paymentID));
