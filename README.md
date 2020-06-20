# aes-express-api
## Run
Once the repository is cloned, install the dependencies running `npm install` and then since the root run `node src/index.js` and you are going to be running
the app in the port `8080`
## API

| Method        | Endpoint           | Cool  |
| ------------- |-------------| -----|
| GET   | /encrypt/<param> | Receive a value through the URL |
| POST  | /decrypt/test      | Receive a JSON object and return the decrypted data |

## Examples

### Encrypt
`http://localhost:8080/encrypt/gabuardi`  

Return:
```JSON
{
    "iv": "e012e12dbb2f376b365abbb50a55d3e1",
    "encryptedData": "f5512f1cceaf321bd2259ed79e831acb"
}
```
---
### Decrypt
`http://localhost:8080/decrypt/test`  
with the body:
```JSON
{
    "iv": "e012e12dbb2f376b365abbb50a55d3e1",
    "encryptedData": "f5512f1cceaf321bd2259ed79e831acb"
}
```
Return:
```JSON
{
    "decryptedValue": "gabuardi"
}
```
