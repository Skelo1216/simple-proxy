const VALID_EMAIL = 'esposito.logan7@gmail.com';
const VALID_PASSWORD = 'Logan1216!';

const html = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Sign in | Meridian Bank</title>
<script>
  if (localStorage.getItem('moneyAuth') === 'true') {
    window.location.replace('/money');
  }
</script>
<style>
  :root {
    color-scheme: light;
    --brand: #0057b8;
    --brand-dark: #00397d;
    --bg: #f2f4f7;
    --card: #ffffff;
    --border: #e1e5ea;
    --text: #1b1f23;
    --muted: #5b6470;
    --red: #c0272d;
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
  .login-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  .login-card {
    width: 100%;
    max-width: 380px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 32px 28px;
    box-shadow: 0 8px 30px rgba(20,24,28,0.06);
  }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 24px;
  }
  .brand-mark {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: var(--brand);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 17px;
  }
  .brand-name {
    font-weight: 700;
    font-size: 18px;
  }
  h1 {
    font-size: 20px;
    text-align: center;
    margin: 0 0 4px;
  }
  p.sub {
    color: var(--muted);
    text-align: center;
    margin: 0 0 26px;
    font-size: 14px;
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
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 14px;
    color: var(--text);
    font-size: 15px;
    outline: none;
  }
  input:focus {
    border-color: var(--brand);
    box-shadow: 0 0 0 3px rgba(0,87,184,0.12);
  }
  .error {
    color: var(--red);
    font-size: 13px;
    margin: 0 0 14px;
    min-height: 16px;
  }
  button.submit {
    width: 100%;
    background: var(--brand);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 13px 0;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 6px;
  }
  button.submit:hover {
    background: var(--brand-dark);
  }
</style>
</head>
<body>
<div class="login-wrap">
  <div class="login-card">
    <div class="brand">
      <span class="brand-mark">M</span>
      <span class="brand-name">Meridian Bank</span>
    </div>
    <h1>Sign in</h1>
    <p class="sub">Access your online banking account.</p>
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
      <button class="submit" type="submit">Sign in</button>
    </form>
  </div>
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
