import React from 'react';
import { formValueSelector, reduxForm } from 'redux-form';
import './App.css';
import {
  getAppSettings,
  saveAppSettings,
  saveForm
} from './app-settings';
import logo from './logo.svg';
import { connect } from 'react-redux';

class App extends React.Component {

  componentDidMount() {
    this.props.getAppSettings();
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  }
}

const selector = formValueSelector('appSettings'); // <-- same as form name

const mapStateToProps = storeState => ({
  initialValues: storeState.appSettings.appSettings,
  snackbarOpen: storeState.appSettings.saved,
  loading: storeState.appSettings.loading,
  hideSoldOutProductsValue: selector(storeState, 'hideSoldOutProducts'),
  androidPayEnabledValue: selector(storeState, 'androidPayEnabled')
});

const mapDispatchToProps = {
  getAppSettings,
  saveAppSettings,
  saveForm
};

const appSettingsForm = reduxForm({
  form: 'appSettings',
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    dispatch(saveAppSettings(values));
  }
})(App);

const reduxConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(appSettingsForm);

export default reduxConnect;
