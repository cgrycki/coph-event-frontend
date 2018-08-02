// Dependecies
import React          from 'react';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';

// Editor
import Editor         from './editor';



// Component
export default class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  prevPage() {
    this.props.history.goBack(-1);
  }

  nextPage() {
    this.props.history.push("/form/review");
  }

  render() {
    return (
      <FormStep>
        <FormTitle page={"Layout"} />

        <Editor />

        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          prevDisabled={false}
          nextDisabled={false}
        />
      </FormStep>
    );
  }
}