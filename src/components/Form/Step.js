// Dependecies
import React          from 'react';
import { connect }    from 'react-redux';

// Form actions
import {updateForm}  from '../../actions/field.actions';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';

// Form fields


export default class Step extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <FormStep>
        <FormTitle page={'placeholder'} progress={0.5} />
        
        <div className="ms-Grid-row">
        
        </div>

        <FormButtons
          prevPage={undefined}
          nextPage={undefined}
          prevDisabled={false}
          nextDisabled={false}
        />
      </FormStep>
    );
  }
}

const mapStateToProps = state => ({
  info: state.fields.info,
  errors: state.fields.errors
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Step);