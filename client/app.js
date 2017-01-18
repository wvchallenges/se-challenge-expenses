var html = require('choo/html')
var choo = require('choo')
var app = choo()

app.model({
  state: {title: 'Not quite set yet'},
  reducers: {
    update: function (state, data) {
      return {title: data}
    }
  }
})

function mainView (state, prev, send) {
  return html`
    <div>
      <nav class="bg-blue white">
        <div class="center mw7 pv2 cf bg-dark-blue ph3 br2 br--bottom">
          <div class="fl f4 fw6">
            Wave
          </div>
          <div class="fr f5 lh-copy">
            <a href="/" class="white">Upload new file</a>
          </div>
        </div>
      </nav>
      <header class="bg-blue">
        <div class="center w-90 mw7 pt4 pb5">
          <h1 class="f1 mv0">
            <span class="bg-navy white ph3 pv2 dib br2">Data Import</span>
          </h1>
        </div>
      </header>
      <main class="center w-90 mw7 mt relative top--2">
        <div class="bg-white pa4 br2 ba b--light-gray">

          <h2 class="f3 fw3 ma0 mb4 pb2 w3 bb bw2 b--black-90 nowrap">
            <strong>Step 1:</strong> Select data file
          </h2>

          <p class="f5 lh-copy measure">
            The first step in the import process is selecting a CSV file containing expense data.
            Once it's uploaded and saved in the database you'll be able to visualize your per-month
            expense report.
          </p>

          <p class="f5 lh-copy measure">
            The file needs to include header line and include the following fields:
            <code class="bg-near-white">date, category, employee name, employee address, expense description, pre-tax amount, tax name, tax amount</code>
          </p>

          <input type="file" oninput=${update} class="ph2 pv3 db bg-near-white ba b--light-silver br2 mb3">

          <button class="bg-blue white bw0 br2 pa3 f4">
            Upload file
          </button>

        </div>
      </main>
    </div>
  `

  function update (e) {
    send('update', e.target.value)
  }
}

app.router(['/', mainView])

var tree = app.start()
var appEl = document.getElementById('app')
appEl.innerHTML = ''
appEl.appendChild(tree)
