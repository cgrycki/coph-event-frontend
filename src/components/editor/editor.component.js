/*
 * Form Component
 */
import React from 'react';
import { connect } from 'react-redux';
import { GuiContainer, HudContainer, ToolbarContainer } from '../../containers';

export default class Editor extends React.Component {
  render() {
    return (
      <div>
        <ToolbarContainer/>
        <HudContainer/>
        <GuiContainer/>
      </div>
    );
  }
}