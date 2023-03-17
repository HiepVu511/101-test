# 101-test

The `Add new invoice` feature is not working right now because I'm having trouble with the `Create invoice API` return CORS error.

## Live Demo:
https://101-test-ei6cbglff-hiepvu511.vercel.app

## Login Info:
Please get this info from the assessment (username & password headers from 3.1 Fetch App access token).

## Test:
`npm run test:run`

I use Cypress in both component testing and e2e testing for this projects. You'll find those in `cypress` and `components` directory. Wish I have more time to write more test.

## Stack:
- Zod to validate form input and type-safe data returned from the API
- React-query to simplify data fetching logic.
- Mantine for component UI.
- React router for client routing. I also put filter and search state to URL query params with `useSearchParams` hook.
