let currentPage = 1

const content = {
    step1: {
        innerHTML: `<h3>Step 1</h3>
        <p>Before we run line by line, all global variables (var, let, const) and function declarations get stored
          in global memory (just declarations not initilization)
        </p>
        <p>
          Now Javascript knows those variables exist in global memory.
        </p>`,
        highlightLine: [1, 2, 3, 4, 5, 6, 7]
    },
    step2: {
        innerHTML: [ `Then we go line by line initializing each constant so now they hold a value`],
        highlightLine: []
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

addPage()

// document.querySelector('code').addEventListener("mouseover", (event) => {
//     console.log('hi')
//     // document.querySelector('#line1').style = 'background:rgba(255,255,0,0.3)'
// })