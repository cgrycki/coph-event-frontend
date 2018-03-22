import React from 'react';
import { Fabric, CommandBar } from 'office-ui-fabric-react';
import { FormContainer, ToolbarContainer, HudContainer, GuiContainer } from '../containers';

const App = () => {
  return (
    <Fabric className="App ms-normalize">
      <div className="ms-Grid">

        {/* Navigation bar + header */}
        <div className="ms-Grid-row">
          <CommandBar />
        </div>

        {/* Application */}
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
            <FormContainer />
          </div>

          <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg8">
            <ToolbarContainer />
            <HudContainer />
            <GuiContainer />
          </div>
        </div>
      </div>
    </Fabric>
  );
}

export default App;
