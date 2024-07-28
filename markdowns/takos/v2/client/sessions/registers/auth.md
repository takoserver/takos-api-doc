### Endpoint

```
POST /takos/v2/client/sessions/registers/auth
```

### Parameters

| name         | type   | description    | required |
| ------------ | ------ | -------------- | -------- |
| userName     | string | ユーザーネーム | true     |
| password     | string | パスワード     | true     |
| email        | string | email          | true     |
| recaptcha    | string | reCAPCHA token | true     |
| recapchakind | string | v2 or v3       | true     |

*1はいずれか一つは必須

### Response

```
headers: {
    "Content-Type": "application/json",
    "Set-Cookie": `sessionid=${sessionid}; Path=/; Max-Age=2592000;`,
},

body: {
    status: true
}
```

## descripton

ログインしていない場合、sessionidを発行します
