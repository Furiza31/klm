# .env

## Generate a secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Environment variables

```
PORT=3000
JWT_SECRET=THE GENERATED SECRET
JWT_EXPIRATION=1d
DATABASE_URL="file:./dev.db"
SALT_ROUNDS=YOURSALTROUNDS
```
