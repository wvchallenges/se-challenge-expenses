class BusinessSearch extends React.Component {
  constructor(props) {
    super(props);
    this.apiConnector = new APIConnector();
    this.state = {
      businessName: '',
      results: []
    };
  }

  setResults(err, response) {
    this.setState({results: response.body || []});
  }

  handleQueryChange(e) {
    let searchQuery = e.target.value;
    this.setState({businessName: searchQuery});

    // only perform after more than 2 characters entered
    if(searchQuery.length < 2) {
      this.setState({results: []})
    } else {
      this.apiConnector.end(
        superagent.get('/api/businesses/search').query(`query=${searchQuery}`),
        this.setResults.bind(this)
      );
    }
  }

  results() {
    let styles = {};
    let searchResults = this.state.results.map(
      business => <li className={"list-group-item"}><a key={business.id} href={business.link_to_business}>{business.name}</a></li>
    );

    return((searchResults.length > 0) ? <ul className={"list-group"}>{searchResults}</ul> : <ul className={"list-group"}>No results</ul>);
  }

  render () {
    let results = this.results();
    return (
      <div>
        <div className={"input-group input-group-btn"}>
          <input type="text" className={"form-control"} placeholder="Search by business name or address..." value={this.state.BusinessName} onChange={this.handleQueryChange.bind(this)} />
        </div>
        <div className={"row control-buttons"}>{this.results()}</div>
      </div>
    );
  }
}