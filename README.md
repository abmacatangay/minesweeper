# 💣 Minesweeper Run Instructions

### 🙋🏻‍♂️ How do I retrieve the Minesweeper File?
* Option 1: Go to [https://github.com/abmacatangay/minesweeper](https://github.com/abmacatangay/minesweeper) , then click on < > Code and download as ZIP file. Extract the folder. Remember to open the terminal on the Exer3 folder.
* Option 2: Clone the repository. Before you clone, make sure you are in a place where you can see the folder with your eyes. Documents folder used for simplicity.
````
cd ~/Documents
````
Run the following commands on your Documents terminal:
````
git clone https://github.com/abmacatangay/minesweeper
````
````
cd minesweeper
````

### ❗️ Applications that must be open:
* Docker Desktop 
* minesweeper Terminal

### 🔩 Building and running Minesweeper using Docker using Compose Function
* To build and start:
````
docker compose up --build -d
````
* To see the program, go to local host. Ensure no other apps are using this port since this is defined already in the yaml.
````
http://localhost:8080
````
* To stop the app,
````
docker compose down
````
* To delete the image,
````
docker compose down --rmi all
````


### 🔩 Building and running Minesweeper using Docker using Build Function
* On your minesweeper folder's terminal, build your image using:
````
docker build -t minesweeperjs .
````
* Then start the game and map it to your unused port. Local port 8080 is used for simplicity.
````
docker run -d -p 8080:3000 --name minesweeper minesweeperjs
````
* To view the program, go to your browser and type
````
http://localhost:8080
````
* To shut down the server
````
docker stop minesweeper
````
* To run it again
````
docker start minesweeper
````
* Lastly, to delete the docker image, use the commands
````
docker rm minesweeper
````
````
docker rmi minesweeperjs
````

### 🛜 Running Minesweeper using Docker Hub 
* You can access the docker image of this activity on [DockerHub](https://hub.docker.com/r/abmacatangay/minesweeperjs)
* Click the "Run in Docker Desktop" Button
* Input your container name and host port when prompted.
* You can click the local host link below the container's ID on Docker Desktop.
* Deleting the container and stopping the program can also be done via Docker Desktop.