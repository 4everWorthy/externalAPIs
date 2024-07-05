document.getElementById('apiForm').addEventListener('submit', function(event) { // Add an event listener to the form with ID 'apiForm' to handle the submit event.
    event.preventDefault(); // Prevent the default form submission behavior (which would reload the page).
  
    const query = document.getElementById('inputField').value; // Get the value entered in the input field with ID 'inputField' and store it in the variable 'query'.
  
    console.log(`Searching for: ${query}`); // Log the search query to the console for debugging.
  
    fetch(`/search?query=${encodeURIComponent(query)}`) // Make a GET request to the server at the '/search' endpoint with the query parameter.
      .then(response => { // Handle the server response.
        if (!response.ok) { // Check if the response status is not OK (e.g., 404 or 500).
          throw new Error('Network response was not ok'); // Throw an error if the response is not OK.
        }
        return response.json(); // Parse the response data as JSON.
      })
      .then(data => { // Handle the parsed JSON data.
        console.log('Received data:', data); // Log the received data to the console for debugging.
        displayResult(data); // Call the 'displayResult' function to display the data on the webpage.
      })
      .catch(error => { // Handle any errors that occurred during the fetch or data processing.
        console.error('Error:', error); // Log the error to the console.
        document.getElementById('result').textContent = 'An error occurred. Please try again.'; // Display an error message on the webpage.
      });
  });
  
  function displayResult(data) { // Define a function named 'displayResult' that takes 'data' as a parameter.
    const resultDiv = document.getElementById('result'); // Get the element with ID 'result' where the results will be displayed.
    resultDiv.innerHTML = ''; // Clear any previous results.
  
    if (data.error) { // Check if the data contains an error message.
      resultDiv.textContent = data.error; // Display the error message in the 'result' element.
      return; // Exit the function early.
    }
  
    data.results.forEach(item => { // Iterate over each item in the results array.
      const div = document.createElement('div'); // Create a new 'div' element.
      div.textContent = item.name; // Set the text content of the 'div' to the item's name.
      resultDiv.appendChild(div); // Append the 'div' to the 'result' element, adding it to the webpage.
    });
  }
  