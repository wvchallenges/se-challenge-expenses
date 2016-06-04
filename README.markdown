# Wave Software Development Challenge

## Building
Building requires [Rust](https://www.rust-lang.org) and optionally [Docker](https://www.docker.io).

* `cargo build` will pull down dependencies and build the app.

* `cargo test` runs tests.

## Running
The `run.sh` script will take care of building and deploying. It deploys a postgres container bound to `5432` and the app container bound to `3000`.

> WARNING: the script will assume things about the docker environment and kill/remove containers named `se-challenge` or `postgres`.

> NOTE: the postgres container won't be persisted

If those defaults conflict or don't work, the app can be run directly and configured via two environment variables:

* `HTTP_LISTEN`: the address to bind to, `localhost:3000` by default.
* `POSTGRES_URI`: the postgres connection string, `postgresql://postgres@localhost` by default.

For example:
```
HTTP_LISTEN=0.0.0.0:8000 POSTGRES_URI=postgresql://user:pw@host:1234 cargo run
```

## Project Description
I tried to keep it minimal and lower the dependency count, but that's tricky when HTTP and DB drivers are needed. Since this would be an internal tool, I was able to keep the frontend relatively simple (and dictate that a decent browser must be used).

I probably spent too much time trying to make it look pretty, although I don't think I succeeded. CSS is still magic.

On the backend side, there wasn't much room for anything fancy. Given the MVP-sounding requirements I don't feel comfortable doing anything more involved that would just have to be redone once more use cases materialize. This also means it's hard to find good abstractions to use in the code, which is a bit all over the place after a few mini refactors.
