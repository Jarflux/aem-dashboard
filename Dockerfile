# This image will be based on the official nodejs docker image
FROM node:5.12.0
 
# Commands will run in this directory
WORKDIR /home/app
 
# Add all our code inside that directory that lives in the container
ADD . /home/app
 
# Install dependencies and generate production dist
RUN \
    npm install -g bower gulp && \
    npm install && \
    bower install --config.interactive=false --allow-root
 
# Tell Docker we are going to use this port
EXPOSE 3000
 
# The command to run our app when the container is run
CMD ["npm", "run", "serve-dist"]