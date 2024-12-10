# BackendApi for Budget Duck

# budget duck documentation

## Documentation
[Budget Duck Documentation and Blog Repository](https://github.com/moon-penguin/documentation)



### ToDos

- [ ] update repositories
  - budget and expense are tied to a specific user
  - repository should import database instance (empty constructor)
  - 


- [ ] controller should return dtos
  - [x] budget controller returns dtos
  - [ ] expense controller returns dtos

- [ ] Authentication + Authorization for Users
  - [ ] add user model with password
  - [ ] hash and salt passwords and save it in database
  - [ ] rate limiting by failed logins + temporarily lockout
  - [ ] role-based authorization (admin, user)
  - [ ] specify which routes can be accessed (auth-plugin)


- [ ] create error classes for application-error, database-error, user-error (better error handling)
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
