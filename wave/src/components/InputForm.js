import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

const InputForm = ({ file, name, onSubmit }) => {
  const fileSelected = file && file.values && file.values[name][0];
  return (
    <div className="p2 mb2">
      <form onSubmit={onSubmit}>
        <div className="mb2">
          <label htmlFor={name}>
            <div className="flex justify-center items-center">
              <div>
                <span>csv file</span>
                <span>{ fileSelected ? ': ' + file.values[name][0].name : '' }</span>
              </div>
              <div className="btn btn-primary h6 normal py0 px1 ml2 bg-blue">
                { fileSelected ? 'Select another' : 'Select file' }
              </div>
            </div>
          </label>
          <Field
            className="hide"
            component="input"
            id={name}
            name={name}
            type="file" />
        </div>
        <button className="btn btn-primary p1 mb1 ml2 bg-black" type="submit">
          Upload file
        </button>
      </form>
    </div>
  );
};

InputForm.propTypes = {
  file: PropTypes.object,
  name: PropTypes.string,
  submit: PropTypes.func,
};

export default reduxForm({ form: 'file' })(InputForm);
