CheckoutApi api = CheckoutApiImpl.create("your secret key", false, "your public key");
String paymentId = "pay_y3oqhf46pyzuxjbcn2giaqnb44";

// Full refund
api.paymentsClient().refundAsync(paymentId).get();

// Or partial refund
RefundRequest refundRequest = RefundRequest.builder()
    .reference("your reference")
    .amount(100)
    .build();

api.paymentsClient().refundAsync(paymentId, refundRequest).get();
