  
curl --location --request POST 'https://access.checkout.com/connect/token'
  --header 'Content-Type: application/x-www-form-urlencoded'
  --header 'Authorization: Basic dGVzdC1hY2Nlc3Mta2V5LWlkOnRlc3QtYWNjZXNzLWtleS1zZWNyZXQ='
  --data-urlencode 'grant_type=client_credentials'
  --data-urlencode 'scope=gateway'