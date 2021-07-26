# Coding challenge for Leocode

## Setup

`yarn`

## Endpoints (call in order)
1. `http://localhost:3000/api [GET]`
2. `http://localhost:3000/api/sign-in [POST]`
3. `http://localhost:3000/api/generate-key-pair [POST]`
4. `http://localhost:3000/api/encrypt [POST]`

## Test

`yarn test:e2e`

Persistence is achieved using a simple object hardcoded in `db.ts` file and cached using `memory-cache`.
First call you need to make is: `GET http://localhost:3000/`. This will put the users object in cache and will have to be called everytime the server starts.
After generating pair of keys, cache will be updated with user keys.

## Users

1. `one@yo.com : password1`
2. `two@yo.com : password2`

## Auth Token

Header: `x-auth-token` JWT
