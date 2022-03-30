# Fetch Stack Builders Repos

A TypeScript pet project that retrieve important info from the [Stack Builders](https://github.com/stackbuilders) organization repositories by using the [GitHub API](https://docs.github.com/en/rest).

This project was made to practice the TypeScript syntax refactoring a [previous project](https://github.com/LuisCoralesM/fetchdata-sborg-ts).

## Features
- Scrape all repositories from the Stack Builders organization from the GitHub API.
  - For each repo, get its name, url, update date and stars.
- Get the repos data sorted by most recent updates (top 5).
- Get only the repos with more than 5 stars.
- Automated unit testing to check the fetched data, the sorting and filter functions work correctly.

## Package dependency
- [Axios](https://axios-http.com/docs/intro) →  HTTP client library

## How to run it?

Assuming you already have downloaded Node.JS and NPM: Clone or download the code and just run the following command on the directory:

`npm install`

_Wait for the package installation._

`npm run start`

_Wait for the execution of the code to get the fetched data as .json files._

### Use `tsc` to compile new changes in the code.
