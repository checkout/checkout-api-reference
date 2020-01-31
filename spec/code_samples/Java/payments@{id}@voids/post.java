CheckoutApi api = CheckoutApiImpl.create("your secret key", false, "your public key");
String paymentId = "pay_y3oqhf46pyzuxjbcn2giaqnb44";

api.paymentsClient().voidAsync(paymentId).get();
