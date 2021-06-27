/**
 * ---------------------------------------------------------------------
 * Retrieve Users && list users
 * ---------------------------------------------------------------------
 */

var usersContainer = document.getElementById("users");

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => createUsersList(json))
    .catch((e) => document.getElementById("error").innerHTML="<p>Users Not Retrieved! Check your Network Connection</p>");
}

if (usersContainer) {
    fetchUsers();
}


function createUsersList(usersList) {
  usersContainer.innerHTML = `
  ${usersList.map(function (user) {
    return `
      <div class="user">
          <i class="lnr lnr-user user__icon"></i>
          <div class="user__details">
              <span> <i class="lnr lnr-smile"></i> ${user.name}</span>
              <span><i class="lnr lnr-envelope"></i> ${user.email}</span>
          </div>
          <a href="posts.html?userId=${user.id}&&name=${user.name}" class="btn btn-primary">View My Posts</a>
      </div>
      `;
  })}
  `;
}


/**
 * ---------------------------------------------------------------------
 * Retrieve user's posts
 * ---------------------------------------------------------------------
 */

 var urlParams = new URLSearchParams(window.location.search);
 var userId = urlParams.get("userId");
 var userName = urlParams.get("name");
var postsContainer = document.getElementById("posts");

function fetchUserPosts() {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((json) => createPostsList(json))
    .catch((e) => console.log(e));
}

if (postsContainer) {
    fetchUserPosts();
}

function createPostsList(postsList) {
    postsContainer.innerHTML = `
    <a href="index.html" class="btn btn-link"><i class="lnr lnr-chevron-left-circle"></i> Go Back</a>

    <h6 class="user-name">${userName} Posts</h6>

    ${postsList.map(function (post) {
      return `
        <div class="post">
            <h4 class="post__title">${post.title}</h4>
            <p class="post__body">${post.body}</p>
        </div>
        `;
    })}
    `;
}
