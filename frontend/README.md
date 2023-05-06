# ?
1. Install dependencies
```shell
npm i
```
2. Change the `.env.example` to `.env.local` and add the test user (you should ask the developer to give you the user and the password 😁) 
but you can run the app without the user but you can't make request to the API.

🚩 To check the `flights` page, you can use [Fake Data](src/utils/fake.util.ts), if you don't have permission to use the API

3. Run the app
```shell
npm start
```
# Docker
You can use command below to run the app on Docker and it will be running on port 3000:
```shell
docker-compose up
```
