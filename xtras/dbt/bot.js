(function () {
  // Configuration
  var config = window.chatWidgetConfig || {
    moduleId: 'default_module_id',
    serverUrl: 'https://eidchat.azurewebsites.net/chatHub'
  };

  // Function to add CSS dynamically
  function loadCSS(href) {
    const cssLink = document.createElement("link");
    cssLink.href = href;
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    document.head.appendChild(cssLink);
  }

  function loadCSSInline() {
    const style = document.createElement('style');
    style.innerHTML = `
        .connection-status {            
            font-size: 0px;
            width: 9px;
            height: 9px;
            border-radius:50%;
            border: solid 0.8px #fff;      
            position:absolute;
            left: 0px;
            bottom: 4px;  
        }
        .connection-status.connected {
            background-color: #1ee044;         
        }
        .connection-status.disconnected {
            background-color: #d0021b;           
        }
    `;
    document.head.appendChild(style);
  }

  loadCSSInline();

  // Function to dynamically load a JavaScript file
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
  }

  // Load required CSS
  loadCSS("ai-main.css");


  // Function to add the chat widget HTML to the body
  function addChatWidget() {
    var messages = [
      "Talk to our AI agent",
      "Contact Us",
      "Schedule a Callback",
      "Request a Quote"
    ];

  const chatWidgetHTML = `
      <div id="chat-widget" class="chat-container eid-toggle-chatbot">

          <div class="chat-header" id="chat-header">              
             <div class="chat-header-left-panel">
             <div class="chat-status">
             <img class="chatbot-header-logo" src="./logo-dark.svg" alt="chat bot">
           
             </div>
             <div>
             <div class="chat-header-title">Double Black AI</div>
             <div class="chat-header-sub-title">  <div id="connection-status" class="connection-status">Connecting to Agent...</div> Online</div>
             </div>              
             </div>
             <div class="chat-header-right-panel">
            <img id="fullScreenToggle" class="chatbot-full-img" src="./resize.svg" alt="chat bot" title="Resize">
             <img id="closeChatBot" class="chatbot-minimize-img" src="./minimize.svg" alt="chat bot" alt="Minimize" title="Minimize">

             <img  id="modeToggle" class="chatbot-mood-img" src="./moon.svg" alt="Change Mode" title="Mode: Lite | Dark">
             </div>
          </div>

        <div id="chat-messages" class="chat-messages">
  <div class="st-cards">
    <div class="st-card-content">
      <div class="st-card-lead"> Enterprise Integration </div>
      <div class="st-card-text"> I'am with heading, link and a single line of text description</div>
      <div class="st-card-link"><a href="#">Read More</a></div>
    </div>
  </div>
<div class="st-cards">
    <div class="st-card-content">
      <div class="st-card-lead"> The everything app for work.</div>
     </div>
  </div>
<div class="st-cards">
    <div class="st-card-content">
      <div class="st-card-lead"> Secure and compliant</div>
      <div class="st-card-text"> How does Starkly integrate with cloud applications? </div>
     
    </div>
  </div>
</div>

          <div class="chat-footer">
  <div class="ai-tags"> 
  
  <div onclick="handleClick(this)">Request a Callback</div>
  <div onclick="handleClick(this)">Learn more</div>
</div>

<div class="textbox1">
             
<textarea name="textarea" id="message-input" class="message-input" placeholder="Type your message"></textarea>
              <button id="send-button" class="send-button" disabled>
              <img  src="./send.svg" alt="Send">
              </button>
</div>


          </div>   



      </div>

      <div class="chat-panel">
      <div class="chat-panel-message">
           <span id="dynamic-message">Talk to StarklyAI Agent</span>
              <span class="typing-animation"></span>
      </div>
      <div id="eidChatPanel" class="chat-panel-img vert-move">
      <img  src="./logo-lite.svg" alt="chat bot" class="st-logo">
        <div alt="Minimize" class="st-min">
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M1 13L13 0.999999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13 13L1 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
      
      </div>
<div>
          </div>
  `;
  document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);
  updateDynamicMessage();
  }

  function updateDynamicMessage() {
    var messages = ["Talk to our AI Agent", "Learn more about US", "Schedule a Callback", "Request a Quote"];
    var typingSpeed = 50; // milliseconds
    var messageIndex = 0;
    
    function typeMessage() {
      if (messageIndex < messages.length) {
        var message = messages[messageIndex];
        var charIndex = 0;
        var typingElement = document.querySelector('.typing-animation');
        var dynamicMessageElement = document.getElementById('dynamic-message');
        dynamicMessageElement.textContent = ''; // Clear previous message
        typingElement.textContent = '_'; // Show typing indicator
        
        function typeChar() {
          if (charIndex < message.length) {
            dynamicMessageElement.textContent += message[charIndex++];
            setTimeout(typeChar, typingSpeed);
          } else {
            typingElement.textContent = ''; // Hide typing indicator
            messageIndex++;
            setTimeout(typeMessage, 2000); // Wait for the next message
          }
        }
        
        typeChar();
      } else {
        messageIndex = 0; // Reset to loop the messages
        setTimeout(typeMessage, 2000);
      }
    }
    
    typeMessage();
  }

  

  function createAndDisplaySystemMessageWithLoading() {
    const time = new Date().toLocaleTimeString();
    const chatMessages = document.getElementById("chat-messages");

    if (!chatMessages) {
      console.error("Chat messages container not found.");
      return;
    }

    const msgWithLoading = document.createElement("div");
    msgWithLoading.classList.add("chat-message", "system");
    msgWithLoading.id = "system-message-loading";


    const messageDetails = document.createElement("div");
    messageDetails.classList.add('message-details');
    //loading
    const icon = document.createElement("img");
    icon.setAttribute("src", "./logo-lite.svg");

    const loadingDots = document.createElement("div");
    loadingDots.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    loadingDots.classList.add('loading-dots');

    const timestamp = document.createElement("span");
    timestamp.textContent = time;
    timestamp.classList.add("message-timestamp");

    const senderName = document.createElement("span");
    senderName.innerHTML = 'EIDGPT';
    senderName.classList.add("message-sender");

    msgWithLoading.appendChild(loadingDots);
    messageDetails.appendChild(icon);
    messageDetails.appendChild(senderName);
    messageDetails.appendChild(timestamp);
    //reposition icon underneath mesg
    msgWithLoading.append(messageDetails);

    chatMessages.appendChild(msgWithLoading);
  }
  window.handleClick = function (element) {
    const text = element.innerText;
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");

    // Copy text to input and trigger click
    if (messageInput && sendButton) {
        messageInput.value = text;
        sendButton.click();
    }
}
  // Initialize chat widget
  function initializeChatWidget() {
    addChatWidget();

    const clientId = generateClientId();
    let messageTimeout, cancelTimeout;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(config.serverUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Connection handling
    connection.onclose(() => {
      updateConnectionStatus("Disconnected (Trying to establish connection...)");
      setTimeout(() => startConnection(connection), 2000);
    });

    // Define client methods expected by the server
    connection.on("ReceiveMessage", (message) => {
      console.log("Message received from server:", message);
      clearTimeout(messageTimeout);
      clearTimeout(cancelTimeout);

      const msgWithLoading = document.getElementById("system-message-loading");
      if (msgWithLoading) {
        msgWithLoading.remove();
      }
      displaySystemMessage(message);
      document.getElementById("send-button").disabled = false;
    });

    connection.on("MessageReceived", (acknowledgment) => {
      console.log("Acknowledgment from server: ", acknowledgment);

      // Inline function to display system message with loading dots immediately following the text

      const time = new Date().toLocaleTimeString();

      clearTimeout(messageTimeout);
      clearTimeout(cancelTimeout);

      messageTimeout = setTimeout(() => {
        document.getElementById("system-message-loading").remove();
        createAndDisplaySystemMessageWithLoading("Oops, It seems servers are busy at the moment...");
      }, 20000); // 40 seconds

      cancelTimeout = setTimeout(() => {
        removeLoading();
        document.getElementById("system-message-loading").remove();
        displaySystemMessage("Unable to retrieve message. Please try again in a few minutes.");
        document.getElementById("send-button").disabled = false;
      }, 60000); // 120 seconds

      createAndDisplaySystemMessageWithLoading("Got it, fetching your answer");
      // Create the container for both the message and the loading dots

      scrollToBottom(chatMessages);

    });

    startConnection(connection);

    setUpEventListeners(connection, clientId);
  }

  function startConnection(connection) {
    updateConnectionStatus("Connecting to Agent...");
    connection.start()
      .then(() => {
        updateConnectionStatus("Connected");
        document.getElementById("send-button").disabled = false;
      })
      .catch(err => {
        console.error("Connection error:", err.toString());
        setTimeout(() => startConnection(connection), 2000);
      });
  }

  function updateConnectionStatus(status) {
    const connectionStatusElement = document.getElementById("connection-status");
    connectionStatusElement.textContent = status;

    if (status === "Connected") {
      connectionStatusElement.classList.add("connected");
      connectionStatusElement.classList.remove("disconnected");
      document.getElementById("send-button").disabled = false;
    } else {
      connectionStatusElement.classList.add("disconnected");
      connectionStatusElement.classList.remove("connected");
      document.getElementById("send-button").disabled = true;
    }
  }

  function setUpEventListeners(connection, clientId) {
    document.getElementById("send-button").addEventListener("click", event => {
      sendMessage(event, connection, clientId);
    });

    document.getElementById("message-input").addEventListener("keypress", function (event) {
      if (event.key === 'Enter') {
        sendMessage(event, connection, clientId);
      }
    });

    document.getElementById("fullScreenToggle").addEventListener("click", () => {
      const chatWidget = document.getElementById("chat-widget");
      chatWidget.classList.toggle("fullscreen");
      scrollToBottom(document.getElementById("chat-messages"));
    });

    document.getElementById("modeToggle").addEventListener("click", () => {
      const chatWidget = document.getElementById("chat-widget");
      chatWidget.classList.toggle("modeDark");

    });

//    document.getElementById("eidChatPanel").addEventListener("click", () => {
//      const chatWidget = document.getElementById("chat-widget");
//      chatWidget.classList.toggle("eid-toggle-chatbot");
//    });
//
//    document.getElementById("closeChatBot").addEventListener("click", () => {
//      const chatWidget = document.getElementById("chat-widget");
//      chatWidget.classList.toggle("eid-toggle-chatbot");
//    });
//      
      
      // 
      document.getElementById("eidChatPanel").addEventListener("click", () => {
  const chatWidget = document.getElementById("chat-widget");
  chatWidget.classList.toggle("eid-toggle-chatbot");

  const chatPanel = document.querySelector(".chat-panel");
  chatPanel.classList.toggle("opened");
});

document.getElementById("closeChatBot").addEventListener("click", () => {
  const chatWidget = document.getElementById("chat-widget");
  chatWidget.classList.toggle("eid-toggle-chatbot");

  const chatPanel = document.querySelector(".chat-panel");
  chatPanel.classList.toggle("opened");
});
      //

  }

  function sendMessage(event, connection, clientId) {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message) {
      displayUserMessage(message);
      //  displayLoading();
      document.getElementById("send-button").disabled = true;

      connection.invoke("SendMessageToServer", clientId, message, config.moduleId)
        .catch(err => console.error("Error sending message:", err.toString()));

      messageInput.value = '';
    }
    event.preventDefault();
  }

  function generateClientId() {
    var clientId = localStorage.getItem('clientId');
    if (!clientId) {
      // Generate a new client ID if not found
      clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      // Save the new client ID to localStorage
      localStorage.setItem('clientId', clientId);
    }
    return clientId;
  }

  function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
  }

  function displayUserMessage(message) {
    const time = new Date().toLocaleTimeString();
    const messageContent = `${message}`;
    const msg = createMessageElement('User44', messageContent, 'user-message', './user-icon.svg', time, 'user');
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.appendChild(msg);
    scrollToBottom(chatMessages);
  }

  function displaySystemMessage(message) {
    const time = new Date().toLocaleTimeString();
    const messageContent = `${message}`;
    const msg = createMessageElement('Double Black Transportation AI Agent', messageContent, 'system-message', './logo-lite.svg', time, 'system');
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.appendChild(msg);
    scrollToBottom(chatMessages);
  }

  function createMessageElement(sender, message, messageType, iconClass, time, messageId) {
    const msg = document.createElement("div");
    msg.classList.add(messageId);

    const messageDetails = document.createElement("div");
    messageDetails.classList.add('message-details');

    const icon = document.createElement("img");
    icon.setAttribute("src", iconClass);

    const senderName = document.createElement("span");
    senderName.textContent = sender; // Use textContent for better practice
    senderName.classList.add("message-sender");

    const text = document.createElement("div");
    text.innerHTML = message; // Assuming message may contain HTML, otherwise use textContent
    text.classList.add(messageType);

    const timestamp = document.createElement("span");
    timestamp.textContent = time;
    timestamp.classList.add("message-timestamp");

    // Feedback icons
    

    msg.appendChild(text);
    msg.appendChild(messageDetails);
    messageDetails.appendChild(icon);
    messageDetails.appendChild(senderName);
    messageDetails.appendChild(timestamp);
 

    return msg;
  }

  function displayLoading() {
    const loadingMsg = document.createElement("div");
    loadingMsg.classList.add("chat-message", "loading-message");
    loadingMsg.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    loadingMsg.id = "loading-message";
    document.getElementById("chat-messages").appendChild(loadingMsg);
  }

  function removeLoading() {
    const loadingElement = document.getElementById("loading-message");
    if (loadingElement) {
      loadingElement.remove();
    }
  }

  // Load SignalR script and then initialize chat widget
  loadScript("https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/3.1.9/signalr.min.js", initializeChatWidget);
})();
