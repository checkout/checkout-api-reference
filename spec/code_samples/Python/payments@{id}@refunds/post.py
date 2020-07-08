import checkout_sdk as sdk

api = sdk.get_api(secret_key='<your secret key>')

try:
    action = api.payments.refund('pay_...', amount=100, reference='REFUND')

    print(action.id)
    print(action.get_link('payment').href)
except sdk.errors.CheckoutSdkError as e:
    print('{0.http_status} {0.error_type} {0.elapsed} {0.request_id}'.format(e))
