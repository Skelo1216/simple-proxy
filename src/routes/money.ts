const html = /* html */ `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<title>Money</title>
<style>
  :root {
    color-scheme: dark;
    --bg: #000000;
    --card: #1c1c1e;
    --card-2: #232325;
    --text: #ffffff;
    --muted: #9a9a9e;
    --pill: #3a3a3c;
    --green: #00d54b;
    --purple: #b968ff;
    --blue: #58c8f2;
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
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 20px 16px 90px;
  }
  header.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  header.top h1 {
    font-size: 34px;
    font-weight: 700;
    margin: 0;
  }
  .icon-btn {
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .balance-card {
    background: linear-gradient(180deg, var(--card) 0%, var(--card-2) 100%);
    border-radius: 22px;
    padding: 20px 20px 24px;
    margin-bottom: 14px;
  }
  .balance-card .row-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .balance-card .label {
    font-size: 17px;
    color: #f2f2f2;
    font-weight: 600;
    line-height: 1.2;
  }
  .link {
    color: var(--muted);
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 2px;
    white-space: nowrap;
  }
  .amount {
    font-size: 44px;
    font-weight: 700;
    margin: 10px 0 20px;
    letter-spacing: -0.5px;
    transition: opacity 0.15s ease;
  }
  .amount.flash { opacity: 0.35; }
  .btn-row {
    display: flex;
    gap: 10px;
  }
  .pill-btn {
    flex: 1;
    background: var(--pill);
    color: var(--text);
    border: none;
    border-radius: 999px;
    padding: 14px 0;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .pill-btn:active { opacity: 0.7; }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .tile {
    background: var(--card);
    border-radius: 20px;
    padding: 16px;
    min-height: 130px;
    display: flex;
    flex-direction: column;
  }
  .tile .row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tile-title {
    font-size: 16px;
    font-weight: 600;
  }
  .chev { color: var(--muted); font-size: 16px; }
  .tile-icon {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    font-size: 16px;
  }
  .tile-value {
    margin-top: auto;
    font-size: 20px;
    font-weight: 700;
  }
  .tile-sub {
    color: var(--muted);
    font-size: 13px;
    margin-top: 2px;
  }
  .sparkline { width: 100%; height: 34px; margin-top: 6px; }
  nav.bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(10,10,10,0.92);
    backdrop-filter: blur(12px);
    border-top: 1px solid #1f1f1f;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
  }
  nav.bottom .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    font-size: 14px;
    font-weight: 600;
  }
  nav.bottom .nav-item.active {
    color: var(--text);
    background: #1c1c1e;
    padding: 8px 14px;
    border-radius: 999px;
  }
  nav.bottom .badge {
    background: #2a2a2c;
    color: var(--text);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
  }

  /* Modal */
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 10;
  }
  .overlay.open { opacity: 1; pointer-events: auto; }
  .sheet {
    width: 100%;
    max-width: 480px;
    background: #151517;
    border-radius: 22px 22px 0 0;
    padding: 24px 20px calc(24px + env(safe-area-inset-bottom));
    transform: translateY(20px);
    transition: transform 0.2s ease;
  }
  .overlay.open .sheet { transform: translateY(0); }
  .sheet h2 {
    margin: 0 0 4px;
    font-size: 18px;
  }
  .sheet p.hint {
    margin: 0 0 18px;
    color: var(--muted);
    font-size: 13px;
  }
  .amount-input-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    margin-bottom: 22px;
  }
  .amount-input-wrap .sign {
    font-size: 32px;
    font-weight: 700;
    color: var(--muted);
  }
  .amount-input-wrap input {
    background: none;
    border: none;
    outline: none;
    color: var(--text);
    font-size: 44px;
    font-weight: 700;
    width: 220px;
    text-align: center;
  }
  .sheet-actions {
    display: flex;
    gap: 10px;
  }
  .sheet-actions button {
    flex: 1;
    border: none;
    border-radius: 999px;
    padding: 15px 0;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
  }
  .btn-cancel {
    background: var(--pill);
    color: var(--text);
  }
  .btn-confirm {
    background: var(--green);
    color: #012a10;
  }
  .btn-confirm.withdraw {
    background: var(--red);
    color: #2a0505;
  }
  .btn-confirm:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .toast {
    position: fixed;
    top: 18px;
    left: 50%;
    transform: translateX(-50%) translateY(-10px);
    background: #1f1f21;
    border: 1px solid #2c2c2e;
    color: var(--text);
    padding: 10px 18px;
    border-radius: 999px;
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
</style>
</head>
<body>
<div id="app">
  <header class="top">
    <h1>Money</h1>
    <button class="icon-btn" aria-label="Account">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.6"/><circle cx="12" cy="10" r="3.2" stroke="white" stroke-width="1.6"/><path d="M5.5 18.5C6.8 16 9.2 15 12 15c2.8 0 5.2 1 6.5 3.5" stroke="white" stroke-width="1.6" stroke-linecap="round"/></svg>
    </button>
  </header>

  <div class="balance-card">
    <div class="row-top">
      <div class="label">Cash<br />balance</div>
      <div class="link">Account &amp; routing <span>&rsaquo;</span></div>
    </div>
    <div class="amount" id="balance">$0.00</div>
    <div class="btn-row">
      <button class="pill-btn" id="depositBtn">Add money</button>
      <button class="pill-btn" id="withdrawBtn">Withdraw</button>
    </div>
  </div>

  <div class="grid">
    <div class="tile">
      <div class="row-top">
        <div class="tile-title">Savings</div>
        <span class="chev">&rsaquo;</span>
      </div>
      <div class="tile-icon" style="background:#123320;color:var(--green);">$</div>
      <div>
        <div class="tile-value">$0.00</div>
        <div class="tile-sub">Balance</div>
      </div>
    </div>

    <div class="tile">
      <div class="row-top">
        <div class="tile-title">Bitcoin</div>
        <span class="chev">&rsaquo;</span>
      </div>
      <svg class="sparkline" viewBox="0 0 100 30" preserveAspectRatio="none">
        <polyline points="0,10 6,14 12,8 18,16 24,12 30,18 36,14 42,20 48,15 54,19 60,13 66,17 72,12 78,16 84,10 90,14 96,9 100,12" fill="none" stroke="var(--blue)" stroke-width="1.6" />
      </svg>
      <div>
        <div class="tile-value">$49,151.45</div>
        <div class="tile-sub">&darr; 0.89% today</div>
      </div>
    </div>

    <div class="tile">
      <div class="row-top">
        <div class="tile-title">Paychecks</div>
        <span class="chev">&rsaquo;</span>
      </div>
      <div class="tile-icon" style="background:#173a1c;color:var(--green);">&darr;</div>
      <div>
        <div class="tile-sub">Get paid early</div>
      </div>
    </div>

    <div class="tile">
      <div class="row-top">
        <div class="tile-title">Stocks</div>
        <span class="chev">&rsaquo;</span>
      </div>
      <div class="tile-icon" style="background:#2c1a3d;color:var(--purple);">&#8599;</div>
      <div>
        <div class="tile-sub">Invest with $1</div>
      </div>
    </div>
  </div>
</div>

<nav class="bottom">
  <div class="nav-item active" id="navBalance">$0.00</div>
  <div class="nav-item">&#9633;</div>
  <div class="nav-item">$</div>
  <div class="nav-item">&#128269;</div>
  <div class="nav-item"><span class="badge">9</span></div>
</nav>

<div class="overlay" id="overlay">
  <div class="sheet">
    <h2 id="sheetTitle">Add money</h2>
    <p class="hint" id="sheetHint">This is fake money for demo purposes only.</p>
    <div class="amount-input-wrap">
      <span class="sign">$</span>
      <input id="amountInput" inputmode="decimal" placeholder="0.00" autocomplete="off" />
    </div>
    <div class="sheet-actions">
      <button class="btn-cancel" id="cancelBtn">Cancel</button>
      <button class="btn-confirm" id="confirmBtn" disabled>Confirm</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
(function () {
  var STORAGE_KEY = 'fakeMoneyBalance';
  var DEFAULT_BALANCE = 103928.00;

  var balanceEl = document.getElementById('balance');
  var navBalanceEl = document.getElementById('navBalance');
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
    navBalanceEl.textContent = '$' + (balance / 1000).toFixed(1) + 'K';
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
      sheetTitle.textContent = 'Add money';
      sheetHint.textContent = 'This is fake money for demo purposes only.';
      confirmBtn.textContent = 'Add money';
      confirmBtn.classList.remove('withdraw');
    } else {
      sheetTitle.textContent = 'Withdraw';
      sheetHint.textContent = 'This is fake money for demo purposes only.';
      confirmBtn.textContent = 'Withdraw';
      confirmBtn.classList.add('withdraw');
    }
    overlay.classList.add('open');
    setTimeout(function () { amountInput.focus(); }, 200);
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
      showToast('Added ' + formatMoney(amount));
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
