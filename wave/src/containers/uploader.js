import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { upload } from 'actions/csv';

import InputForm from 'components/InputForm';
import DataTable from 'components/DataTable';

function mapStateToProps(state) {
  return {
    file: state.form.file,
    csv: state.csv.get('result'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    upload,
  }, dispatch);
}

const Uploader = ({csv, file, expenses, upload }) => {
  return (
    <div className="center">
      <div className="p2 mb2 h4 bold center">
        Please select a CSV file to upload.
      </div>
      <InputForm
        file={file}
        name="myFile"
        onSubmit={e => {
          e.preventDefault();
          upload(file.values.myFile[0]);
        }} />
      { csv ? <DataTable data={csv} /> : null }
    </div>
  );
};

Uploader.displayName = 'Uploader';
Uploader.propTypes = {
  csv: PropTypes.array,
  file: PropTypes.object,
  upload: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Uploader);
