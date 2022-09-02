# CalTrack

This is a web app that enables the user to track the food, calories and time it was consumed. 
It also has an admin view that provides CRUD on all entries and reporting. 
Users can invite their friends using a invitw widget. This is done as part of a take home assessment.


## Authors

- [@prabhusuriya](https://github.com/prabhusuriya)


## Features

- Add Food, calories, time when it was consumed
- Integration with nutritionix API to auto fill food information
- Login using email/pass
- Admin view to manage all entries
- Reporting view for Admin
- Invite a friend via email
- SendGrid Integration for emails


## Run Locally

Clone the project.

```bash
  git Clone https://git.toptal.com/screening/Prabhu-Suriya-Kumar.git
```
Repo has two projects 

UI: cal-track

API: cal-track-API

Run the below commands.

folder: cal-track
```bash
  npm i
  npm run start
```

folder: cal-track-api
```bash
  npm i
  npm run start:dev
```

API should be available in http://localhost:3000

UI should be available in http://localhost:4200


## Tech Stack

**Client:** Typescript, Angular, PrimeNG, PrimeFlex

**Server:** Sqlite, nodejs, nestjs, prisma, jwt

## Demo

https://www.loom.com/share/a92c6f6a28eb43e3b62b42e837ee3bd4
