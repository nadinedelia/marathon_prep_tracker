FROM cypress/base:14.16.0

WORKDIR /app

COPY ./activity/package.json .  
COPY ./activity/package-lock.json .
RUN npm install

COPY ./cypress /app/cypress 

CMD ["npm", "run", "cy:run"]
