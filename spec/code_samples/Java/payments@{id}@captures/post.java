CheckoutApi api = CheckoutApiImpl.create("your secret key", false, "your public key");
String paymentId = "pay_y3oqhf46pyzuxjbcn2giaqnb44";

// Full capture
api.paymentsClient().captureAsync(paymentId).get();

// Or partial capture
CaptureRequest captureRequest = CaptureRequest.builder()
    .reference("your reference")
    .amount(100)
    .build();

api.paymentsClient().captureAsync(paymentId, captureRequest).get();
