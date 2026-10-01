const stagesEl = document.getElementById('stages');
const statusEl = document.getElementById('status');
const sourceEl = document.getElementById('source');
const runBtn = document.getElementById('run');
let items = [];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function setState(li, state, label) {
  li.className = 'stage ' + state;
  li.querySelector('.tag').textContent = label;
}

async function load() {
  try {
    const res = await fetch('/api/pipeline');
    const { stages, source } = await res.json();
    sourceEl.textContent = source;
    items = stages.map((s) => {
      const li = document.createElement('li');
      li.className = 'stage';
      li.innerHTML = '<strong></strong><code></code><span class="tag">Waiting</span>';
      li.querySelector('strong').textContent = s.name;
      li.querySelector('code').textContent = s.command;
      stagesEl.appendChild(li);
      return li;
    });
  } catch (e) {
    statusEl.textContent = 'Could not load the Jenkinsfile. Start the server with npm start.';
    runBtn.disabled = true;
  }
}

async function run() {
  runBtn.disabled = true;
  items.forEach((li) => setState(li, '', 'Waiting'));
  for (const li of items) {
    statusEl.textContent = 'Running stage: ' + li.querySelector('strong').textContent;
    setState(li, 'running', 'Running');
    await sleep(900);
    setState(li, 'done', 'Passed');
  }
  statusEl.textContent = 'Pipeline finished successfully.';
  runBtn.disabled = false;
}

runBtn.addEventListener('click', run);
load();
