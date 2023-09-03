$(function () {
  // Function to fetch data from the API and display it in the HTML
  function fetchAndDisplayData() {
    $.get("http://localhost:3000/people", function (data) {
      // Clear the existing data
      $("#dataDisplay").empty();

      // Loop through the data and display it
      data.forEach(function (person) {
        const item = `
          <li class="list-group-item">
            <strong>${person.name}</strong><br>
            Email: ${person.email}<br>
            Notes: ${person.notes}<br>
            ID#: ${person.id}
          </li>`;
        $("#dataDisplay").append(item);
      });
    });
  }

  // Read button click event
  $("#Read").on("click", function () {
    // Get the ID input value
    const id = $("#id").val();

    if (id) {
      // Fetch data for the specified ID
      $.get(`http://localhost:3000/people/${id}`, function (person) {
        if (person) {
          // Fill in form fields with fetched data
          $("#name").val(person.name);
          $("#email").val(person.email);
          $("#textarea").val(person.notes);
        } else {
          alert("No data found for the given ID.");
        }
      });
    } else {
      alert("Please provide an ID to fetch data.");
    }
  });

  // Create button click event
  $("#Create").on("click", function () {
    // Get values from input fields
    const name = $("#name").val();
    const id = $("#id").val();
    const email = $("#email").val();
    const notes = $("#textarea").val();

    if (name && id && email && notes) {
      // Create a new data object
      const newData = {
        id: parseInt(id),
        name: name,
        email: email,
        notes: notes
      };

      $.ajax({
        type: "POST",
        url: "http://localhost:3000/people",
        data: newData,
        success: function () {
          alert("Data created successfully!");
          // Fetch and display updated data
          fetchAndDisplayData();
          // Clear input fields
          $("#name").val("");
          $("#id").val("");
          $("#email").val("");
          $("#textarea").val("");
        },
        error: function () {
          alert("Error creating data!");
        }
      });
    } else {
      alert("Please fill in all fields.");
    }
  });

  // Update button click event
  $("#Update").on("click", function () {
    // Get values from input fields
    const id = $("#id").val();
    const newName = $("#name").val();
    const newEmail = $("#email").val();
    const newNotes = $("#textarea").val();

    if (id && newName && newEmail && newNotes) {
      // Create an updated data object
      const updatedData = {
        name: newName,
        email: newEmail,
        notes: newNotes
      };

      $.ajax({
        type: "PATCH",
        url: `http://localhost:3000/people/${id}`,
        data: updatedData,
        success: function () {
          alert("Data updated successfully!");
          // Fetch and display updated data
          fetchAndDisplayData();
          // Clear input fields
          $("#name").val("");
          $("#id").val("");
          $("#email").val("");
          $("#textarea").val("");
        },
        error: function () {
          alert("Error updating data!");
        }
      });
    } else {
      alert("Please fill in all fields.");
    }
  });

  // Delete button click event
  $("#Delete").on("click", function () {
    // Get the ID input value
    const id = $("#id").val();

    if (id) {
      $.ajax({
        type: "DELETE",
        url: `http://localhost:3000/people/${id}`,
        success: function () {
          alert("Data deleted successfully!");
          // Fetch and display updated data
          fetchAndDisplayData();
          // Clear input fields
          $("#name").val("");
          $("#id").val("");
          $("#email").val("");
          $("#textarea").val("");
        },
        error: function () {
          alert("Error deleting data!");
        }
      });
    } else {
      alert("Please provide an ID to delete.");
    }
  });
});

const randomJokeURL = 'https://official-joke-api.appspot.com/random_joke';

// Sending a GET request to the specified URL to fetch a random joke
$.get(randomJokeURL, (data) => {
    // Logging the received joke data to the console
    console.log(data);
    
    // Prepending the joke's setup to the element(s) with the class 'jokes'
    $('#jokes').prepend(`<p> ${data.setup} </p>`);
    
    // Appending the joke's punchline to the element(s) with the class 'jokes'
    $('#jokes').append(`<p> ${data.punchline} </p>`);
});
