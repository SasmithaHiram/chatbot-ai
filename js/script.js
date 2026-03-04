var md = window.markdownit();

function send() {
    let userInput = document.getElementById("txtF").value;
    document.getElementById("user1").innerHTML = `<h3 id="user1">${userInput}</h3>`
    document.getElementById("txtF").value = "";
    document.getElementById("user2").innerHTML="";

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": userInput
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const chatMsgs = document.querySelector(".chatMsgs");

    const loader = document.createElement("div");
    loader.className = "loader";

    chatMsgs.appendChild(loader);

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA3uVYBQhmNwhgIBhrtxcxRgNAhODK1YUk", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            loader.remove();
            console.log(result.candidates[0].content.parts[0].text)
            document.getElementById("user2").innerHTML += `<h3 id="user2">${md.render(result.candidates[0].content.parts[0].text)}</h3>`
        })
        .catch((error) => console.error(error));
}
