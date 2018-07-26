import React from 'react';
import FormButtons from '../FormButtons';


// React Component
export default class StepFour extends React.Component {
  constructor(props) {
    super();
    this.state = { ...props };

    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  prevPage() {
    this.props.history.push("/form/event");
  }

  nextPage() {
    this.props.history.push("/form/review");
  }

  render() {
    return (
      <div>
        <h3>Step Four: Layout</h3>
        <FormButtons
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          disabled={false}
        />
      </div>
    );
  }
}