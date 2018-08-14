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
    let { food_provider, food_provider_error, onChange } = this.props;

    return (
      <TextField
        label={"Food Provider"}
        placeholder={"Jimmy Johns"}
        field={"food_provider"}
        value={food_provider}
        onChange={onChange}
        error={food_provider_error}
      />
    );
  }

  renderDrink() {
    // Renders the text input field for alcohol providers
    let { alcohol_provider, alcohol_provider_error, onChange } = this.props;

    return (
      <TextField
        label={"Drink Provider"}
        placeholder={"Liquor Downtown"}
        field={"alcohol_provider"}
        value={alcohol_provider}
        onChange={onChange}
        error={alcohol_provider_error}
      />
    );
  }

  renderProviders() {
    // Renders a div with both food and alcohol
    return (
      <div
        className="ms-slideRightIn20 ms-slideLeftOut20" 
        style={{marginLeft: "auto", width: "50%"}}
      >
        {this.renderFood()}
        {this.renderDrink()}
      </div>
    );
  }

  render() {
    let { food_drink_required, food_drink_error, onChange } = this.props;

    // Styles the row 
    const row_styles = {
      "padding"       : "0px 8px",
      "boxSizing"     : "border-box",
      "display"       : "flex",
      "justifyContent": "flex-start",
      "flexDirection" : "row",
      "minHeight"     : "125px"
    }

    return (
      <div className="ms-Grid-row" style={row_styles}>
        <div>
          <Toggle
            defaultChecked={false}
            label={"Will you provide food or drinks?"}
            onText="Yes"
            offText="No"
            onChanged={(evt) => onChange('food_drink_required', evt)}
          />
          {food_drink_required && 
            <span style={{marginTop: "20px"}}>{food_drink_error}</span>
          }
        </div>
          { // Only show the food + drink inputs if toggle is true
            food_drink_required && this.renderProviders()
          }
      </div>
    );
  }
}