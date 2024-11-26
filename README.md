# BackendApi for Budget Duck

# budget duck description

Idee/ User-Stories:
- nachempfunden, ähnlich wie ein Haushaltsbuch
- Übersicht über monatliche Ein- und Ausgaben
- ich möchte meine Ein- und Ausgaben kategorisieren können

- ich möchte die Trends von meinen Ein- und Ausgaben einsehen können (grafische Darstellung)
  - Darstellung von Trends soll dynamisch, selbst ausgesucht werden

- ich möchte das regelmäßige Ein- und Ausgaben automatisch für die kommenden Zyklen übernommen
  - Gehalt (monatlich) soll jeden Monat als Einnahme aufgeführt werden

- ich möchte eine Beschreibung von einer Ein- und Ausgabe haben
- ich möchte einen dritten Typen neben Ein- und Ausgaben haben -> Investment/ Sparvermögen

- ich möchte meine Ausgaben planen können
  - z. B. ich plane für August 400 Eur für meinen Urlaub ein (Plan-Ausgabe, Schätzung, Blocker)

- ich möchte in meinen Ein-und Ausgabenotizen vor und zurück blättern können
  - z. B. heute ist November 2024 und ich habe Urlaub Ausgabe für August 2025 eingetragen
  - ich möchte diese Ausgabe einsehen können, sobald sie eingetragen ist


Technische/Ideen:
- Documentation von Domäne, Beschreibung evtl. auf einer gesonderten Docu-Seite (eigenes Repo)
- Todo Liste für unser Projekt
- Kleine Beschreibung, wie man Front- und Backend bei sich selbst aufsetzen und zum Laufen bringen kann

Workflow:
- github
  - Pull-Request bei Änderungen stellen, wenn man im Repo von der anderen Person arbeitet

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
