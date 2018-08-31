// Dependencies
import React        from 'react';
import { Toggle }   from 'office-ui-fabric-react';
import TextField    from '../../common/TextField';


/**
 * Renders the Food/Alcohol form row and inputs
 */
export default class FoodDrink extends React.PureComponent {
  renderFood() {
    // Renders the text input field for food providers
    let { 
      food_provider, food_provider_error, 
      food_drink_required, onChange } = this.props;

    return (
      <TextField
        label={"Food Provider"}
        placeholder={food_drink_required ? "Jimmy Johns" : ""}
        field={"food_provider"}
        value={food_provider}
        onChange={onChange}
        error={food_provider_error}
        disabled={!food_drink_required}
        required={food_drink_required}
      />
    );
  }

  renderDrink() {
    // Renders the text input field for alcohol providers
    let { 
      alcohol_provider, alcohol_provider_error, 
      food_drink_required, onChange } = this.props;

    return (
      <TextField
        label={"Drink Provider"}
        placeholder={food_drink_required ? "Liquor Downtown" : ""}
        field={"alcohol_provider"}
        value={alcohol_provider}
        onChange={onChange}
        error={alcohol_provider_error}
        disabled={!food_drink_required}
        required={food_drink_required}
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
            label={"Will you provide food or drinks?"}
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