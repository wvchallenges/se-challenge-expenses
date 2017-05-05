import ReactDOM from 'react-dom';
import React from 'react';
// import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import {Provider, connect} from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import _style from 'tachyons';

import {reduceIn} from './redux-tree';
import {createStore} from './create_store';

// constants
const UPLOAD_DATA = 'UPLOAD_DATA';
const IS_UPLOADING = 'IS_UPLOADING';
const UPLOAD_STATUS = 'UPLOAD_STATUS';
const PARSED_DATA = 'PARSED_DATA';

// components

const __Upload = function(props) {
    const {dispatch} = props;

    function upload_button() {

        const onClick = (event) => {
            event.preventDefault();

            if(props[IS_UPLOADING]) {
                return;
            }

            if(!props.has_upload_data) {
                return;
            }

            uploadData(dispatch, props[UPLOAD_DATA]);
        }

        return (<a
            className="link"
            href="#upload"
            onClick={onClick}>{'Upload'}</a>);
    }

    const status = function() {

        if(props[IS_UPLOADING]) {
            return (<div>{'Uploading.'}</div>);
        }

        if(props.has_upload_data) {
           return (<div>{'Ready to upload.'}</div>);
        }
        return (<div>{'Choose file(s) to upload.'}</div>);
    };

    const upload_response = () => {

        if(!props[UPLOAD_STATUS]) {
            return null;
        }

        return (<div>{'There was a problem uploading file(s). Please try again. Error: ' + props[UPLOAD_STATUS]}</div>);
    }

    return(
        <div>
            <input
                type="file"
                name="uploads[]"
                multiple="multiple"
                onChange={handleFileUpload(dispatch)}
            />
            {upload_button()}
            <br/><br/>
            {status()}
            <br/><br/>
            {upload_response()}
        </div>
    );
}

if(process.env.NODE_ENV !== 'production') {
    __Upload.propTypes = {
        dispatch: PropTypes.func.isRequired,
        has_upload_data: PropTypes.bool.isRequired,
        [IS_UPLOADING]: PropTypes.bool.isRequired,
        // TODO: should be null or object
        [UPLOAD_DATA]: PropTypes.object,
        [UPLOAD_STATUS]: PropTypes.string,
    };
}

const Upload = connect(

    // mapStateToProps
    (state) => {
        return {
            [IS_UPLOADING]: state[IS_UPLOADING],
            'has_upload_data': state[UPLOAD_DATA] != null,
            [UPLOAD_DATA]: state[UPLOAD_DATA],
            [UPLOAD_STATUS]: state[UPLOAD_STATUS]
        };
    }

)(__Upload);

const __ParsedData = function(props) {

    if(!props[PARSED_DATA]) {
        return null;
    }

    const print_parsed_data = function() {

        const months = ['January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'];

        const rows = months.map((month) => {

            const expense = parseFloat(Math.round((props[PARSED_DATA][month] || 0) * 100) / 100).toFixed(2);

            return (
            <tr key={month}>
              <td className="pv3 pr3 bb b--black-20">{month}</td>
              <td className="pv3 pr3 bb b--black-20">{`$${expense}`}</td>
            </tr>);
        });

        return rows;
    }

    return (
        <div>
            <table className="f6 w-100 mw8 center" cellSpacing="0">
                <thead>
                    <tr>
                    <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Month</th>
                    <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Total Expenses</th>
                    </tr>
                </thead>
                <tbody className="lh-copy">
                    {print_parsed_data()}
                </tbody>
            </table>
        </div>
    )
}

const ParsedData = connect(

    // mapStateToProps
    (state) => {
        return {
            [PARSED_DATA]: state[PARSED_DATA]
        };
    }

)(__ParsedData);

const App = function() {
    return(
        <section className="mw5 mw7-ns center bg-light-gray pa3 ph5-ns">
            <h1 className="mt0">{'Wave Software Development Challenge'}</h1>
            <Upload />
            <ParsedData />
        </section>
    );
}

// redux reducers

const applyPayloadReducer = (state, action) => {

    if(!_.has(action, 'payload')) {
        return state;
    }

    return action.payload;
};

// redux action dispatchers
// NOTE: FSA compliant

const uploadData = (dispatch, form_data) => {

    const is_uploading_action = reduceIn(
        // reducer
        applyPayloadReducer,
        // path
        [IS_UPLOADING],
        // action
        {
            type: 'ACTION_IS_UPLOADING',
            payload: true,
        }
    );

    dispatch(is_uploading_action);

    axios.post('/upload', form_data)
        .then(function (response) {
            handle_response(dispatch, response);
        })
        .catch(function (error) {

            // TODO: debug
            console.log(error);

            handle_response(dispatch, error.response);

        });

};

const handle_response = (dispatch, response) => {

    const is_not_uploading_action = reduceIn(
        // reducer
        applyPayloadReducer,
        // path
        [IS_UPLOADING],
        // action
        {
            type: 'ACTION_IS_UPLOADING',
            payload: false,
        }
    );

    const reset_form_data_action = reduceIn(
        // reducer
        applyPayloadReducer,
        // path
        [UPLOAD_DATA],
        // action
        {
            type: 'RESET_FORM_DATA',
            payload: null,
        }
    );

    const set_upload_status = function(status = null) {
        const action = reduceIn(
            // reducer
            applyPayloadReducer,
            // path
            [UPLOAD_STATUS],
            // action
            {
                type: 'UPLOAD_STATUS',
                payload: status,
            }
        );

        dispatch(action);
    }

    const parsed_data = (data) => {

        const action = reduceIn(
            // reducer
            applyPayloadReducer,
            // path
            [PARSED_DATA],
            // action
            {
                type: 'PARSED_DATA',
                payload: data || null,
            }
        );

        dispatch(action);
    }

    switch(response.status) {
        case 200: {
            parsed_data(response.data.payload || null);
            set_upload_status(null);
            break;
        }
        case 400: {
            parsed_data(null);
            set_upload_status('File(s) uploaded may not be CSV files or there is bad data.');
            break;
        }
        case 500: {
            parsed_data(null);
            set_upload_status('Server internal error.');
            break;
        }
        default: {
            parsed_data(null);
            set_upload_status('Unexpected error.');
        }
    }

    dispatch(is_not_uploading_action);
    dispatch(reset_form_data_action);
}

const handleFileUpload = (dispatch) => {
    return (event) => {
        const files = event.target.files;

        if(files.length <= 0) {
            return;
        }

        const form_data = new FormData();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            form_data.append('uploads[]', file, file.name);
        }

        const action = reduceIn(
            // reducer
            applyPayloadReducer,
            // path
            [UPLOAD_DATA],
            // action
            {
                type: 'APPLY_FORM_DATA',
                payload: form_data,
            }
        );

        dispatch(action);

    };
}

// redux store

const initialState = {
    [UPLOAD_DATA]: null,
    [IS_UPLOADING]: false,
    [UPLOAD_STATUS]: null,
    [PARSED_DATA]: null
}

const store = createStore(initialState);

// mount

const Component = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(Component, document.getElementById('app_container'));
