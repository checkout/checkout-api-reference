import checkout_sdk as sdk

api = sdk.get_api(secret_key='<your secret key>')

try:
    actions = api.payments.get_actions('pay_...')
    for action in actions:
        print(action.id)
        print(action.type)
        print(action.response_code)
        print(action.reference)
except sdk.errors.CheckoutSdkError as e:
    print('{0.http_status} {0.error_type} {0.elapsed} {0.request_id}'.format(e))
