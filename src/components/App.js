import {useState, useEffect} from "react";
import './styles.scss';
import '../assets/styles/globalStyles.scss';
import axios from "axios";
import Header from './header/header';
import CurrencyInput from "./currencyInput/currencyInput";
import { format } from "../utils/format";

function App() {

  const [amountFirst, setAmountFirst] = useState(1);
  const [amountLast, setAmountLast] = useState(1);
  const [currencyFirst, setCurrencyFirst] = useState('USD');
  const [currencyLast, setCurrencyLast] = useState('UAH');

  const [rates, setRates] = useState([]);
  
  useEffect(() => {
    axios.get(`https://api.fastforex.io/fetch-all?api_key=dcd5380ca7-81a5771549-rcqwq3`)
      .then(response => {
        setRates(response.data.results);
      })
      .catch((error) => {
        console.log(error);
    });

  }, []);

 
  useEffect(() => {
    if (!!rates) {
      function init() {
        handleAmountFirstChange(1);
      }
      init();
    }
  }, [rates]);


  const handleAmountFirstChange = amountFirstValue => {
    setAmountLast(format(amountFirstValue * rates[currencyLast] / rates[currencyFirst]));
    setAmountFirst(amountFirstValue);
  }

  const handleCurrencyFirstChange = currencyFirstValue => {
    setAmountLast(format(amountFirst * rates[currencyLast] / rates[currencyFirstValue]));
    setCurrencyFirst(currencyFirstValue);
  }

  const handleAmountLastChange = amountLastValue => {
    setAmountFirst(format(amountLastValue * rates[currencyFirst] / rates[currencyLast]));
    setAmountLast(amountLastValue);
  }

  const handleCurrencyLastChange = currencyLastValue => {
    setAmountFirst(format(amountLast * rates[currencyFirst] / rates[currencyLastValue]));
    setCurrencyLast(currencyLastValue);
  }


  return (
    <div className="App">
      <Header />

      <h1>Currency Converter</h1>
      
      <CurrencyInput
        onAmountChange={handleAmountFirstChange}
        onCurrencyChange={handleCurrencyFirstChange}
        currencies={Object.keys(rates)}
        amount={amountFirst}
        currency={currencyFirst} />
      <CurrencyInput
        onAmountChange={handleAmountLastChange}
        onCurrencyChange={handleCurrencyLastChange}
        currencies={Object.keys(rates)}
        amount={amountLast}
        currency={currencyLast} />
    </div>
  );
}

export default App;
