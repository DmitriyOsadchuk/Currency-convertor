import {useState, useEffect} from "react";
import './styles.scss';
import axios from "axios";
import { format } from "../../utils/format";



function Header() {
    const [amountEUR, setAmountEUR] = useState({"UAH": 0});
    const [amountUSD, setAmountUSD] = useState({"UAH": 0});


    useEffect(() => {
        getCurrencyEUR()
        getCurrencyUSD()
    }, []);

    const getCurrencyUSD = () => {
        axios.get('https://api.fastforex.io/fetch-multi?from=EUR&to=UAH&api_key=dcd5380ca7-81a5771549-rcqwq3')
        .then(response => {
          setAmountEUR(response.data.results);
        })
        .catch((error) => {
          console.log(error);
      });
    }
    const getCurrencyEUR = () => {
      axios.get('https://api.fastforex.io/fetch-multi?from=USD&to=UAH&api_key=dcd5380ca7-81a5771549-rcqwq3')
      .then(response => {
        setAmountUSD(response.data.results);
      })
      .catch((error) => {
        console.log(error);
    });
    }

  
  return (
    <div className="header">
      <div className="header__logo">Currencies :</div>
        <p className="header__item">{`EUR - ${format(amountEUR.UAH)} UAH`}</p>
        <p className="header__item">{`USD - ${format(amountUSD.UAH)} UAH`}</p>
      </div>
    
  );
}

export default Header;