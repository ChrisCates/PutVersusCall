# PutVersusCall

### Put versus Call: A website to discuss options and their strike prices

![License](https://img.shields.io/badge/license-MIT-blue.svg)
[![Build Status](https://travis-ci.org/ChrisCates/PutVersusCall.svg?branch=master)](https://travis-ci.org/ChrisCates/PutVersusCall)
[![codecov](https://codecov.io/gh/ChrisCates/PutVersusCall/branch/master/graph/badge.svg)](https://codecov.io/gh/ChrisCates/PutVersusCall)
![Node Version](https://img.shields.io/badge/node-v10.16.0-blue.svg)
![NVM Version](https://img.shields.io/badge/nvm-v6.9.0-blue.svg)

Put versus Call uses the Tradier API to get option and strike prices. If you intend on deploying your own PvC head on over to Tradier.com for an API key that's completely free.

Currently this is an early release version of the web app. I have no intention of seriously marketing the product in it's current state. The web app's intention is to start conversation on how to make an effective website to discuss Options trading. If you do like the app and want something, feel free to open an issue directly on Github.

### Deploying the Angular Web App

Currently the WebApp is just hosted on Github pages. There is a `server.js` file if you want to serve it on a local server... In general, it's better to host this as a static website on a CDN (like GH Pages).

```bash
yarn
ng run WebApp:deploy
```

### Deploying the Web Api

Currently the WebApp just uses a simple Elastic Beanstalk autoscaling group. You should be able to deploy it with no problem by running:

```bash
eb init
eb deploy
```
