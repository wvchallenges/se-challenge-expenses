class ReportSearch extends SearchComponent {
  constructor(props) {
    super(props);
  }

  handleQueryChange(e) {
    let searchQuery = e.target.value;
    this.setState({queryInput: searchQuery});

    // only perform after 4 characters entered
    if(searchQuery.length < 4) {
      this.setState({results: []});
    } else {
      // scoping report search by business
      this.apiConnector.end(
        superagent.get(`/api/businesses/${this.props.business_id}/search_reports`).query(`query=${searchQuery}`),
        this.setResults.bind(this)
      );
    }
  }

  // Return any reports for this business matching some specified info
  results() {
    let searchResults = this.state.results.map(
      entry => <li className={"list-group-item"}><a key={entry.id} href={entry.link_to_report}>{entry.date}, {entry.employee_name}, ${entry.amount_before_tax}, {entry.category}, ...</a></li>
    );
    
    return((searchResults.length > 0) ? <ul className={"list-group"}>{searchResults}</ul> : <ul className={"list-group"}>No results</ul>);
  }

  render () {
    return(
      <div>
        <div className={"input-group input-group-btn"}>
          <input type="text" className={"form-control"} placeholder="Search for data..." value={this.state.queryInput} onChange={this.handleQueryChange.bind(this)} />
        </div>
        <div className={"row control-buttons"}>
          {this.results()}
        </div>
      </div>
    );
  }
}