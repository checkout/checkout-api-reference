CheckoutApi api = CheckoutApiImpl.create("your secret key", false, "your public key");
TokenSource tokenSource = new TokenSource("tok_ubfj2q76miwundwlk72vxt2i7q");
PaymentRequest<TokenSource> paymentRequest = PaymentRequest.fromSource(tokenSource, Currency.USD, 5600);
paymentRequest.setReference("ORD-090857");
paymentRequest.setCapture(false);
paymentRequest.setThreeDS(ThreeDSRequest.from(true));

try {
    PaymentResponse response = api.paymentsClient().requestAsync(paymentRequest).get();

    if (response.isPending() && response.getPending().requiresRedirect()) {
        return redirect(response.getPending().getRedirectLink().getHref());
    }

    if (response.getPayment().isApproved())
        return paymentSucessful(response.getPayment());

    return paymentDeclined(response.getPayment());
} catch (CheckoutValidationException e) {
    return validationError(e.getError());
} catch (CheckoutApiException e) {
    LOG.severe("Payment request failed with status code " + e.getHttpStatusCode());
    throw e;
}