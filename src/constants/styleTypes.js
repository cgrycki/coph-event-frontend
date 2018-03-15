const styleTypes = {
  unfocused: {
      fill: '#d9d9d9',
      stroke: '#252525',
      strokeWidth: 1
  },
  normal: {
      fill: '#969696',
      stroke: '#252525',
      strokeWidth: 1,
      shadowColor: 'black',
      shadowBlur: 1,
      shadowOpacity: 0.1,
      shadowOffset: {x: 0, y: 0}
  },
  focused: {
      fill: '#c6dbef',
      stroke: '#252525',
      strokeWidth: 2,
      shadowColor: 'black',
      shadowBlur: 3,
      shadowOpacity: 0.25,
      shadowOffset: {x: 1, y: 5}
  },
  error: {
      fill: '#fc9272',
      stroke: '#de2d26'
  }
};

export default styleTypes;