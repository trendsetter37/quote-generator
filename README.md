# Tesla Random Quote Generator
This project serves as backend Restful API to a Codepen random quote generator or other clients with sufficient permissions.

### Getting Started
---
This API uses [JWT](jwt.io) tokens for authentication. To access any of the endpoints you will need to obtain an authentication token by sending a POST request to `/api/authenticate` with a JSON payload that contains your username and password.

e.g.
```
{ "user": "username", "pass": "password" }
```

The server will respond with JSON data containing a token and msg if authentication was successful.

```
{
  "token": "your uber special jwt",
  "msg": "Successful auth"
}
```

If not, you may receive one of the following JSON responses.

```
{ "msg": "Incorrect password."}
```

```
{ "msg": "User: {specified user} not found." }
```

---
### API Endpoints

API Documentation for these endpoints can be found [here](https://quote-generator-apidocs.surge.sh).

Route | Verb | Description
--- | :---: | :---
/api/authenticate | POST | Authenticate with user and password
/api/tesla/quotes | GET | Get all the quotes
/api/tesla/quotes | POST | Create a quote
/api/tesla/quotes/:quote_id | GET | Get a single quote
/api/tesla/quotes/:quote_id  |	PUT | Update quote with new info
/api/tesla/quotes/:quote_id | DELETE |	Delete quote
/api/tesla/quotes/random | GET	| Get random quote from db

---
[Link][codepen] to working example.

### Notes
---
Tokens are only valid for **5 minutes** at a time. Ensure that your client will re-authenticate upon receipt of a `not authenticated` error message to maintain a seamless stream of quotes.

[codepen]: http://codepen.io/trendsetter37/full/ZbBeGW
