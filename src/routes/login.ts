const VALID_EMAIL = 'esposito.logan7@gmail.com';
const VALID_PASSWORD = 'Logan1216!';

const html = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Log in - Money</title>
<script>
  if (localStorage.getItem('moneyAuth') === 'true') {
    window.location.replace('/money');
  }
</script>
<style>
  :root {
    color-scheme: dark;
    --bg: #000000;
    --card: #1c1c1e;
    --text: #ffffff;
    --muted: #9a9a9e;
    --pill: #3a3a3c;
    --green: #00d54b;
    --red: #ff5b5b;
  }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  html, body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    height: 100%;
  }
  #app {
    max-width: 420px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 24px;
  }
  h1 {
    font-size: 30px;
    font-weight: 700;
    margin: 0 0 6px;
  }
  p.sub {
    color: var(--muted);
    margin: 0 0 32px;
    font-size: 15px;
  }
  label {
    display: block;
    font-size: 13px;
    color: var(--muted);
    margin: 0 0 6px;
    font-weight: 600;
  }
  .field {
    margin-bottom: 16px;
  }
  input {
    width: 100%;
    background: var(--card);
    border: 1px solid #2c2c2e;
    border-radius: 14px;
    padding: 14px 16px;
    color: var(--text);
    font-size: 16px;
    outline: none;
  }
  input:focus {
    border-color: var(--green);
  }
  .error {
    color: var(--red);
    font-size: 14px;
    margin: 0 0 16px;
    min-height: 18px;
  }
  button.submit {
    width: 100%;
    background: var(--green);
    color: #012a10;
    border: none;
    border-radius: 999px;
    padding: 15px 0;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 8px;
  }
  button.submit:active {
    opacity: 0.8;
  }
</style>
</head>
<body>
<div id="app">
  <h1>Money</h1>
  <p class="sub">Log in to view your balance.</p>
  <form id="loginForm" novalidate>
    <div class="field">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="username" placeholder="you@example.com" />
    </div>
    <div class="field">
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" placeholder="Password" />
    </div>
    <p class="error" id="error"></p>
    <button class="submit" type="submit">Log in</button>
  </form>
</div>

<script>
(function () {
  var form = document.getElementById('loginForm');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var errorEl = document.getElementById('error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = emailInput.value.trim();
    var password = passwordInput.value;

    if (email === ${JSON.stringify(VALID_EMAIL)} && password === ${JSON.stringify(VALID_PASSWORD)}) {
      localStorage.setItem('moneyAuth', 'true');
      window.location.replace('/money');
    } else {
      errorEl.textContent = 'Incorrect email or password.';
    }
  });
})();
</script>
</body>
</html>
`;

export default defineEventHandler((event) => {
  event.node.res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return html;
});
