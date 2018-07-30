// Dependecies
import React           from 'react';
import { connect }     from 'react-redux';

// Form components
import FormTitle    from './shared/FormTitle';
import FormStep     from './shared/FormStep';
import FormButtons  from './shared/FormButtons';


// Component
class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  prevPage() {
    this.props.history.goBack(-1);
  }

  nextPage() {
    console.log('Submission!');
    console.log(this.props.info);
  }

  render() {
    let { info, errors } = this.props;

    return (
      <div>
        <FormTitle page={"Review"} />

        <FormStep>
          
        </FormStep>

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={false}
          nextText={"Submit for review"}
        />
      </div>
    );
  }
}

// Container
const mapStateToProps = state => ({
  info  : state.fields.info,
  errors: state.fields.errors
});

export default connect(mapStateToProps)(StepFour);