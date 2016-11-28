import React from 'react';
import Records from './Records';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      formData: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      document.body.style.opacity = 1;
    }, 200);
  }

  handleChange(e) {
    const formData = new FormData();
    formData.append('record', e.target.files[0]);
    this.setState({
      formData,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/api/record', {
      method: 'POST',
      body: this.state.formData,
    })
    .then(res => (res.json()))
    .then((res) => {
      this.setState({
        records: res,
      }, () => {
        console.log(this.state);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="flex-container">
        <div>
          {this.state.records.length === 0 ?
            <div>
              <h1>Monthly Expense Report</h1>
              <form method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <label htmlFor="upload-button" className="upload-button">Choose a File</label>
                <input
                  type="file"
                  name="record"
                  accept=".csv"
                  onChange={this.handleChange}
                  id="upload-button"
                />
                <input type="submit" />
              </form>
            </div> : null}
          <Records records={this.state.records} />
        </div>
      </div>
    );
  }
}

export default App;
