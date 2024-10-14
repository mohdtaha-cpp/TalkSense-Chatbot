# TalkSense (An application for ChatBot interaction)
TalkSense is the interactive ChatBot application which uses Google Gemini Flash 1.5 Api to fetch real time response. It was built under the assignment given by CTO of TrueGradient..

## Technology Stacks Used
### Frontend
- JavaScript
- ReactJS
- Tailwind CSS

### Backend
- Express.js
- Node.js
- MongoDB

### Deployed Link
https://talksense.netlify.app/

### Guide to start the application

NOTE - Make sure you have `Node.js` installed on your machine. 

1. Clone the repository on your local machine.
```
git clone https://github.com/mohdtaha-cpp/TalkSense-Chatbot.git
```
2. Change the current working directory to the backend folder and install the dependencies.
```
cd backend && npm install
``` 
3. Change the current working directory from the root folder to the frontend folder to start the frontend application.
```
cd frontend && npm run start
```
4. Create an `.env file` inside the server folder and assign the environment variables with the suitable values.
```
PORT=<port number>
MONGO_URI=<mongo_uri>
```
6. Start the backend application and connect it with the MongoDB instance.
```
nodemon index.js
```

### Features implemented
- Login user functionality
- Interactive chatbot which give responses using Google Gemini API
- Admin Panel dashboard to fetch all the response of users
- Delete Chat functionality to delete the conversation from db.
- Logout Functionality for User
- All the chats of the user are saved and fetch once the user logged in.
- Mobile Responsive Application

### Future Scope
- Implement redis to serve chats from cache to minimise db interaction.
- Scalability for large number of users.
- Implement user authentication and authorization with JWT or OAuth.

### User Interface
#### Login Page
![image](https://github.com/user-attachments/assets/b0c0cd47-8592-4032-b37d-c9e15725124a)

#### Home Page
![image](https://github.com/user-attachments/assets/96792d56-66f5-4d6e-8246-fe517bebb633)
![image](https://github.com/user-attachments/assets/447f16f0-39f9-4b93-aad7-606e7f20bac1)

#### Admin Panel
![image](https://github.com/user-attachments/assets/25ea7113-4adf-4da0-93a6-d17d45b77baf)





