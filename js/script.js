let nav = document.querySelector('.navigation')

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
        <p>This code then gets ran to connect to our MongoDB database. All details in <a href="https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html#connect">MongoDB Docs</a></p>
        <img class="fullImg" src="images/mongo.png">
        <p>But now in this line</p>
        <img class="lineImg" src="images/db.png">
        <p>We are storing an instance of our database in the empty global db variable we declared before </p>
        <p>This now gives us all sorts of methods that give us access to our MongoDB database</p>
        `,
        highlightLine: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    step3: {
        innerHTML: `<h3>Step 3:</h3>
        <p>The first highlighted four lines are configuring Express</p>
        <p>The browser then immediatly calls the root path "/" meaning we immediately run: </p>
        <img class="fullImg" src="images/get.png">
        <p>& render our root page</p>
        <img class="fullImg" src="images/savage-browser.png">
        <p>Breaking down the get:</p>
        <img class="fullImg" src="images/collection.png">
        <p>This finds the collection you want to "get" <a href="https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find">MongoDB Docs</a>
        and stores the results in your result parameter</p>
        <img class="fullImg" src="images/render.png">
        <p>Then this line renders your index.ejs file onto the browser, & sends your frontend (ejs) the results stored in the messages key</p>
        `,
        highlightLine: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
    },
    step4: {
        innerHTML: `<h3>Step 4: </h3>
        <p>These lines now act kind of like event listeners, where they are listening for these paths being called from the browser</p>
        <p>Once they are called, node can run the callbacks passed in</p>
        <img class="lineImg" src="images/reqres.png">
        <p>The "req" parameter holds information about the client's HTTP request to your Express application (this will be the information passed by your clientside  fetch())</p>
        <p>The "res" parameter will hold information and methods for constructing and sending an HTTP response back to the client</p>
        `,
        highlightLine: [22, 28, 35, 48]
    },
    step5: {
        innerHTML: `<h3>Step 5: </h3>
        <p>"db" is the variable holding our MongoDB instance that gives us methods we can use to access our database</p>
        <p>"collection()" is a method we got from ^ that lets us get a specific collection in our database. In this case we are grabbing the "messages" collection</p>
        <p>then we can use various methods on that </p>
        <p>find()</p>
        <p>insertOne()</p>
        <p>findOneAndUpdate()</p>
        <p>findOneAndDelete()</p>
        <p>Are all methods given to us that allow us to view and update our database. 
        More info on how to use these methods, and what you need to pass can be found here <a href="https://www.mongodb.com/docs/manual/reference/method/js-collection/">MongoDB Docs</a>
        </p>
        `,
        highlightLine: [23, 29, 36, 49]
    },
    step6: {
        innerHTML: `<h3>Step 6: </h3>
        <p>Then these lines are how we respond back to the client.</p>
        <p>"res.render()" will render the ejs page on your browser, and pass ejs whatever information you want to show on your clientside </p>
        <p>"res.redirect()" will redirect you to the page you pass in</p>
        <p>"res.send()" sends the message to the terminal</p>
        `,
        highlightLine: [25, 32, 45, 51]
    },
    step7: {
        innerHTML: `<h3>Data Flow Between Server and Client: </h3>`,
        highlightLine: []
    }
}

function addPage(){
    let getContent = content[`step${currentPage}`]
    document.querySelector('#pages').innerHTML = getContent.innerHTML
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
    if(currentPage < Object.keys(content).length){
        nav.children[currentPage-1].children[0].classList.remove('selected')
        nav.children[currentPage].children[0].classList.add('selected')
        currentPage++
    }else{
        nav.children[Object.keys(content).length-1].children[0].classList.remove('selected')
        nav.children[0].children[0].classList.add('selected')
        currentPage = 1
    }
    renderDataFlowPage()
    addPage()
}

function prevPage(){
    removePrevHighlights()
    if(currentPage > 1){
        currentPage--
        nav.children[currentPage].children[0].classList.remove('selected')
        nav.children[currentPage-1].children[0].classList.add('selected')
    }else{
        nav.children[0].children[0].classList.remove('selected')
        nav.children[Object.keys(content).length-1].children[0].classList.add('selected')
        currentPage = Object.keys(content).length
    }
    renderDataFlowPage()
    addPage()
}

function navigation(){
    Object.keys(content).forEach((key, i) => {
        let span = document.createElement('span')
        span.value = i+1
        let a = document.createElement('a')
        a.value = i+1
        a.href = '#'
        let li = document.createElement('li')
        li.value = i+1

        a.appendChild(span)
        li.appendChild(a)
        nav.appendChild(li)
    })
    nav.children[0].children[0].classList.add('selected')
}

function selectedPage(e){
    removePrevHighlights()
    document.querySelector('.selected').classList.remove('selected')
    e.target.parentNode.classList.add('selected')
    currentPage = e.target.value
    renderDataFlowPage()
    addPage()
}

function renderDataFlowPage(){
    if(currentPage === 7){
        document.querySelector("pre").classList.add('hide')
    }else{
        document.querySelector("pre").classList.remove('hide')
    }
}

addPage()
navigation()


document.querySelector('#next').addEventListener('click', nextPage)
document.querySelector('#prev').addEventListener('click', prevPage)
document.querySelector('.navigation').addEventListener('click', selectedPage)

document.body.addEventListener('keydown', function(event){ 
    const key = event.key; 
    switch (key) { 
        case "ArrowLeft": 
            prevPage()
            break; 
        case "ArrowRight": 
            nextPage()
            break; 
    } 
})

// let extra = `<img class="lineImg" src="images/ejs.png">
// <p class="smallerFont">Configures express to use EJS view engine</p>
// <img class="lineImg" src="images/bodyParser.png">
// <p class="smallerFont">Middleware handling different types of incoming data from client requests</p>
// <img class="lineImg" src="images/public.png">
// <p class="smallerFont">This is setting Express.js application to serve static files from a directory named 'public' giving access to css, js in this folder</p>`