## Running This

1. Install everything with `yarn`

1. Install global dependencies with
`yarn global add concurrently nodemon`

1. Run it all (client and server) with `yarn start`

Client is served at `localhost:3000`

Server is served at `localhost:5000`

#### How much time did you spend on it?
3 hours

#### How much time do you think you should have spent on it?
About the same. I already have pretty good knowledge of the libraries and technologies used here, and reused some code from existing projects. A brief catch-up on the Google Maps API, but it hasn't changed much.

If I spent more time I would:

1. filter the results on the backend by map bounds, and query for new stops when map moves.

1. make some nice tooltips with more details for each stop

1. don't hardcode api url

1. abstract the stop data reducer to be used for many different data sets, and/or set up a middleware for data retrieval instead.

1. Look into the value of 'Reduxifying' the map.

#### Have you learned something during that project?

1. I used async/await instead of Promise then/catch. It's so clean!

#### How would you improve this test?
I like it. I've done quite a few of the interview code tests, and I like that this is a little less specific. A candidate can show off their strengths, rather than get boxed into something. (This is mostly a criticism of another coding test I received I guess...)
