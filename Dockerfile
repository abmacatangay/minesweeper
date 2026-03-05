# syntax=docker/dockerfile:1

# Dockerfile for a Minesweeper web application.
# Note that this is a static web application made using HTML, CSS, and JavaScript.

################################################################################
# Comments are provided throughout this file to help you get started.
# https://docs.docker.com/go/dockerfile-reference/

################################################################################
# FROM: Pick a base image to serve as the foundation for the other build stages in this file.
# By specifying the "latest" tag, it will also use whatever happens to be the most recent version of that image when you build your Dockerfile.
# If reproducibility is important, consider using a versioned tag.
# -> We know our Minesweeper program is just static JS and HTML, so we don't need a large base image.
# -> By searching JavaScript Docker images on Docker Hub, we can see see the official image site for Node.js on https://hub.docker.com/_/node
# -> Looking at the image variants section, alpine is a good choice for a base image because it's small and has the necessary tools to serve static files. 
FROM node:25-alpine AS base

################################################################################
# MAINTAINER VS LABEL: Both of these instructions are used to specify metadata about the image, such as the author or maintainer of the image.
# MAINTAINER is the older instruction and is less flexible than LABEL since it only allows you to specify a single key-value pair of metadata.
LABEL maintainer="Alyanna" \
      version="1.0" \
      description="Minesweeper JS" 
      
################################################################################
# WORKDIR: Set the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile.
# -> By setting this to /app, we ensure that all subsequent commands are run in the context of the /app directory in the container.
WORKDIR /app

################################################################################
# RUN: Execute build commands.
# -> Since we are using a Node.js image but our Minesweeper game is static, we need to install a simple web server to serve our static files.
# -> Research via npmjs.com and stack overflow points to 'serve' as the industry standard for this purpose, so we will install it globally using npm.
RUN npm install -g serve 
# https://www.npmjs.com/package/serve

################################################################################
# COPY: Copy files from the host machine to the container.
# -> docker init command already creates a .dockerignore file that excludes node_modules and other unnecessary files from being copied into the container, so we can just copy the whole thing.
# -> First . means the current directory on the host machine (where the Dockerfile is located)
# -> Second . means the current directory in the container (which we set to /app with WORKDIR above)
# -> Note: If we have no dockerignore, you have to do [COPY file.type .] for each file you want to copy.
COPY . .

################################################################################
# EXPOSE: Document the port that the container will listen on at runtime.
EXPOSE 3000

################################################################################
# CMD: Specify the command to run when the container starts.
# We already installed the 'serve' package globally, so we can use it. -s is for single application, . is for the current directory, and -l is for the port to listen on.
# https://www.npmjs.com/package/serve#cli-usage
CMD ["serve", "-s", ".", "-l", "3000"]