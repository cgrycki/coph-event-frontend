// Dependecies
import React          from 'react';

// Components
import FormTitle      from './shared/FormTitle';
import FormStep       from './shared/FormStep';
import FormButtons    from './shared/FormButtons';
import Editor         from '../Diagram';



export default class StepFive extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <FormStep>
        <FormTitle page={'placeholder'} progress={0.5} />
        <div className="ms-Grid-row">

          <Editor/>

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