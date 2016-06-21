// Underscored the classname to be compatible with the asset pipeline

class SearchComponent extends React.Component {
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