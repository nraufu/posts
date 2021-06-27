/**
 * ---------------------------------------------------------------------
 * Retrieve Users && list users
 * ---------------------------------------------------------------------
 */
var usersContainer = document.querySelector("#users");
var errorContainer = document.querySelector("#error");

function createUsersList(usersList) {
  usersContainer.innerHTML = `
    ${usersList
      .map(function (user) {
        return `
        <div class="user">
        <span class="user__icon"><i class="lnr lnr-user"></i></span>
            <div class="user__details">
                <span> <i class="lnr lnr-smile"></i> ${user.name}</span>
                <span><i class="lnr lnr-envelope"></i> ${user.email}</span>
            </div>
            <a href="posts.html?userId=${user.id}&&name=${user.name}" class="btn btn-primary">View My Posts</a>
        </div>
        `;
      })
      .join(" ")}
    `;
}

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => createUsersList(json))
    .catch(
      (e) =>
        (errorContainer.innerHTML =
          "<p>Oops Something Went Wrong! Check your Network Connection</p>")
    );
}

if (usersContainer) {
  fetchUsers();
}

/**
 * ---------------------------------------------------------------------
 * Retrieve user's posts
 * ---------------------------------------------------------------------
 */

var urlParams = new URLSearchParams(window.location.search);
var userId = urlParams.get("userId");
var userName = urlParams.get("name");
var postsContainer = document.querySelector("#posts");

function createPostsList(postsList) {
  postsContainer.innerHTML = `
      <a href="index.html" class="btn btn-link"><i class="lnr lnr-chevron-left-circle"></i> Go Back</a>
  
      <h6 class="user-name">"${userName}" Posts</h6>
  
      ${postsList
        .map(function (post) {
          return `
          <div class="post">
              <h4 class="post__title">${post.title}</h4>
              <p class="post__body">${post.body}</p>
          </div>
          `;
        })
        .join(" ")}
      `;
}

function fetchUserPosts() {
  if (!userId) {
    errorContainer.innerHTML =
      "<p>Oops Something Went Wrong! Posts can't be retrieved</p>";
  }

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((response) => response.json())
    .then((json) => createPostsList(json))
    .catch(
      (e) =>
        (errorContainer.innerHTML =
          "<p>Oops Something Went Wrong! Check your Network Connection</p>")
    );
}

if (postsContainer) {
  fetchUserPosts();
}

/**
 * ---------------------------------------------------------------------
 * Preloading effect
 * ---------------------------------------------------------------------
 */
function removePreloader() {
  var preloadContainer = document.querySelector(".preloader");
  setTimeout(function () {
    preloadContainer.style.opacity = 0;
    preloadContainer.style.visibility = "hidden";
  }, 800);
}

removePreloader();
