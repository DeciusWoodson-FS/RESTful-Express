<h1 align="center">Welcome to my RESTful API Assignment for ASL!</h1>

---

### Technologies

![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)
![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff)

---

### Description 

This project focuses on building a fully RESTful API using Node.js and Express. The primary goal was to construct a robust "Contacts" endpoint capable of handling standard CRUD operations (Create, Read, Update, Delete).

In addition to basic routing, I implemented advanced features such as Filtering, Sorting, and Pagination. The project is containerized using Docker Compose, which pulls the Node image directly without needing a custom Dockerfile, and utilizes Jest for automated testing to ensure strict API compliance.

---

### How to run 
## Prerequisites 
Make sure you have Docker Desktop installed and runnin on your machine. In the event you don't have it, here is the [link](https://www.docker.com/products/docker-desktop/) for Docker Desktop. It supports both Windows and Mac. 

## Setup & Installation
1. Clone this repo and open it in your preferred code editor.

2. Open your terminal.

3. Start the application container by running the command: docker-compose up

4. The server will start and listen on port 8080.

## Running the API
Once the container is running, the API is accessible at: http://localhost:8080/v1/contacts

## Running the Tests

1. Keep your docker-compose up terminal running.

2. Open a new terminal window.

3. Run the test command: docker-compose exec app npm test

You should see the Jest results in the terminal 
