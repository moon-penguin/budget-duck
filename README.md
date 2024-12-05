# BackendApi for Budget Duck

# budget duck documentation

## Documentation
[Budget Duck Documentation and Blog Repository](https://github.com/moon-penguin/documentation)



### ToDos

- [ ] Authentication + Authorization for Users
  - [ ] add user model with password
  - [ ] hash and salt passwords and save it in database
  - [ ] rate limiting by failed logins + temporarily lockout
  - [ ] role-based authorization (admin, user)
  - [ ] specify which routes can be accessed (auth-plugin)


- [ ] create error classes for application-error, database-error, user-error (better error handling)

- [ ] decouple dependency from prisma model
  - [ ] create domain directory with budget and expenses

- [ ] generate schema from types -> fastify typebox

- [ ] secure logging, hide sensitive data in req bodies and headers - redaction

### Testing

- [ ] evaluate if I need jest for testing node-server-side (?)
  - use tap
  - use native node runner + assertions

- [ ] look up how to set up tests with prisma
- [ ] look up how to write essential unit tests with fastify
- [ ] look up how to write essential integration test with fastify

### Infrastructure

- [ ] add renovate bot to update dependencies
- [ ] setup ci/cd with build and testing

### Deployment

- [ ] find platform for node deployment
- [ ] secret management for environment variables (Hashi Corp, Google Cloud Secret Manager, AWS)
