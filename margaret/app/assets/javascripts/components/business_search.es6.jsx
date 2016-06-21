class BusinessSearch extends SearchComponent {
  handleQueryChange(e) {
    let searchQuery = e.target.value;
    this.setState({queryInput: searchQuery});

    // only perform after more than 3 characters entered
    if(searchQuery.length <= 3) {
      this.setState({results: []});
    } else {
      this.apiConnector.end(
        superagent.get('/api/businesses/search').query(`query=${searchQuery}`),
        this.setResults.bind(this)
      );
    }
  }

  // return a list of matching businesses - link to their #show page
  results() {
    let searchResults = this.state.results.map(
      business => <li className={"list-group-item"}><a key={business.id} href={business.link_to_business}>{business.name}</a></li>
    );

    return((searchResults.length > 0) ? <ul className={"list-group"}>{searchResults}</ul> : <ul className={"list-group"}>No results</ul>);
  }

  render () {
    return (
      <div>
        <div className={"input-group input-group-btn"}>
          <input type="text" className={"form-control"} placeholder="Search by business name or address..." value={this.state.queryInput} onChange={this.handleQueryChange.bind(this)} />
        </div>
        <div className={"row control-buttons"}>
          {this.results()}
        </div>
      </div>
    );
  }
}