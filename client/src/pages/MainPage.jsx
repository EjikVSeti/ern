import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { about } from '../libs/about/actions';
import { Loader } from '../components/Loader';

const MainPage = (props) => {
  const { displayName, info, about, isReady, error } = props;

  const fetchAbout = useCallback(async () => {
    await about();
  }, [about]);

  useEffect(() => {
    fetchAbout().then();
  }, [fetchAbout])

  if (!isReady) {
    return <Loader/>
  }

  return (
    <ul className="collection with-header">
      {error && <div className="card-panel red lighten-2 white-text center"><span>{error}</span></div>}

      <li className="collection-header"><h4>Привет, <span className="teal-text">{displayName}</span></h4></li>
      <li className="collection-item">{info}</li>
    </ul>
  )
}

const mapStateToProps = state => ({
  displayName: state.authentication.username,
  isReady: state.about.isReady,
  error: state.about.error,
  info: state.about.info
});

const mapDispatchToProps = dispatch => ({
  about: () => dispatch(about()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage)
);
