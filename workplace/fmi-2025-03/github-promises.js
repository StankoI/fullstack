const resultsDiv = document.getElementById("results");

function init(){
    fetch("/users.json")
    .then(userResp => {
        return userResp.json();
    }).then(users => {
        console.log(users);
        resultsDiv.innerHTML = users.reduce((acc,user) => 
            acc + `<li>${user.username}</li>`
        ,'')
        return users.map(user => user.username);
    }).then(usernames => 
        Promise.allSettled( 
            usernames.map(username => fetch(`https://api.github.com/users/${username}`)
            .then(resp => resp.json())
        )).then(gitresults =>{ 
            const gitusers = gitresults
            .filter(res => res.status === 'fulfilled')
            .map(res=>res.value)
            console.log(gitresults)
            return gitresults    
        })
    ).then(gitusers => {
        gitusers.map(gituser => {
            const img = new Image();
            img.src = gituser.avatar_url;
            resultsDiv.append(img)
            return img
        })
    })
}

init();