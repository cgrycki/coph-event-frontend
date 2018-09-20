// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';
// Form components + fields
import {
  FormStep,
  FormTitle,
  FormButtons
}                     from './shared';
import Diagram        from '../Diagram';



class Step extends React.Component {
  /** Sets web page title on mount */
  componentDidMount() {
    document.title = "Create an Event: Layout";
  }

  validate = () => this.props.emptyItems;
  prevPage = () => this.props.history.goBack(-1);
  nextPage = () => this.props.history.push('/form/misc');

  render() {
    return(
      <FormStep>
        <FormTitle page={'Layout'} progress={0.75} />
        
        <Diagram draggable={true} />

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={this.validate()}
        />
      </FormStep>
    );
  }
}

const mapStateToProps = state => ({
  emptyItems: state.diagram.items.length === 0
})

export default connect(mapStateToProps)(Step);