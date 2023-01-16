## Getting Started

First, get the API key from your verified account.

Login > Developer

It should look like something like this:
```bash
pri_U2FsdGVkX19doVqpqesB/p2SAkG56ulRiP4UPUJyajshKSJLAdjhfJHjhal
```

Copy it and paste it into your code and set it as a header for your requests:

```bash
const params = {
     method: method,
     url: `${String(<Api-Url>)}${endpoint}`,
     headers: { 
       "Content-Type": "application/json",
       ...({ Authorization: `Bearer: ${<YourApiKey>}` })
     },
};
```

You can now start testing the endpoints.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be now accessed on [http://docuratorapi.jpmadrigal.com](http://docuratorapi.jpmadrigal.com/).

## Test it out!

Make a GET request using the endpoint:

```bash
https://docuratorapi.jpmadrigal.com/api/hello
```

You should get this message:

```bash
Hello World
```

If you get this message, it means you are authorized to access the DoCurator endpoints.
