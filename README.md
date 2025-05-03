# API for Budget Duck

## Documentation
[Budget Duck Documentation and Blog Repository](https://github.com/moon-penguin/documentation)


### Installation

```shell
npm i
```

You should have docker installed and run

```shell
docker compose up
```

This will install the necessary postgres image and
run the container.

```shell
npm run start
```

Will start the API, which will be ready for incoming 
requests.

```shell
npm run db:ui
```

You can access prisma studio (db ui) at http://localhost:5555

### Environment

You should look into the .example.env file
and fill in your configuration to run the 
API.

### Documentation OpenAPISpecification

After starting the API, you can access the documentation
at http://localhost:3000/api/documentation

### Authentication

The API uses Json Web Token (JWT) for authentication.
All routes are protected and require a valid JWT.

In order to get a JWT, you can use the login route, if
you have a user, or you can register a new user.