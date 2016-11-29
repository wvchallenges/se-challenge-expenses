import React, { PropTypes } from 'react';

const App = ({ children }) => (
  <div>
    <div className="p2 mb2 h3 bold center bg-darken-4 white">
      let's pretend this is a navbar
    </div>
    <div className="max-width-3 mx-auto">
      <div className="p2 mb2">
        { children }
      </div>
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
