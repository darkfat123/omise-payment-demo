<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDZrajVmYnVsZjZ3YWNnNHEzZHpsZG5qZno2dWliMnQwOXM5ZzI5ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cjgfcZjWq7Tf4G2sYq/giphy.gif" alt="Logo" height="200">
  </a>

<h3 align="center">Omise Payment Demo</h3>

  <p align="center">
    A sample implementation of Omise payment integration supporting Thai QR PromptPay and automated credit/debit card transactions<br>
    <br />
    <br />
    <a href="https://github.com/darkfat123/typing-race-web-multiplayer/issues">🚨 Report Bug</a>
    ·
    <a href="https://github.com/darkfat123/typing-race-web-multiplayer/issues">✉️ Request Feature</a>
    .
    <a href="https://github.com/darkfat123/typing-race-web-multiplayer?tab=readme-ov-file#-getting-started-for-development-only">🚀 Getting Started</a>
  </p>
</div>
<img src="https://i.imgur.com/dBaSKWF.gif" height="30" width="100%">

<h3 align="left">✨ Features</h3>

- Thai QR PromptPay payments
- Automatic credit/debit card charging
- Payment status handling (success and failure)
- Error code mapping with user-friendly messages
- Test card information included
- Light/Dark UI mode depends on browser appearance setting


</br>
<img src="https://i.imgur.com/dBaSKWF.gif" height="30" width="100%">

<h3 align="left">🖥️ Programming languages and tools</h3>

- Backend
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=go" />
  </a>
</p>

- Frontend
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,next,ts,npm" />
  </a>
</p>

- Database
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=postgres" />
  </a>
</p>

- Tools
<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=git,github,vscode" />
  </a>
</p>

<img src="https://i.imgur.com/dBaSKWF.gif" height="30" width="100%">
<h3 align="left"> 📃 Pages</h3>

- Home
<p align="center">
 <img width="2542" height="1313" alt="image" src="https://github.com/user-attachments/assets/df0db4cd-089e-45a0-87d0-86abf41c05d0"/>
</p>
<br>

- Cart
<p align="center">
  <img width="2547" height="1317" alt="image" src="https://github.com/user-attachments/assets/d5f25284-d545-4d59-b380-ca0badd6869a" />

</p>
<br>

- Checkout
<p align="center">
  <img width="2559" height="1315" alt="image" src="https://github.com/user-attachments/assets/dacef623-171e-4899-b984-2484d714895e" />

</p>
<br>

- Payment Options
<p align="center">
  <img width="2559" height="1317" alt="image" src="https://github.com/user-attachments/assets/2f90f4e7-8a42-4946-9bd2-f47d8ba5ac04" />
</p>
<br>

- Thai QR Promptpay Payment
<p align="center">
  <img width="2559" height="1312" alt="image" src="https://github.com/user-attachments/assets/90a3db8b-0006-498c-a331-83400e36b866" />
</p>
<br>

- Card Payment
<p align="center">
  <img width="2559" height="1310" alt="image" src="https://github.com/user-attachments/assets/cd5baac8-73fc-4563-bccf-3812ef4eacbe" />
</p>
<br>

- Test Card Infomation Modal
<p align="center">
  <img width="931" height="538" alt="image" src="https://github.com/user-attachments/assets/9fc7856f-7670-43d5-8725-b0b0523cd8ab" />
  <img width="938" height="1304" alt="image" src="https://github.com/user-attachments/assets/315aca94-9956-4b2e-ac3a-93e52661888c" />
</p>
<br>

- Payment Successful
<p align="center">
  <img width="2559" height="1316" alt="image" src="https://github.com/user-attachments/assets/f6aa6c80-769c-4a6d-9e56-1c8bf49de5cd" />

</p>
</br>


<img src="https://i.imgur.com/dBaSKWF.gif" height="30" width="100%">

### 🚀 Getting Started (for development only)

#### 1. Clone the project
```bash
git clone https://github.com/darkfat123/omise-payment-demo.git
cd omise-payment-demo
```
#### 2. Frontend
```bash
cd web-ecommerce
npm install
npm run dev
```

#### 3. Backend
```bash
cd server
go mod tidy
go run cmd/main.go
```

#### 4. Environment Variables
```bash
# Backend - In `server/.env`
ALLOWED_ORIGIN=http://localhost:3000
PORT=8080
OMISE_PUBLIC_KEY={YOUR_OMISE_PUBLIC_KEY}
OMISE_SECRET_KEY={YOUR_OMISE_SECRET_KEY}
OMISE_CHARGE_URL=https://api.omise.co/charges
DATABASE_URL={YOUR_DATABASE_URL}

# Frontend - In `web-ecommerce/.env`
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```



<h3> Connect with me 🎊: <h3>
  <a href="https://www.linkedin.com/in/supakorn-yookack-39a730289/">
   <img align="left" alt="Supakorn Yookack | Linkedin" width="30px" src="https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg" />
  </a>
  <a href="mailto:supakorn.yookack@gmail.com">
    <img align="left" alt="Supakorn Yookack | Gmail" width="32px" src="https://www.vectorlogo.zone/logos/gmail/gmail-icon.svg" />
  </a>
  <a href="https://medium.com/@yookack_s">
    <img align="left" alt="Supakorn Yookack | Medium" width="32px" src="https://www.vectorlogo.zone/logos/medium/medium-tile.svg" />
  </a>
   <a href="https://www.facebook.com/supakorn.yookaek/">
    <img align="left" alt="Supakorn Yookack | Facebook" width="32px" src="https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg" />
  </a>
   <a href="https://github.com/darkfat123">
    <img align="left" alt="Supakorn Yookack | Github" width="32px" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" />
  </a>
    <p align="right" > Created by <a href="https://github.com/darkfat123">darkfat</a></p> <p align="right" > <img src="https://komarev.com/ghpvc/?username=darkfat123&label=Profile%20views&color=0e75b6&style=flat" alt="darkfat123" /> </p>
