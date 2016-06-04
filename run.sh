#!/bin/bash

function build() {
    cargo build
    docker build -t se-challenge .
}

function run() {
    docker run --name postgres -d -p 5432:5432 postgres:9.2
    sleep 5
    docker run --name se-challenge --env "RUST_BACKTRACE=1" -t --net host se-challenge
}

function cleanup() {
    docker kill se-challenge
    docker kill postgres
    docker rm postgres
    docker rm se-challenge
}

trap cleanup EXIT
cleanup
build
run

