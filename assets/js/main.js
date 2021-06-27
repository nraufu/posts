/**
 * ---------------------------------------------------------------------
 * Retrieve Users && list users
 * ---------------------------------------------------------------------
 */

function fetchUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => createUsersList(json))
    .catch((e) => document.getElementById("error").innerHTML="<p>Users Not Retrieved! Check your Network Connection</p>");
}

fetchUsers();

function createUsersList(usersList) {
  document.getElementById("users").innerHTML = `
  ${usersList.map(function (user) {
    return `
      <div class="user">
          <i class="lnr lnr-user user__icon"></i>
          <div class="user__details">
              <span><b>Name:</b> ${user.name}</span>
              <span><b>Email:</b> ${user.email}</span>
          </div>
          <a href="#" class="btn btn-primary">View My Posts</a>
      </div>
      `;
  })}
  `;
}
