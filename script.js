// Make sure that the DOM content is loaded first;
document.addEventListener("DOMContentLoaded", function() {

    const searchButton = document.getElementById("searchButton");
    const userNameInput = document.getElementById("userInput");
    const statsContainer = document.querySelector(".statsContainer");

    const easyProgressCircle = document.querySelector(".easyProgress");
    const mediumProgressCircle = document.querySelector(".mediumProgress");
    const hardProgressCircle = document.querySelector(".hardProgress");

    const easyLabel = document.getElementById("easyLabel");
    const mediumLabel = document.getElementById("mediumLabel");
    const hardLabel = document.getElementById("hardLabel");

    const cardStatsContainer = document.querySelector(".statsCard");

    // Typewriter effect for the placeholder
    function typewriterPlaceholder(inputField, text, speed) {
        let index = 0;

        function type() {
            if (index < text.length) {
                inputField.setAttribute("placeholder", text.slice(0, index + 1));
                index++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Start the typewriter effect for the username input
    typewriterPlaceholder(userNameInput, "Enter your username", 100);

    // Function that checks the validation;
    function ValidateUsername(username){
        if(username.trim === "") return false;
        // if the username is empty, then false is returned;

        // What can be another expressions?
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);

        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    // The function that fetches the details of the user on Leetcode via the API
    async function fetchUserDetails(username){
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            //statsContainer.classList.add("hidden");

            // const response = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json")

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

            // Now it's time to display the user data
            displayUserData(parsedData);
        }
        catch(error) {
                statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
                searchButton.textContent = "Search";
                searchButton.disabled = false;
        }

    }


    // The function that updates the Progress Circles
    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved / total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`)
        label.textContent = `${solved} / ${total}`;
    }


    // This is the function to obtain the data received form the POST
    function displayUserData(parsedData)
    {
        // Use the json formatter to observe shit clearly
        const totalQuestions = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQuestions = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQuestions = parsedData.data.allQuestionsCount[2].count;
        const totalHardQuestions = parsedData.data.allQuestionsCount[3].count;

        // Get solved questions values

        const solvedTotalQuestions = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTotalEasyQuestions = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTotalMediumQuestions = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTotalHardQuestions = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        // update the progress in the circles dynamically now

        updateProgress(solvedTotalEasyQuestions, totalEasyQuestions, easyLabel, easyProgressCircle)

        // Do same for medium and hard questions;

        updateProgress(solvedTotalMediumQuestions, totalMediumQuestions, mediumLabel, mediumProgressCircle)

        updateProgress(solvedTotalHardQuestions, totalHardQuestions, hardLabel, hardProgressCircle)


        // Creating the card object so that they can be populated later;
        const cardsData = [
            {
                label: "Overall Submissions", //value can be obtained from the path;
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions
            },
            {
                label: "Overall Easy Submissions", //value can be obtained from the path;
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions
            }, 
            {
                label: "Overall Medium Submissions", //value can be obtained from the path;
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions
            }, 
            {
                label: "Overall Hard Submissions", //value can be obtained from the path;
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions
            } 
        ];

        // console.log("CardData", cardData); //-Used for Debugging


        // Here is where we write the new inner HTML for the cards that are dynamically generated after clicking on Search Button
        cardStatsContainer.innerHTML = cardsData.map(
            data => {
                return `
                    <div class="card">
                        <h3>${data.label}</h3>
                        <p>${data.value}</p>
                    </div>
                `
            }
        ).join(""); // .join("") is used to remove the commas
    }

    // This is the root function that calls other functions after clicking SEARCH
    searchButton.addEventListener('click', function() {
        const username = userNameInput.value;
        console.log("Logging Username: ", username);

        // Now check if the username is valid or not
        // if Valid...
        if(ValidateUsername(username)){
            // we paste the username in the API and fetch the user details
            fetchUserDetails(username);
        }
    })

    

})
