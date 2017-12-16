module.exports = function(header) {
  return `
    <h1>${header.title}</h1>
    ${
      header.credentials
        ? `${
            header.credentials.loggedIn
              ? `<div class="credentials">Logged in as ${
                  header.credentials.username
                }`
              : `You are not logged in. <a href="/register">Register</a> or <a href="/login">Login</a>`
          }`
        : ``
    }
    ${header.html ? `<header>${header.html}</header>` : ""}
  `;
};
