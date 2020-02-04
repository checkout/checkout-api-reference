CheckoutApi api = CheckoutApiImpl.create("your secret key", false, "your public key");
String sessionId = "sid_y3oqhf46pyzuxjbcn2giaqnb44";
GetPaymentResponse payment = api.paymentsClient().getAsync(sessionId).get();

if (payment.isApproved()) {
    String cardSourceId = ((CardSourceResponse)payment.getSource()).getId();
}