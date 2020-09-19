# where-to-buy-nvidia-rtx-3080  (Canada only)
Scan availability of rtx-3080 from Amazon.ca, Bestbuy, Newegg, Canada Computers.
Open the browser when available.

### How to use
- Install Node.js and dependencies
  ```sh
  npm install # or yarn install
  ```
- Configure nodemailer in mailer.js
  ```js
  const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'username@gmail.com',
    pass: 'password'
  }
  });
  const send = async (text) => {
    await transporter.sendMail({
      from: '"Lester Lyu" <username@gmail.com>', // sender address
      to: "username@gmail.com, username@gmail.com", // list of receivers
      subject: "...", // Subject line
      html: text // html body
    });
  };
  ```
- Run
  ```sh
  node index.js
  ```
