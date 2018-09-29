import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import Weather from './components/weather';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


//Create a new component. This component should produce some html.
class App extends Component {
  render(){
	  return(
		  <Weather />
	  )
  }


}

ReactDOM.render(
	<Provider store={store}>
		<App />


	</Provider>, document.querySelector('.container')
);



