<?php

$checkout = new CheckoutApi('your secret key');
$threeDsSessionId = 'sid_y3oqhf46pyzuxjbcn2giaqnb44';

try {

	$details = $checkout->payments()->details($threeDsSessionId);
	return $details->getSourceId();

} catch(CheckoutHttpException $ex) {
	return $ex->getErrors();
}
