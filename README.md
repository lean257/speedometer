# PokeDOM

[![Build Status](https://travis-ci.org/pastuxso/pokedom.svg?branch=master)](https://travis-ci.org/pastuxso/pokedom)

Simple application to monitoring websites only for educational purpose.

## Features

- Manage multiple domains and paths.
- Support for GET/POST/DELETE/PATCH.
- Notifications via Email, Telegram and Slack.
- Realtime dashboard.
- Metrics powered by InfluxDB.
- Only request, no rendering content.

## Setup

### Requirements

  - InfluxDB
  - PostgreSql
  - Redis

### Development

  - Copy sample of environment variables `cp .env.sample .env`
  - create your PostgreSql database `createdb pokedom_dev`
  - create your InfluxDB database
    ```
    $ influx
    Connected to http://localhost:8086 version 1.0.x
    InfluxDB shell 1.0.x
    > CREATE DATABASE pokedom
    >
    ```
  - Running client server `npm start`
  - Running api server `npm run api`
  - Running tests `npm tests`
  - Running eslint `npm run lint`
  - Running tests watching file changes `npm run watch-test`
