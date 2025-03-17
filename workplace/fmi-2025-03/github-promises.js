
const resultsDiv = document.getElementById("results");
(function () {
    fetch("users.json")
        .then(usersResp => {
            return usersResp.json()
        }).then(users => {
            // console.log(users)
            // resultsDiv.innerHTML = users.reduce((acc, user) =>
            //     acc + `<li>${user.username}</li>`
            //     , '')
            return users.map(user => user.username)
        }).then(usernames =>
            Promise.allSettled(
                usernames.map(username =>
                    fetch(`https://api.github.com/users/${username}`)
                        .then(resp => resp.json())
                )).then(gitresults => {
                    const gitusers = gitresults
                        .filter(res => res.status === 'fulfilled')
                        .map(res => res.value)
                    console.log(gitusers)
                    return gitusers
                })
        ).then(gitusers => 
            gitusers.map(gituser => {
                const tmpImg = document.createElement("div");
                tmpImg.classList.add("image");
                tmpImg.style.backgroundImage = `url(${gituser.avatar_url})`;
                resultsDiv.appendChild(tmpImg);
                return tmpImg;
            })
        )
        .then(images =>{
            // TODO: remove images after 5 sec
            setTimeout(
                () => {
                    images.forEach((img) => {img.style.display = "none"})
                    console.log("images disappered")
                }, 5000)
            console.log(images)
        })
        // })
})()