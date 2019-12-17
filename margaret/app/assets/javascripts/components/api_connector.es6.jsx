// just a default implementation of superagent
class APIConnector {
  end(superagentRequest, callback) {
    superagentRequest
      .type('json')
      .end(callback);
  }
}