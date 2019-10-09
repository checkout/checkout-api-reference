var api = CheckoutApi.Create("your secret key");
var tokenSource = new TokenSource("tok_ubfj2q76miwundwlk72vxt2i7q");
var sessionRequest = new Session<TokenSource>(tokenSource, Currency.USD, 5600)
{
    Reference = "ORD-090857"
};

try
{
    var response = await api.Sessions.RequestAsync(sessionRequest);

    if (response.IsPending && response.Pending.RequiresRedirect())
    {
        return Redirect(response.Pending.GetRedirectLink().Href);
    }

    if (response.Session.Approved)
        return SessionSucessful(response.Session);

    return SessionDeclined(response.Session);
}
catch (CheckoutValidationException validationEx)
{
    return ValidationError(validationEx.Error);
}
catch (CheckoutApiException apiEx)
{
    Log.Error("Session request failed with status code {HttpStatusCode}", apiEx.HttpStatusCode);
    throw;
}