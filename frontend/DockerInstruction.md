### How to run frontend of this app in docker.

1) Open your Docker Desktop. (If you don't have it, download from official website)

2) Open your packege (directory) with this project in cmd or vs code terminal. To do this, you need to use command "cd", untill you reach project "Coursework-Become-the-Overman-todo-app"

3) Put this in your cmd or vs code terminal to build docker container:
### docker-compose -f docker-compose-frontend.yml build
I advise you to not use VPN when you run this command. 

4) If you build docker container successfully (you can see the result in Docker Desktop), use this command in cmd or vs code terminal to up your app:
### docker-compose -f docker-compose-frontend.yml up

5) To shut down your docker container, use this command:
### docker-compose -f docker-compose-frontend.yml down