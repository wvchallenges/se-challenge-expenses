// Underscored the classname to be compatible with the asset pipeline

class SearchComponent extends React.Component {
  // set api connector class and initialize state
  constructor(props) {
    super(props);
    this.apiConnector = new APIConnector();
    this.state = {
      queryInput: '',
      results: []
    };
  }

  setResults(err, response) {
    this.setState({results: response.body || []});
  }
}