import React, { Component } from 'react';
import { connect } from 'react-redux';
import Diagram from '../Diagram';
import { fetchITLayout } from '../../actions';


class CPHIT extends Component {
  state = {}

  componentDidMount() {
    const { match: { params: { package_id }}, fetchITLayout} = this.props;
    console.log(package_id, fetchITLayout);

    return fetchITLayout(package_id);
    
  }

  render() {
    return (<Diagram />);
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