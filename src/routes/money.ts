const html = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Meridian Bank | Accounts</title>
<script>
  if (localStorage.getItem('moneyAuth') !== 'true') {
    window.location.replace('/login');
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
    --green: #12833f;
    --red: #c0272d;
  }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  html, body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  a { text-decoration: none; }

  .topbar {
    background: var(--brand-dark);
    color: #fff;
  }
  .topbar-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 28px;
    padding: 14px 20px;
    flex-wrap: wrap;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-right: auto;
  }
  .brand-mark {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #ffffff;
    color: var(--brand-dark);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 16px;
  }
  .brand-name {
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 0.2px;
  }
  .topnav-links {
    display: flex;
    gap: 22px;
  }
  .nav-link {
    color: #cfe0f5;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 4px;
    border-bottom: 2px solid transparent;
  }
  .nav-link.active {
    color: #fff;
    border-bottom-color: #fff;
  }
  .signout-link {
    background: none;
    border: 1px solid rgba(255,255,255,0.4);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 6px;
    cursor: pointer;
  }
  .signout-link:hover { background: rgba(255,255,255,0.08); }

  .content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 28px 20px 60px;
  }
  .page-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
  }
  .page-head h1 {
    font-size: 24px;
    margin: 0;
  }
  .total-balance {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }
  .total-label {
    color: var(--muted);
    font-size: 13px;
  }
  .total-value {
    font-size: 18px;
    font-weight: 700;
  }

  .account-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 22px;
    margin-bottom: 20px;
  }
  .account-card.primary {
    border-top: 4px solid var(--brand);
  }
  .account-card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .account-name {
    font-weight: 700;
    font-size: 15px;
  }
  .account-mask {
    color: var(--muted);
    font-size: 12px;
    margin-top: 2px;
  }
  .details-link {
    color: var(--brand);
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
  }
  .account-balance {
    font-size: 38px;
    font-weight: 700;
    margin: 6px 0 20px;
    letter-spacing: -0.5px;
    transition: opacity 0.15s ease;
  }
  .account-balance.flash { opacity: 0.35; }
  .account-actions {
    display: flex;
    gap: 10px;
  }
  .btn {
    border-radius: 6px;
    padding: 11px 22px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid transparent;
  }
  .btn-primary {
    background: var(--brand);
    color: #fff;
  }
  .btn-primary:hover { background: var(--brand-dark); }
  .btn-outline {
    background: #fff;
    color: var(--brand);
    border-color: var(--brand);
  }
  .btn-outline:hover { background: #eef4fc; }
  .btn.full { width: 100%; }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .tile-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 16px;
  }
  .account-card.small {
    margin-bottom: 0;
    padding: 18px;
  }
  .tile-value {
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
  }
  .tile-sub {
    color: var(--muted);
    font-size: 12px;
    margin-top: 2px;
  }
  .tile-sub.down { color: var(--red); }
  .sparkline { width: 100%; height: 32px; margin-top: 8px; }

  /* Modal */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(20,24,28,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease;
    z-index: 10;
    padding: 16px;
  }
  .overlay.open { opacity: 1; pointer-events: auto; }
  .sheet {
    width: 100%;
    max-width: 380px;
    background: #fff;
    border-radius: 12px;
    padding: 26px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.25);
    transform: translateY(10px) scale(0.98);
    transition: transform 0.15s ease;
  }
  .overlay.open .sheet { transform: translateY(0) scale(1); }
  .sheet h2 {
    margin: 0 0 4px;
    font-size: 18px;
  }
  .sheet p.hint {
    margin: 0 0 18px;
    color: var(--muted);
    font-size: 11px;
  }
  .amount-input-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 22px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 14px;
  }
  .amount-input-wrap .sign {
    font-size: 30px;
    font-weight: 700;
    color: var(--muted);
  }
  .amount-input-wrap input {
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 40px;
    font-weight: 700;
    width: 220px;
    text-align: center;
  }
  .sheet-actions {
    display: flex;
    gap: 10px;
  }
  .sheet-actions .btn { flex: 1; }
  .btn-confirm.withdraw {
    background: var(--red);
  }
  .btn-confirm.withdraw:hover { background: #931d22; }
  .btn-cancel {
    background: #fff;
    color: var(--text);
    border-color: var(--border);
  }
  .btn-cancel:hover { background: #f5f6f8; }

  .toast {
    position: fixed;
    top: 18px;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    background: #1b1f23;
    color: #fff;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    opacity: 0;
    pointer-events: none;
    transition: all 0.25s ease;
    z-index: 20;
    white-space: nowrap;
  }
  .toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  @media (max-width: 560px) {
    .topnav-links { display: none; }
    .account-balance { font-size: 32px; }
  }
</style>
</head>
<body>
<div id="app">
  <nav class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <span class="brand-mark">M</span>
        <span class="brand-name">Meridian Bank</span>
      </div>
      <div class="topnav-links">
        <span class="nav-link active">Accounts</span>
        <span class="nav-link">Pay &amp; transfer</span>
        <span class="nav-link">Plan &amp; track</span>
      </div>
      <button class="signout-link" id="logoutBtn">Sign out</button>
    </div>
  </nav>

  <main class="content">
    <div class="page-head">
      <h1>Accounts</h1>
      <div class="total-balance">
        <span class="total-label">Total balance</span>
        <span class="total-value" id="totalBalance">$0.00</span>
      </div>
    </div>

    <section class="account-card primary">
      <div class="account-card-head">
        <div>
          <div class="account-name">Everyday Checking</div>
          <div class="account-mask">Account &bull;&bull;&bull;&bull; 4471</div>
        </div>
        <a class="details-link" href="#">Account details &rsaquo;</a>
      </div>
      <div class="account-balance" id="balance">$0.00</div>
      <div class="account-actions">
        <button class="btn btn-primary" id="depositBtn">Deposit</button>
        <button class="btn btn-outline" id="withdrawBtn">Withdraw</button>
      </div>
    </section>

    <div class="tile-grid">
      <section class="account-card small">
        <div class="account-card-head">
          <div class="account-name">Savings</div>
          <a class="details-link" href="#">&rsaquo;</a>
        </div>
        <div class="tile-value">$0.00</div>
        <div class="tile-sub">0.01% APY</div>
      </section>

      <section class="account-card small">
        <div class="account-card-head">
          <div class="account-name">Investing</div>
          <a class="details-link" href="#">&rsaquo;</a>
        </div>
        <svg class="sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
          <polyline points="0,10 6,14 12,8 18,16 24,12 30,18 36,14 42,20 48,15 54,19 60,13 66,17 72,12 78,16 84,10 90,14 96,9 100,12" fill="none" stroke="#0057b8" stroke-width="1.6" />
        </svg>
        <div class="tile-value">$49,151.45</div>
        <div class="tile-sub down">&darr; 0.89% today</div>
      </section>

      <section class="account-card small">
        <div class="account-card-head">
          <div class="account-name">Credit Card</div>
          <a class="details-link" href="#">&rsaquo;</a>
        </div>
        <div class="tile-value">$0.00</div>
        <div class="tile-sub">Current balance</div>
      </section>

      <section class="account-card small">
        <div class="account-card-head">
          <div class="account-name">Auto Loan</div>
          <a class="details-link" href="#">&rsaquo;</a>
        </div>
        <div class="tile-value">&mdash;</div>
        <div class="tile-sub">No active loan</div>
      </section>
    </div>
  </main>
</div>

<div class="overlay" id="overlay">
  <div class="sheet">
    <h2 id="sheetTitle">Deposit</h2>
    <p class="hint" id="sheetHint">This is fake money for demo purposes only.</p>
    <div class="amount-input-wrap">
      <span class="sign">$</span>
      <input id="amountInput" inputmode="decimal" placeholder="0.00" autocomplete="off" />
    </div>
    <div class="sheet-actions">
      <button class="btn btn-cancel" id="cancelBtn">Cancel</button>
      <button class="btn btn-primary btn-confirm" id="confirmBtn" disabled>Confirm</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
(function () {
  var STORAGE_KEY = 'fakeMoneyBalance';
  var DEFAULT_BALANCE = 103928.00;

  var balanceEl = document.getElementById('balance');
  var totalBalanceEl = document.getElementById('totalBalance');
  var overlay = document.getElementById('overlay');
  var sheetTitle = document.getElementById('sheetTitle');
  var sheetHint = document.getElementById('sheetHint');
  var amountInput = document.getElementById('amountInput');
  var confirmBtn = document.getElementById('confirmBtn');
  var cancelBtn = document.getElementById('cancelBtn');
  var toast = document.getElementById('toast');

  var mode = null; // 'deposit' | 'withdraw'

  function loadBalance() {
    var stored = localStorage.getItem(STORAGE_KEY);
    var value = stored === null ? DEFAULT_BALANCE : parseFloat(stored);
    return isNaN(value) ? DEFAULT_BALANCE : value;
  }

  function formatMoney(n) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function render(balance) {
    balanceEl.textContent = formatMoney(balance);
    totalBalanceEl.textContent = formatMoney(balance);
  }

  function saveBalance(balance) {
    localStorage.setItem(STORAGE_KEY, String(balance));
  }

  function flashBalance() {
    balanceEl.classList.add('flash');
    setTimeout(function () { balanceEl.classList.remove('flash'); }, 150);
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 1800);
  }

  function openSheet(kind) {
    mode = kind;
    amountInput.value = '';
    confirmBtn.disabled = true;
    if (kind === 'deposit') {
      sheetTitle.textContent = 'Deposit';
      sheetHint.textContent = 'This is fake money for demo purposes only.';
      confirmBtn.textContent = 'Deposit';
      confirmBtn.classList.remove('withdraw');
    } else {
      sheetTitle.textContent = 'Withdraw';
      sheetHint.textContent = 'This is fake money for demo purposes only.';
      confirmBtn.textContent = 'Withdraw';
      confirmBtn.classList.add('withdraw');
    }
    overlay.classList.add('open');
    setTimeout(function () { amountInput.focus(); }, 150);
  }

  function closeSheet() {
    overlay.classList.remove('open');
    mode = null;
  }

  amountInput.addEventListener('input', function () {
    var raw = amountInput.value.replace(/[^0-9.]/g, '');
    var parts = raw.split('.');
    if (parts.length > 2) raw = parts[0] + '.' + parts.slice(1).join('');
    amountInput.value = raw;
    var val = parseFloat(raw);
    confirmBtn.disabled = !(val > 0);
  });

  cancelBtn.addEventListener('click', closeSheet);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeSheet();
  });

  confirmBtn.addEventListener('click', function () {
    var amount = parseFloat(amountInput.value);
    if (!(amount > 0)) return;
    var balance = loadBalance();

    if (mode === 'deposit') {
      balance += amount;
      saveBalance(balance);
      render(balance);
      flashBalance();
      showToast('Deposited ' + formatMoney(amount));
    } else if (mode === 'withdraw') {
      if (amount > balance) {
        showToast("Can't withdraw more than your balance");
        return;
      }
      balance -= amount;
      saveBalance(balance);
      render(balance);
      flashBalance();
      showToast('Withdrew ' + formatMoney(amount));
    }
    closeSheet();
  });

  document.getElementById('depositBtn').addEventListener('click', function () { openSheet('deposit'); });
  document.getElementById('withdrawBtn').addEventListener('click', function () { openSheet('withdraw'); });

  document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('moneyAuth');
    window.location.replace('/login');
  });

  render(loadBalance());
})();
</script>
</body>
</html>
`;

export default defineEventHandler((event) => {
  event.node.res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return html;
});
