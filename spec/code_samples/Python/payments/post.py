import checkout_sdk as sdk

api = sdk.get_api(secret_key='<your secret key>')

try:
    payment = api.payments.request(
        source={
            'token': 'tok_...',
        },
        amount=100,
        currency=sdk.Currency.USD,
        reference='pay_ref'
    )
    print(payment.id)
except sdk.errors.CheckoutSdkError as e:
    print('{0.http_status} {0.error_type} {0.elapsed} {0.request_id}'.format(e))
