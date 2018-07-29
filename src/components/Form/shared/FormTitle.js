import React from 'react';

export default class FormTitle extends React.PureComponent {
  renderPage(page) {
    // Conditionally renders the sub page for our form title
    // aka: Create an Event(: <i>{page}</i>)
    return (
      <span>
        : <span className="ms-font-xl">{page}</span>
      </span>);
  }

  render() {
    let { page } = this.props;
    const title_style = {
      "top": 0,
      "position": "absolute"
    };

    return (
      <div className="ms-Grid-row" style={title_style}>
        <div className="ms-Grid-col ms-sm12">
          <h2>Create an Event{(page !== undefined) && this.renderPage(page)}</h2>
        </div>
      </div>
    );
  }
}