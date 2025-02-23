# Capstone: Restaurant Reservation System

This is a full stack restaurant reservation management web application that allows the user to create/edit/delete reservations. The user can then create tables and assign capacity to them. User is able to seat reservations at tables and remove them when finished.
## Tech used

- Front-end: JavaScript, HTML, CSS, React, Bootstrap <br>

- Back-end: JavaScript, Node.js, Express, Knex <br>

- Database: PostgreSQL <br>

- Tools: Heroku, Git, GitHub, DBeaver <br>

## Deployments

- Frontend Deployment: https://nk-restaurant-client.herokuapp.com/dashboard

- Backend Deployment: https://nk-restaurant-backend.herokuapp.com/

## Features

### *1/ View existing reservations and tables on the Dashboard:*

![Screen Shot 2022-09-21 at 6 15 35 PM](https://user-images.githubusercontent.com/92671036/191620608-35d43289-4a16-4cf8-979c-57045418175d.png)
![Screen Shot 2022-09-21 at 6 18 55 PM](https://user-images.githubusercontent.com/92671036/191620612-ab1cef2f-6c7c-4407-bd51-abadea3a515c.png)

### *2/ Create new reservations:*
![Screen Shot 2022-09-21 at 6 22 36 PM](https://user-images.githubusercontent.com/92671036/191621056-23783eee-e0f8-4ecc-837a-91e9383a324c.png)

### *3/ Edit existing reservation:*
![Screen Shot 2022-09-21 at 6 30 39 PM](https://user-images.githubusercontent.com/92671036/191621872-f8b1ce3c-f6db-4a99-9d92-f756a454b0b9.png)

### *4/ Create new table:*
![Screen Shot 2022-09-21 at 6 25 36 PM](https://user-images.githubusercontent.com/92671036/191621261-8d019709-45dc-441d-8367-93b6fe366e30.png)

### *5/ Search a reservation by phone number:*
![Screen Shot 2022-09-21 at 6 27 11 PM](https://user-images.githubusercontent.com/92671036/191621611-d3518167-b333-441e-a7ce-bede274a6091.png)
![Screen Shot 2022-09-21 at 6 28 30 PM](https://user-images.githubusercontent.com/92671036/191621613-481224cc-8dcc-4d86-b65d-5e9ab34a4778.png)

### *6/ Seat reservation at free table (only tables not occupied available to select):*
![Screen Shot 2022-09-21 at 6 33 03 PM](https://user-images.githubusercontent.com/92671036/191622091-b46717c1-82a2-41a4-aea2-54e38022beb2.png)

## API Endpoints:

| Method | Path                                     | Function                                                                |
|--------|------------------------------------------|-------------------------------------------------------------------------|
| GET    | /reservations                            | list reservations for current date                                      |
| POST   | /reservations                            | create new reservation                                                  |
| GET    | /reservations/:reservation_id            | list reservation by id                                                  |
| PUT    | /reservations/:reservation_id            | update reservation                                                      |
| GET    | /reservations?mobile_number=xxx-xxx-xxxx | list reservations for specified mobile number                           |
| GET    | /reservations?date=YYYY-MM-DD            | list reservation for specified date                                     |
| PUT    | /reservations/:reservation_id/status     | update reservation status                                               |
| GET    | /tables                                  | list all tables                                                         |
| POST   | /tables                                  | create new table                                                        |
| PUT    | /tables/:table_id/seat                   | update table with reservation_id from body, update reservation status   |
| DELETE | /tables/:table_id/seat                   | remove reservation_id from table, update reservation status to finished |


## Installation 

1. Fork and clone this repository.
2. Create and update ```./back-end/.env``` file with the connection URL's to your database instance.
3. You should not need to make changes to the ./front-end/.env file unless you want to connect to a backend at a location other than http://localhost:5001.
4. Run ```npm install``` to install project dependencies.
5. Run ```npm run start:dev``` to start your server in development mode.

