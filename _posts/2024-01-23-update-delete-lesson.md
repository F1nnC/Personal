---
title: HTML/JavaScript for User Profile
author: david
categories: ['Lab Notebook']
tags: ['Java']
type: tangibles
week: 19
description: Lesson on updating/deleting user info through HTML/JS and adding user stats.
toc: True
comments: True
date: 2024-01-21 12:00:00 +0000
---

## Update/Delete User Info
> In this section we will be explaining how data for the user would be updated and deleted in the Java Springboot backend.

First, make sure you have this repository cloned so that you can see the code working in real time: `git clone https://github.com/CSA-AI/CSA_AI_lessonBackend.git`

### Update Through API Requests
> This is how the user would update data specific to their profile using a PUT request which communicates to the Springboot server.

![Image](https://github.com/CSA-AI/CSA_AI/assets/111480448/277b757c-8879-4b17-9ea5-bc94aace2b21)

- putmapping then we put the url that we wantt to go to thru response entity
- we use the things that we wanna modify
- findbyEmail, how we find the person (thru JPA repo)
- JPA set functions, modifying the parts of the things we want
- creates a new person object (person), searches for the object that has the same email in the database, then edit the specific values in the db and saves it 

<body>
    <h2>Password Update</h2>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" value="toby@gmail.com" readonly><br>
    <label for="password">New Password:</label>
    <input type="password" id="password" name="password" value="test@123"><br>
    <label for="name">New Name:</label>
    <input type="text" id="name" name="name" value="Test Test"><br>
    <button onclick="updatePassword()">Update</button>
    <p id="updateMessage"></p>
    <script>
        function updatePassword() {
            const url = 'http://localhost:8085/api/person/update';
            const email = document.getElementById("email").value;
            const newPassword = document.getElementById("password").value;
            const newName = document.getElementById("name").value;
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', newPassword);
            params.append('name', newName);
            fetch(url, {
                method: 'PUT',
                body: params,
            })
                .then(response => response.json())
                .then(data => {
                    const updateMessage = "Updating email to: " + data.email;
                    document.getElementById("updateMessage").innerHTML = updateMessage;
                })
                .catch(error => console.error('Error:', error));
        }
    </script>
</body>

### Delete

searches by id and deletes that entire person object

<body>
    <h2>User Delete</h2>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" value="toby@gmail.com" readonly><br>
    <label for="password">New Password:</label>
    <input type="password" id="password" name="password" value="test@123"><br>
    <label for="name">New Name:</label>
    <input type="text" id="name" name="name" value="Test Test"><br>
    <button onclick="updatePassword()">Delete</button>
    <p id="updateMessage"></p>
    <script>
        function updatePassword() {
            const url = 'http://localhost:8085/api/person/update';
            const email = document.getElementById("email").value;
            const newPassword = document.getElementById("password").value;
            const newName = document.getElementById("name").value;
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('password', newPassword);
            params.append('name', newName);
            fetch(url, {
                method: 'PUT',
                body: params,
            })
                .then(response => response.json())
                .then(data => {
                    const updateMessage = "Updating email to: " + data.email;
                    document.getElementById("updateMessage").innerHTML = updateMessage;
                })
                .catch(error => console.error('Error:', error));
        }
    </script>
</body>
