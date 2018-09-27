import React, { Component } from 'react';
import { connect }          from 'react-redux';
import Diagram              from '../Diagram';
import { fetchITLayout }    from '../../actions';


class CPHIT extends Component {
  /* Fetches the layout according to URL on mount */
  componentDidMount() {
    const { match: { params: { package_id }}, fetchITLayout } = this.props;
    return fetchITLayout(package_id);
  }

  render() {
    return (<Diagram draggable={false} cphit={true} />);
  }
}


const mapStateToProps = state => ({
  layouts_loading: state.diagram.layouts_loading,
  layouts_error: state.diagram.layouts_error
});

const mapDispatchToProps = dispatch => ({
  fetchITLayout: package_id => dispatch(fetchITLayout(package_id))
});


export default connect(mapStateToProps, mapDispatchToProps)(CPHIT);