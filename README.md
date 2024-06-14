<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# EV Stations API

API for a "simple" EV stations search. The API is built with NestJS and uses a PostgreSQL database with PostGist extension to store the data. 
It has endpoints for CRUD operations on the stations/companies and a search endpoint that returns the stations within a given radius from a given point.
#### API documentation
The API documentation is available at the `/api` endpoint. The documentation is generated with Swagger.


### Future improvements
- Refine Typesense search engine configuration and implementation.
- Implement an event-driven architecture to handle the data synchronization between the API and the search engine. It's partially implemented.
### Known issues
- Response form the db search is not paginated
- Both the search and the db search endpoints don't follow the same response format
- Missing grouping of the stations by location in the search endpoint, I think it could be done in code for Typesense search, and return a transformed response to the client
- The search endpoint is not tested - I don't really know how to test the search endpoint
- Missing tests for various parts of the application
- Missing CI/CD pipeline

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker

This app can be run in a Docker container. Make sure Docker is installed on your machine.
```bash
# build the image
$ docker compose up --build
```
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
