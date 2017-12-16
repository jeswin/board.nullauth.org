const headerView = require("./header");
const contentView = require("./content");
const footerView = require("./footer");

module.exports = function({ header, content, footer }) {
  return `
    <html>
      <body style="width:600px">
        ${header ? headerView(header) : ""}
        ${contentView(content)}
        ${footer ? footerView(footer) : ""}
      </body>
    </html>
  `;
};
