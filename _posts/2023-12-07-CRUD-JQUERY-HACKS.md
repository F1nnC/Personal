---
title: JQuery and CRUD Hacks
author: david
categories: ['Lab Notebook']
tags: ['Java', 'jQuery', 'Frontend']
type: hacks
week: 15
description: Hacks for CRUD and JQuery.
toc: True
comments: True
date: 2023-12-07 12:00:00 +0000
---

# Directions

- You really should try to answer the 5 questions below this without any help. These are core concepts that you should at least attempt to learn.
- The update JQUERY function may require a little help but try without first
- Hacks should only take 20 minutes at most

## CRUD popcorn hack
talk about usage of one of four elements of CRUD from your project in tri 1. Focus on how CRUD was implemented.
- We used the create to create users in the user database for our project, with data for the user's graph data.

## Free Response and MCQ

1. What does CRUD stand for?
    - Create
    - Read
    - Update
    - Delete

2. What are the HTTP verbs that are associated with each CRUD action?
    - C - POST
    - R - GET
    - U - PUT
    - D - REMOVE/DELETE

3. What is JQuery?

jQuery is a lightweight JavaScript library that simplifies DOM manipulation, event handling, and AJAX requests, providing a convenient and cross-browser-compatible way to enhance client-side scripting on web pages.

4. Match A, B, and C into the JQuery event handler for a data table
    - A: 'click'
    - B: '.delete-btn'
    - C: '#data-table'

    $(C).on(A, B, function() {
    // code
  });

5. Why do we use JQUERY with CRUD?

It helps simplify the manipulation of DOM (html).

## Finish the update JQUERY function
- its all the way at the end, you should see the green comment
- you can choose to use the two lines I've already given or not

<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<style>
  body {
   font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #e66b8f; /* Barbie Pink */
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #ff8bbd; /* Barbie Pink */
    color: white;
  }

  button {
    background-color: #ff8bbd; /* Barbie Pink */
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
  }

  button:hover {
    background-color: #e66b8f; /* Lighter Barbie Pink */
  }
</style>


<table id="data-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <!-- Data will be dynamically added here -->
  </tbody>
</table>

<button id="create-btn">Create Barbie Character</button>

<script>
  const initialData = [
    { id: 1, name: 'Barbie', email: 'barbie@example.com' },
    { id: 2, name: 'Ken', email: 'ken@example.com' }
  ];

  let currentData = [...initialData]; // Use a separate variable for current data

  function renderData(data) {
    const tableBody = $('#data-table tbody');
    tableBody.empty();

    data.forEach(item => {
      const row = `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>
            <button class="update-btn" data-id="${item.id}">Update</button>
            <button class="delete-btn" data-id="${item.id}">Delete</button>
          </td>
        </tr>
      `;
      tableBody.append(row);
    });
  }

  function createBarbieCharacter() {
    const newName = prompt('Enter the name of the Barbie character:');
    const newEmail = prompt('Enter the email of the Barbie character:');
    const newId = currentData.length + 1;
    
    currentData = [...currentData, { id: newId, name: newName, email: newEmail }]; // Update currentData
    renderData(currentData);
  }

  $('#create-btn').on('click', createBarbieCharacter);

  $('#data-table').on('click', '.delete-btn', function() {
    const idToDelete = $(this).data('id');
    currentData = currentData.filter(item => item.id !== idToDelete); // Update currentData
    renderData(currentData);
  });

  $('#data-table').on('click', '.update-btn', function() {
    const idToEdit = $(this).data('id');
    const updateIndex = currentData.findIndex(item => item.id === idToEdit);

    // Get the current data for the selected Barbie character
    const currentDataItem = currentData[updateIndex];

    // Prompt the user to update the details
    const newName = prompt('Enter the updated name of the Barbie character:', currentDataItem.name);
    const newEmail = prompt('Enter the updated email of the Barbie character:', currentDataItem.email);

    // Update the data
    currentData = [
      ...currentData.slice(0, updateIndex),
      { id: idToEdit, name: newName, email: newEmail },
      ...currentData.slice(updateIndex + 1)
    ];

    // Render the updated data
    renderData(currentData);
  });

  // Initial rendering
  renderData(currentData);
</script>

