# BackendApi for Budget Duck

# budget duck description

Description... Todo...

## Notes

- Positions Route is for now ignored and unused (not deleted, yet)
  - transformation to budget and expenses

## Tasks

### ToDo

- [ ] Validation and Schema for incoming requests, JSON Schema
  - [x] json schema for budget
  - [x] json schema for expenses
  - [x] validation of requests (post)
  - [ ] validation of request (put)

- [ ] add swagger to document endpoints
- 
- [x] create Budget Model
- 
- [ ] Authentication for User with their own Repository for Budget and Positions
- [ ] add schema for env -> fastify/env

- [ ] generate fake data -> user, budget, expenses (in builder)

- [ ] create error classes for application-error, database-error, user-error (better error handling)

- [ ] decouple dependency from prisma model
  - [ ] create domain directory with budget and expenses


Optional:
- [ ] logging of database actions -> queries, warning, errors

### Testing

- [ ] look up how to setup tests with prisma
- [ ] look up how to write essential unit tests with fastify
- [ ] look up how to write essential integration test with fastify


### Refactoring

- [x] remove positions route for the time being

### Infrastructure

- [x] setup github repo
- [ ] setup pre-commit hooks with husky
- [ ] add renovate bot to update dependencies
- [ ] setup ci/cd with build and testing

### Deployment

- [ ] find platform for node deployment
- [ ] secret management for environment variables


--------------------------------------------------

# User Stories

User:
Description of the user (TODO...)

## budget (user story)

- i want to know how much money i have in a month
- i want to add budget anytime (like presents, side-hustles etc.)
- i want to categorize my budget (job-earning, present)
- i want to add a cycle to my budget (is it a monthly income?)


## summary of each month

- i want to know how much money i have left after the positions are substracted
- i want to know how my earnings have changed in comparison to the last month
- i want to know the balance between my earnings and expanses - comparison
