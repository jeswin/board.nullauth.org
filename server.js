var express = require("express");
var page = require("./views/page");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser());

const tokens = [];

const messages = [
  { author: "jeswin", text: "The code's doing bad things today." },
  { author: "jeswin", text: "Welcome to the Sample Board." }
];

function getCredentials(strToken) {
  const token = strToken && tokens.find(t => t.id === strToken);
  return token
    ? { username: token.username, loggedIn: true }
    : { loggedIn: false };
}

app.get("/", function(req, res) {
  res.send(
    page({
      header: {
        title: `Message Board`,
        credentials: getCredentials(req.headers.token)
      },
      content: {
        html: `
        <ul>
          ${messages
            .map(
              msg =>
                `<li><a href="${msg.author}">${msg.author}</a>: ${
                  msg.text
                }</li>`
            )
            .join("")}
        </ul>
      `
      }
    })
  );
});

app.get("/register", (req, res) => {
  res.send(
    page({
      header: {
        title: `Register`
      },
      content: {
        html: `
        <form method="POST">
          <p>
            Choose username:<br />
            <input type="text" name="username" />
          </p>
          <p>
            Your public key:<br />
            <textarea rows="6" cols="50" name="publickey"></textarea>
          </p>
          <p>
            <input type="submit" value="Submit" />
          </p>
        </form>
      `
      }
    })
  );
});

app.get("/login", (req, res) => {
  res.send(
    page({
      header: {
        title: `Login`
      },
      content: {
        html: `
        <form method="POST">
          <p>
            Enter username:<br />
            <input type="text" name="username" />
          </p>
          <p>
            <input type="submit" value="Submit" />
          </p>
        </form>
      `
      }
    })
  );
});

app.post("/login", (req, res) => {
  res.send(
    page({
      header: {
        title: `Sign the following message`
      },
      content: {
        html: `
        <p style="padding:1em; background: #eee; border-radius: 4px">
          Login as ${req.body.username}@boards.nullauth.org at ${Date.now()}
        </p>
        <p>
          <button>Click to Sign</button>
        </p>
        <p>
          You need to have the <a href="#">nullauth browser extension</a> installed for signing to work.<br />
          Alternatively, see <a href="#">other options to sign</a>.
        </p>
        <form method="POST">
          <p>
            Paste signed message below:<br />
            <textarea rows="6" cols="50" name="publickey"></textarea>
          </p>
          <p>
          <input type="submit" value="Submit" />
          </p>
        </form>
      `
      }
    })
  );
});

app.get("/logout", (req, res) => {});

app.get("/update-key", (req, res) => {});

app.get("/messages", (req, res) => {});

app.post("/messages", (req, res) => {});

app.post("/api/tokens", (req, res) => {});

app.get("/api/:userid/messages", (req, res) => {});

app.listen(6001);
