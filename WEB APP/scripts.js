let app = document.getElementById('app');
let listOfUserData;

var showAllUsers = function(data) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users', true);
    request.onload = function() {
        let users = JSON.parse(this.response);
        listOfUserData = users;
        if (request.status == 200 && request.readyState == 4) { // If able to fetch from the API
            users.forEach(user => {
                let divBlock = document.createElement('div');
                divBlock.setAttribute('class', 'divBlock');

                let username = document.createElement('a');
                username.setAttribute('href', user.repos_url);
                username.innerHTML = user.login;
                username.style.fontStyle = "italic";
                username.style.letterSpacing = "3px";
                username.style.paddingLeft = "50px";
                username.style.color = "#ff0000";
          
                let followers = document.createElement('a');
                followers.setAttribute('href', user.followers_url);
                followers.innerHTML = "Followers";
                followers.style.fontStyle = "italic";
                followers.style.letterSpacing = "5px";
                followers.style.paddingLeft = "100px";
                followers.style.color = "#ff0000";
          
                let avatar = document.createElement('img');
                avatar.src = user.avatar_url;
                avatar.style.paddingBottom="50px";
                avatar.style.paddingTop="50px";
          
                app.appendChild(divBlock);
                divBlock.appendChild(username);
                divBlock.appendChild(followers);
                divBlock.appendChild(avatar);
            });
        }
    }
    request.send();
}

var filterUsers = function(event) {
    event.preventDefault();
    // Get the search terms from the input field
    var searchTerm = event.target.elements['search'].value;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.github.com/users', true);
    request.onload = function() {
        let users = JSON.parse(this.response);
        listOfUserData = users;
        if (request.status == 200 && request.readyState == 4) { 
            users.forEach(user => {
              if(user.login == searchTerm)
              {
                let divBlock = document.createElement('div');
                divBlock.setAttribute('class', 'divBlock');

                let username = document.createElement('a');
                username.setAttribute('href', user.repos_url);
                username.innerHTML = user.login;

                let followers = document.createElement('a');
                followers.setAttribute('href', user.followers_url);
                followers.innerHTML = "Followers";

                let avatar = document.createElement('img');
                avatar.src = user.avatar_url;

                app.appendChild(divBlock);
                divBlock.appendChild(username);
                divBlock.appendChild(followers);
                divBlock.appendChild(avatar);
              }
            });
          }
      }
      request.send();
};

document.addEventListener('submit', filterUsers);
document.addEventListener('reset', showAllUsers);


