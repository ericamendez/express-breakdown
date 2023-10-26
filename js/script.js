let currentPage = 1

const content = {
    step1: {
        innerHTML: `<h3>Step 1:</h3>
        <h4>How The Server Gets Built</h4>
        <p>Run the server by using <span class="red">"node server.js"</span> command in the terminal</p>
        <img class="fullImg" src="images/step1.png">
        <p>Before we run line by line, all global variables (var, let, const) and function declarations get stored
          in global memory (just declarations not initilization)
        </p>
        <img class="smallerImg" src="images/global1.jpeg">
        <p>
          Now Javascript gets ran line by line, initializing those variables and storing their values
        </p>
        <img class="smallerImg" src="images/global2.jpeg">
        <p>It stops at this line</p>
        <img class="lineImg" src="images/listen.png">
        <p>Our server is now running and listening for user to go to port 3000</p>
        <p>This listen method is taking 2 arguments: port number, and a callback telling it what to do when the user goes to that port</p>
        `,
        highlightLine: [1, 2, 3, 4, 5, 6, 7, 8]
    },
    step2: {
        innerHTML: `<h3>Step 2:</h3>
        <p>
          User goes to localhost:3000 in browser, our node server heard that and now continues running the highlighted
          lines
        </p>
        <img class="lineImg" src="images/url.png">
        <p>This code then get ran to connect to our MongoDB database. All details in <a href="https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html#connect">MongoDB Docs</a></p>
        <img class="fullImg" src="images/mongo.png">
        <p>But now in this line</p>
        <img class="lineImg" src="images/db.png">
        <p>We are storing an instance of our database in the empty global db variable we declared before </p>
        <p>This now gives us access to all sorts of methods that give us access to our database</p>
        `,
        highlightLine: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    step3: {
        innerHTML: `<h3>Step 3:</h3>
        <p>These first highlighted four lines are configuring express:</p>
        <img class="lineImg" src="images/ejs.png">
        <p>Configures express to use EJS view engine</p>
        <img class="lineImg" src="images/bodyParser.png">
        <p>Middleware handling different types of incoming data from client requests</p>
        <img class="lineImg" src="images/public.png">
        <p>This is setting Express.js application to serve static files from a directory named 'public' giving access to css, js in this folder</p>
        <p>The browser then immediatly calls the root path meaning we immediately run: </p>
        <img class="fullImg" src="images/get.png">
        <p>& render our root page</p>
        <img class="fullImg" src="images/savage-browser.png">
        `,
        highlightLine: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
    }
}

function addPage(){
    let getContent = content[`step${currentPage}`]
    document.querySelector('#pages').innerHTML = getContent.innerHTML
    console.log(getContent.highlightLine)
    getContent.highlightLine.forEach(lineNum => {
        let id = document.querySelector(`#line${lineNum}`)
        id.classList.add("highlight-container")
    });
}

function removePrevHighlights(){
    let getPrevLines = content[`step${currentPage}`].highlightLine
    getPrevLines.forEach(lineNum => {
        let id = document.querySelector(`#line${lineNum}`)
        id.classList.remove("highlight-container")
    })
}

function nextPage(){
    removePrevHighlights()
    currentPage++
    addPage()
}

function prevPage(){
    removePrevHighlights()
    currentPage--
    addPage()
}

function navigation(){
    Object.keys(content).forEach(key => {
        console.log(key)
        let span = document.createElement('span')
        let a = document.createElement('a')
        a.href = '#'
        let li = document.createElement('li')

        a.appendChild(span)
        li.appendChild(a)
        document.querySelector('.navigation').appendChild(li)
    })
}

addPage()
navigation()

document.querySelector('#next').addEventListener('click', nextPage)
document.querySelector('#prev').addEventListener('click', prevPage)