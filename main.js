//fetch Selectrs
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function(){
    getRepos();
};

function getRepos(){
    if(theInput.value === ""){
        reposData.innerHTML = "<span>Please Write Githib Username</span>";
    }
    else{
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response)=>{
            return response.json();
        })
        .then((repos) => {
            //Empty The container
            reposData.innerHTML = "" ;
            //Loop on Repos 
            repos.forEach(repo => {
                // creat the Main Div Element 
                let mainDiv = document.createElement("div");
                // creat Repo Name Text 
                let repoName = document.createTextNode (repo.name);
                mainDiv.appendChild(repoName);
                // creat Repo URL 
                let theUrl = document.createElement("a");
                // creat Repo URL Text and add it on the URL
                let theUrlTxt = document.createTextNode("visit");
                theUrl.appendChild(theUrlTxt);
                // Add the Hypertext Reference "href"
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                //set Attribute Blank
                theUrl.setAttribute("target","_blank");
                //Apped URL Anchor to Main Div
                mainDiv.appendChild(theUrl);
                //creat Start count Span
                let startSpan = document.createElement("span");
                //creat the Start count Span text
                let starsText = document.createTextNode(`Start ${repo.stargazers_count}`);
                startSpan.appendChild(starsText)
                //Apped Start Span to Main Div
                mainDiv.appendChild(startSpan)
                //Add Class on Main Div
                mainDiv.className = "repo-box";
                // append main div to Container
                reposData.appendChild(mainDiv);
            });
        })
    }
}
