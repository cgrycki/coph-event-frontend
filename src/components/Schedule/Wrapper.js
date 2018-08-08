import React from 'react';


export default Chart => (
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        containerWidth: null,
        containerHeight: null
      };

      this.fitParentContainer = this.fitParentContainer.bind(this);
    }

    componentDidMount() {
      /* When component mounts, size the container and add a listener. */
      this.fitParentContainer();
      window.addEventListener('resize', this.fitParentContainer);
    }

    componentWillUnmount() {
      /* When component unmounts, remove resize listener. */
      window.removeEventListener('resize', this.fitParentContainer);
    }

    fitParentContainer() {
      /* Sets component state based on div bounding rect dimensions. */
      const { containerWidth, containerHeight } = this.state;

      // Get dimensions of 
      const currentWidth = this.chartContainer.getBoundingClientRect().width;
      const currentHeight = this.chartContainer.getBoundingClientRect().height;

      // Don't rerender if we don't have to
      const shouldResize = 
        ((containerWidth !== currentWidth) || (containerHeight !== currentHeight));

      if (shouldResize) this.setState({
        containerWidth: currentWidth,
        containerHeight: currentHeight
      });
    }

    renderChart() {
      /* Renders a chart with our current dimensions and any props passed. */
      const { containerWidth, containerHeight } = this.state;

      return (
        <Chart 
          width={containerWidth}
          height={containerHeight}
          {...this.props}
        />
      );
    }

    render() {
      const { containerWidth, containerHeight } = this.state;
      const shouldRender = ((containerWidth !== null) && (containerHeight !== null));

      return (
        <div
          ref={(el) => { this.chartContainer = el }}
          className="Wrapper"
        >
          {shouldRender && this.renderChart()}
        </div>
      );
    }
  }
);