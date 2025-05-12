let apiToken = "";
let channelId = "";
let headers = {};

function startBot() {
    apiToken = document.getElementById("apiToken").value;
    channelId = document.getElementById("channelId").value;

    if (!apiToken || !channelId) {
        alert("⚠️ Please enter a valid API token and channel ID!");
        return;
    }

    headers = {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json"
    };

    document.getElementById("log").innerHTML = "✅ Bot started! Listening...";
    checkMessages();
}

async function checkMessages() {
    try {
        const response = await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages`, { headers });
        if (response.ok) {
            const data = await response.json();
            if (data.messages.length > 0) {
                document.getElementById("log").innerHTML = `<b>New Message:</b> ${data.messages[0].content}`;
            }
        }
    } catch (error) {
        document.getElementById("log").innerHTML = "❌ Error fetching messages!";
    }

    setTimeout(checkMessages, 5000);
}

async function sendCustomMessage() {
    if (!apiToken || !channelId) {
        alert("⚠️ Start the bot first!");
        return;
    }

    let customMessage = document.getElementById("customMessage").value;
    if (!customMessage) {
        alert("⚠️ Please enter a message!");
        return;
    }

    let body = JSON.stringify({ content: customMessage });

    try {
        const response = await fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages`, {
            method: "POST",
            headers,
            body
        });

        if (response.ok) {
            document.getElementById("log").innerHTML += `<br><b>Sent:</b> ${customMessage}`;
        } else {
            document.getElementById("log").innerHTML += `<br>❌ Failed to send message!`;
        }
    } catch (error) {
        document.getElementById("log").innerHTML += `<br>❌ Error sending message!`;
    }
}
