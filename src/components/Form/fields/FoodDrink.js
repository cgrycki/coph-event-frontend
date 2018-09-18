// Dependencies
import React          from 'react';
import { Toggle }     from 'office-ui-fabric-react/lib/Toggle';
import { Link }       from 'office-ui-fabric-react/lib/Link';
import { TextField }  from 'office-ui-fabric-react/lib/TextField';
import LabelRender    from '../../common/LabelRender';


/**
 * Renders the Food/Alcohol form row and inputs
 */
export default class FoodDrink extends React.PureComponent {
  renderLabel = (label, info, required) => {
    return (<LabelRender label={label} info={info} required={required} />);
  }

  renderFood() {
    // Renders the text input field for food providers
    const { 
      food_provider, food_provider_error, 
      food_drink_required, onChange
    } = this.props;

    // Information callout
    const label = 'Food Provider';
    const info  = 'Please note, food is not allowed in CPHB classrooms or computer labs. If you are planning an event that includes food, please reserve C217 or the Atrium when completing your event request.';

    return (
      <TextField
        onRenderLabel={() => this.renderLabel(label, info, food_drink_required)}
        placeholder={food_drink_required ? "e.g. Jimmy Johns" : ""}
        value={food_provider}
        onChange={evt => onChange('food_provider', evt.target.value)}
        errorMessage={food_provider_error}
        disabled={!food_drink_required}
      />
    );
  }

  renderDrink() {
    // Renders the text input field for alcohol providers
    const { 
      alcohol_provider, alcohol_provider_error, 
      food_drink_required, onChange
    } = this.props;

    // Label information
    const label = 'Alcohol Provider';
    const info2  = 'If you will be requesting that alcohol be served at your event, please note that a liquor approval form must be filled out and approved by the Vice President of Student Services.' +
    "\n\n" +
    'The form is started with a Catering Coordinator in 154 IMU or by calling (319) 335-3116. For additional information regarding policies on serving alcohol ';
    
    const alink = <Link href='https://opsmanual.uiowa.edu/administrative-financial-and-facilities-policies/alcoholic-beverage-service-guidelines-and'>please see here.</Link>
    const info = (<p>{info2}{alink}</p>);


    return (
      <TextField
        onRenderLabel={() => this.renderLabel(label, info, food_drink_required)}
        placeholder={food_drink_required ? "e.g. IMU" : ""}
        value={alcohol_provider}
        onChange={evt => onChange('alcohol_provider', evt.target.value)}
        errorMessage={alcohol_provider_error}
        disabled={!food_drink_required}
      />
    );
  }

  renderProviders() {
    // Renders a div with both food and alcohol
    return (
      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg8 ms-xl7 ms-xlPush1 ms-slideRightIn20 ms-slideLeftOut20">
        {this.renderFood()}
        {this.renderDrink()}
      </div>
    );
  }

  render() {
    let { food_drink_required, food_drink_error, onChange } = this.props;

    // Styles the row 
    const row_styles = {
      "boxSizing"     : "border-box",
      "display"       : "flex",
      "justifyContent": "flex-start",
      "flexDirection" : "row",
      "minHeight"     : "125px"
    }

    return (
      <div className="ms-Grid-row" style={row_styles}>
        <div className="ms-Grid-col ms-sm8 ms-md8 ms-lg4 ms-xl4 ms-xxl4">
          <Toggle
            defaultChecked={false}
            label={"Will you provide food and/or alcohol?"}
            onText="Yes"
            offText="No"
            onChanged={(evt) => onChange('food_drink_required', evt)}
          />
          {food_drink_required && 
            <span style={{marginTop: "20px", color: 'rgb(168, 0, 0)'}}>
              {food_drink_error}
            </span>}
        </div>
        {this.renderProviders()}
      </div>
    );
  }
}