// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯
const CLIENT_ID = 'b0ab0ca0fa59cde42aaf'
const CLIENT_SECRET = '329380f743da854fc8c4518bbde9915abc3b03e6'

// fetch(`http://api.github.com/users/andrew`)
// .then((res) => res.json())
// .then((profile) => console.log(profile))

//using await and async
// get the api data using name and atribute to get the profile 
async function getUser(name){
    const res = await fetch(`http://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
    const profile = await res.json()
    return profile
}

// get the api data logs of the repos from the profile data above
async function getrepos(profile){
    const res = await fetch(`${profile.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&per_page=10`)
    const repo = await res.json()

    return repo
}

// listen the the click event (search)
document.querySelector('#search').addEventListener('submit',async (e)=>{
    e.preventDefault(); // prevent the app from loading after clicking

    // get the input data
    const username = document.getElementById('findByUsername').value

    // check if the input data contains data
    if (username.length > 0){
      //set load style
      document.querySelector('.loader').style.display = 'block'
      // call the getuser function 
      const profile = await getUser(username)

      document.querySelector('.loader').style.display = 'none'
      if (profile.message === 'Not Found'){
        document.querySelector('.notFound').style.display = 'block'
        document.querySelector('.profile').style.display = 'none'
      }else{
        const repo = await getrepos(profile)
        showProfile(profile);
        showRepo(repo)
       document.querySelector('.notFound').style.display = 'none'
       document.querySelector('.profile').style.display = 'block'
      }
    }
})

//Function for profile
function showProfile(profile){
    document.querySelector('.profile').innerHTML = `
          <img
            src="${profile.avatar_url}"
          />
          <p class="name">"${profile.name}"</p>
          <p class="username login">"${profile.login}"</p>
          <p class="bio">
          "${profile.bio}"
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers">"${profile.followers}"</span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following">"${profile.following}"</span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            "${profile.company}"
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>"${profile.location}"
          </p>
        `
}

function showRepo(repos){
    let newHTML = '';
    for (let repo of repos){
        newHTML += 
        `
            <div class="repo">
              <div class="repo_name">
                <a href="${repo.html_url}">${repo.name}</a>
              </div>
              <p>
                <span class="circle"></span> ${repo.language}
                <ion-icon name="star-outline"></ion-icon> ${repo.watchers_count}
                <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
              </p>
            </div>
          `
        document.querySelector('.repos').innerHTML = newHTML
        document.querySelector('.repositories').style.display = 'block'
    }
}



/*
 <div class="profile">
          <img
            src="https://avatars3.githubusercontent.com/u/47313?s=400&u=7ba05204271a726f8642ac15864e2f361b5c0198&v=4"
            alt="letstrie"
          />
          <p class="name">Fabien Potencier</p>
          <p class="username login">fabpot</p>
          <p class="bio">
            Simplifying things for fun
          </p>

          <div class="followers-stars">
            <p>
              <ion-icon name="people-outline"></ion-icon>
              <span class="followers"> 10 </span> followers
            </p>
            <span class="dot">·</span>
            <p><span class="following"> 20 </span> following</p>
          </div>

          <p class="company">
            <ion-icon name="business-outline"></ion-icon>
            Symfony/Blackfire
          </p>
          <p class="location">
            <ion-icon name="location-outline"></ion-icon>Lille, France
          </p>
        </div>
*/