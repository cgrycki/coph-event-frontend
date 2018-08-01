import React from 'react';

export default class FormTitle extends React.PureComponent {
  renderPage(page) {
    // Conditionally renders the sub page for our form title
    // aka: Create an Event(: <i>{page}</i>)
    return (
      <span>
        : <span className="ms-font-xl">{page}</span>
      </span>
    );
  }

  render() {
    let { page } = this.props;
    const title_style = { marginBottom: "25px" };

    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm12">
          <h2 style={title_style}>Create an Event{(page !== undefined) && this.renderPage(page)}</h2>
        </div>
      </div>
    );
  }
}