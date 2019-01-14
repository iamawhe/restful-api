# restful-api

A simple restful api service developed with nodejs, and also handling every promises with the new asycn/await.

It represents a user and a car relationship, where a user serves as the seller of a type of car

# access point

-- USER

1. GET: /users - provides list of all user
2. GET: /user/:userid - provides the info of a single user
3. GET: /user/:userid/cars - provides the info of a single user's list of cars
4. POST: /users - creates a new user
5. PUT: /users/:userid - updates a user with complete fields required + userid
6. PATCH: /users/:userid - updates a user with optional fields
7. DELETE /users/:userid - delete a user with specified userid

-- Car

1. GET: /cars - provides list of all cars
2. GET: /cars/:cars - provides the info of a single car
3. POST: /cars - creates a new user with userId in body
4. PUT: /cars/:carid - updates a car with complete fields required + carid
5. PATCH: /cars/:carid - updates a car with optional fields
6. DELETE /cars/:carrid - delete a car with specified carid
