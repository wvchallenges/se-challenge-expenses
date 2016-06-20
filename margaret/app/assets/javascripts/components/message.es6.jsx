class Message extends React.Component {
  render () {
    return (
      <div>
        <div>Text: {this.props.text}</div>
      </div>
    );
  }
}

Message.propTypes = {
  text: React.PropTypes.string
};
