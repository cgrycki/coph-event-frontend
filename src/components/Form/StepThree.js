// Dependecies
import React          from 'react';

// Form components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';

// Editor
import Editor         from '../Editor';



// Component
export default class StepThree extends React.Component {

  /** Set web page title on mount. */
  componentDidMount() {
    document.title = "Create Event: Layout";
  }

  prevPage = () => {
    this.props.history.goBack(-1);
  }

  nextPage = () => {
    this.props.history.push("/form/review");
  }

  render() {
    return (
      <FormStep>
        <FormTitle page={"Layout"} progress={0.75} />

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