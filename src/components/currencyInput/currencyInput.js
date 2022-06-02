import PropTypes from "prop-types";
import './styles.scss';

function CurrencyInput(props) {
  return (
    <div className="group">
      <input className="group__input" type="text" value={props.amount} onChange={e => props.onAmountChange(e.target.value)} />
      <select className="group__select" value={props.currency} onChange={e => props.onCurrencyChange(e.target.value)}>
        {props.currencies.map((currency => (
          <option key={currency} value={currency}>{currency}</option>
          
        )))}
      </select>
    </div>
  );
}

CurrencyInput.propTypes = {
  amount: PropTypes.any.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;