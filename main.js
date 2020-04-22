document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  // opened();

  const issue = { id, description, severity, assignedTo, status };

  if( issue.id !=='' && issue.description !== '' && issue.severity !== '' && issue.assignedTo !== '' && issue.status !== ''){
    // console.log(issue);
    let issues = [];
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
  }
}

// function opened(count){
//     let opened = document.getElementById("opened");
//     count = parseInt(opened.innerText); 
//     if( count >= 0){
//       opened.innerText = count + 1;
//     }
// }

//let close = document.getElementById("close");

//close.addEventListener('click',closeIssue());

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  //console.log(id);
  // console.log(issues);
  const currentIssue = issues.find(issue => parseInt(issue.id) === id);
  // console.log(currentIssue);
  currentIssue.status = 'Closed';
  // console.log(issues);
  localStorage.setItem('issues', JSON.stringify(issues));
  // closed();
  fetchIssues();
}

// function closed(){
//   let closed = document.getElementById("closed");

//   closedItems = JSON.parse(localStorage.getItem('issues'));

//   let count = closedItems.length;

//   closed.innerText = count;
// }

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => parseInt(issue.id) !== id )
  console.log(remainingIssues);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));

  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  if(issues !== null){
    let openedIssues = issues.filter(issue => issue.status !== "Closed");
    let closedIssues = issues.filter(issue => issue.status === "Closed");

    let openedIssuesQuantity = openedIssues.length;
    let closedIssuesQuantity = closedIssues.length;

    let opened = document.getElementById("opened");
    let closed = document.getElementById("closed");

    opened.innerText = openedIssuesQuantity;
    closed.innerText = closedIssuesQuantity;
  }

  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {

    const {id, description, severity, assignedTo, status} = issues[i];
    // when we click Close button for update description and status then  code of line 78 to 80 will be executed

    let explanation = `<h3> ${description} </h3>`

    if( status === "Closed"){
          explanation = `<h3> <strike> ${description} </strike> </h3>`
    }

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              ${explanation}
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
