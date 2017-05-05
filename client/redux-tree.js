// TODO: doc all the things... and cleanly.
// Apply reducer & action on sub-state through a given path.

// TODO: specific lodash dependencies
import isFunction from 'lodash/isFunction';
import lodashGetIn from 'lodash/get';
import lodashSetIn from 'lodash/set';
import lodashMerge from 'lodash/merge';
import lodashMergeWith from 'lodash/mergeWith';
import lodashIsArray from 'lodash/isArray';
import lodashIsString from 'lodash/isString';
// TODO: npm install npm.im/warning

// sentinel value
const NOT_SET = {};

// NOTE: needed b/c
// _.merge([1,2,3],[undefined]) => [1,2,3]
// _.merge({a: void 0}, {b: void 0}) => {a: void 0}
//
// Above are undesired merging behaviours.
const customMerge = (_oldValue, newValue, key, destObject) => {
    if(newValue === void 0) {
        // TODO: necessary?
        //var key = _.isArray(destObject) ? Number(key) : key;
        // NOTE: this is a side-effect
        destObject[key] = newValue;
    }
};

// if path points to root
const __isRoot = (path) => {
    // see: https://github.com/lodash/lodash/issues/2638
    return (lodashIsArray(path) && path.length <= 0) ||
        (lodashIsString(path) && path.trim().length <= 0);
};

const __getIn = (rootData, path) => {

    if(__isRoot(path)) {
        return rootData;
    }

    return lodashGetIn(rootData, path);
};

// NOTE:
// - should return new object.
// - should NOT edit rootData in-place
const __setIn = (rootData, path, newValue) => {

    const isArray = lodashIsArray(rootData);

    const patch = __isRoot(path) ? newValue : lodashSetIn(isArray ? [] : {}, path, newValue);

    // NOTE: the following will not work: {...state, ...patch};

    return lodashMergeWith(isArray ? [] : {}, rootData, patch, customMerge);
};

const treeReducer = (state, action) => {

    if (process.env.NODE_ENV !== 'production') {
        if(!action.meta) {
            // TODO: improve error
            throw Error('no meta in action');
        }

        if(!action.meta.__redux_tree) {
            // TODO: improve error
            throw Error('reduceIn/reduceInWith not used');
        }
    }

    const {reducer, path, getIn, setIn} = action.meta.__redux_tree;

    if (process.env.NODE_ENV !== 'production') {

        if(!reducer) {
            // TODO: improve error
            throw Error('no reducer');
        }

        if(!path) {
            // TODO: improve error
            throw Error('no path');
        }

    }

    const oldValue = getIn(state, path);
    const newValue = reducer(oldValue, action);

    if(oldValue === newValue) {
        // fast path
        return state;
    }

    const newRoot = setIn(state, path, newValue);

    return newRoot;
}

// reducer factory
const makeReducer = ({reducer: fallbackReducer = NOT_SET} = {}) => {

    let afterInit = false;

    // const fallbackReducer = reducer;
    const fallbackReducerIsFunction = isFunction(fallbackReducer);

    return (state = NOT_SET, action) => {

        if (process.env.NODE_ENV !== 'production') {
            if(state === NOT_SET) {
                // TODO: improve error
                throw Error('no initial state given');
            }
        }

        if(!afterInit) {
            afterInit = true;
            return state;
        }

        if(fallbackReducerIsFunction) {
            // TODO: improve this check if compatible with redux-tree
            if(!(action.meta && action.meta.__redux_tree)) {
                // TODO: an edge case that needed to be resolved
                return lodashMerge({}, state, fallbackReducer(state, action));
                // return fallbackReducer(state, action);
            }
        }

        return treeReducer(state, action);

    };

};


// redux-tree action creator/transformer that adds the following to the given action
//
// action = {
//     // ...
//     meta: {
//         __redux_tree: {
//             path: path,
//             reducer: reducer,
//             getIn: getIn,
//             setIn: setIn
//         }
//     }
// };
//
// NOTE: given action must be flux standard action (FSA) compliant.
//
// The returned action is flux standard action (FSA) compliant.
//
const reduceIn = (reducer, path, action, getIn = __getIn, setIn = __setIn, shouldPollute = false) => {

    // NOTE: shouldPollute allows pollution of action object (in-place overwriting)

    // invariant: action is a plain object and flux standard action compliant

    const patch = {
        meta: {
            __redux_tree: {
                path: path, // array
                reducer: reducer, // redux compatible reducer
                getIn: getIn,
                setIn: setIn
            }
        }
    };

    return shouldPollute ? lodashMerge(action, patch) :
        lodashMerge({}, action, patch);

};

// reduceIn factory to cache given getIn, setIn, shouldPollute = false
//
// Be able to customize getIn and setIn.
//
// type getIn = (rootData, path) => valueAtPath
// type setIn = (rootData, path, value) => rootData
//
// Useful for Immutable.js objects
const reduceInWith = (getIn = __getIn, setIn = __setIn, shouldPollute = false) => {
    return (reducer, path, action) => {
        return reduceIn(reducer, path, action, getIn, setIn, shouldPollute);
    };
}

module.exports = {

    // export reducer
    makeReducer,

    // reducer application
    reduceIn,
    reduceInWith
};
