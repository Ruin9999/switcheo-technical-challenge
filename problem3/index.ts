import React, { useEffect, useMemo, useState } from 'react';
import Datasource from './datasource';

interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface WalletPageProps { //Renamed Props to WalletPageProps for better readability
  children?: React.ReactNode
}

function useWalletBalances() {

}

const WalletPage: React.FC<WalletPageProps> = (props: WalletPageProps) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
	const [prices, setPrices] = useState({});

  useEffect(() => {
    const datasource = new Datasource("https://interview.switcheo.com/prices.json");
    datasource.getPrices().then(prices => {
      setPrices(prices);
    }).catch(error => {
      console.error(error); //Fixed the console.err to console.error
    });
  }, []);

	const getPriority = (blockchain: string): number => { //Changed blockchain type from any to string
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances
    .filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (balancePriority > -99) { //Renamed variable from lhsPriority to balancePriority
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={prices[balance.currency] * balance.amount} //Removed usdValue and move it into here
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}

export default WalletPage; //Added export