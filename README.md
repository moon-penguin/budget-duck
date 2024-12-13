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
- [ ] secure logging, hide sensitive data in req bodies and headers - redaction

### Testing

- [ ] config testcontainer for api integrationtests
  - [x] install tap as testing framework
  - [x] install testcontainer with postgres
  - [ ] create server config to accept testcontainer as database

### Infrastructure

- [ ] add renovate bot to update dependencies
- [ ] setup ci/cd with build and testing

### Deployment

- [ ] find platform for node deployment
- [ ] secret management for environment variables (Hashi Corp, Google Cloud Secret Manager, AWS)
