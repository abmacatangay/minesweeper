# Minesweeper using JavaScript, HTML, and CSS

### How to retrieve Minesweeper File
* Option 1: Go to https://github.com/abmacatangay/minesweeper, then click on < > Code and download as ZIP file. Extract the folder.
* Option 2: [git clone etc, todo later]

### Application that must be open:
* Docker Desktop 
* Terminal on the folder MinesweeperJS is located

### Building and running MinesweeperJS using Docker
* First, build your image using:
````
docker build -t minesweeperjs .
````
* Then start the game and map it to your unused port. Local port 8080 is used for simplicity.
````
docker run -d -p 8080:3000 --name my-game minesweeperjs
````
* To view the program, go to your browser and type
````
http://localhost:8080
````
* To shut down the server,
````
docker stop my-game
````
* To run it again,
````
docker run my-game
````
* Lastly, to delete the docker image, use the command
````
docker rm my-game
````
````
docker rmi minesweeperjs
````

### View Build on Docker Hub or Docker Desktop
todotodo