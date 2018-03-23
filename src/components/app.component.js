import React from 'react';
import { Fabric, CommandBar } from 'office-ui-fabric-react';
import { FormContainer, ToolbarContainer, HudContainer, GuiContainer } from '../containers';

const App = () => {
  return (
    <Fabric className="App ms-normalize">
      <div className="ms-Grid">

        {/* Navigation bar + header */}
        <header id="page-header" className="ms-Grid-row ms-Grid-col ms-sm12">
          <div id="brand-name" className="ms-font-xxl ms-fontColor-neutralPrimary">
            Create an Event &nbsp;
            <small className="ms-font-l ms-fontColor-neutralTertiary">College of Public Health</small>
          </div>
        </header>

        {/* Application */}
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <FormContainer />

            <br/>

            <HudContainer />
          </div>

          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg8">
            <ToolbarContainer />

            <br/>
            
            <GuiContainer />
          </div>
        </div>
      </div>
    </Fabric>
  );
}

export default App;
