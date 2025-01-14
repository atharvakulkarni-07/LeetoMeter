# LeetoMeter
Welcome to LeetoMeter, an interactive and visually appealing web application that allows users to monitor their progress on LeetCode. This app provides an intuitive interface to view user statistics, including solved problems across difficulty levels and detailed submission data.

## 🌟Features
- Dynamic User Search: Search for a LeetCode user by entering their username.
- Interactive Progress Circles: Visual representation of solved problems across Easy, Medium, and Hard levels.
- Detailed Submission Stats: Displays the total submissions broken down by difficulty levels.
- Typewriter Placeholder Effect: A sleek typewriter effect for better user experience.
- API Integration: Fetches user data using the LeetCode GraphQL API.
- Responsive Design: Mobile-friendly and visually appealing with gradient animations.

## 🖥️ Tech Stack
- HTML: For structuring the web application.
- CSS: To style the app, including animations and gradients.
- JavaScript: For handling interactivity and API communication.

## Core Functionalities
### Usename Validation: Ensures the username adheres to a valid pattern before making API requests.
  ```
  function ValidateUsername(username) {
    const regex = /^[a-zA-Z0-9_-]{1,15}$/;
    return regex.test(username);
  }
  ```
### Fetching the LeetCode data
  ```
async function fetchUserDetails(username) {
    const targetUrl = 'https://leetcode.com/graphql/';
    const requestOptions = { method: "POST", headers: myHeaders, body: graphqlQuery };
    const response = await fetch(targetUrl, requestOptions);
    const parsedData = await response.json();
    displayUserData(parsedData);
}
  ```

## 🚀 How to Run Locally
Follow these steps to get started with LeetoMeter on your local system:

### Prerequisites
Ensure you have the following installed:

- A modern web browser (e.g., Chrome, Firefox)
- A text editor (e.g., VS Code, Sublime)
- Node.js (optional, for running a local server)

### Steps
- Clone the repository
  ```
  git clone https://github.com/atharvakulkarni-07/LeetoMeter.git
  ```
- Navigate accordingly and find the scripts

## Folder Structure
```
LeetoMeter/
│
├── index.html        # Main HTML file
├── style.css         # Styling file
└── script.js         # JavaScript file for functionality
```

## 📈 Future Enhancements
- Add support for additional statistics (e.g., fastest submissions).
- Enhance error handling and user feedback.
- Implement authentication for private profiles.
- Create a leaderboard for competitive comparison.

## 🙌 Acknowledgments
- LeetCode for their API and platform.
- Heroku for proxy support.
