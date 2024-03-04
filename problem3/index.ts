import React, { useState, useEffect, useMemo } from 'react';

interface WalletBalance {
    currency: string,
    amount: number,
}

interface FormattedWalletBalance {
    currency: string,
    amount: number,
    formatted: string,
}

class Datasource {
    constructor(private url: string) {}

    async getPrices() {
        const response = await fetch(this.url);
        const json = await response.json();
        return json;
    }
}

interface Props extends BoxProps {

}

function useWalletBalances() {

}

const WalletPage: React.FC<Props> = (props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const datasource = new Datasource("https://interview.switcheo.com/prices.json");
        datasource.getPrices().then(prices => {
        setPrices(prices);
        }).catch(error => {
        console.error(error);
    });

    const getPriority = (blockchain: string) : number => { //Changing of any type to string
        switch(blockchain) {
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
    }, [])

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
              const balancePriority = getPriority(balance.blockchain);
              if (lhsPriority > -99) {
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
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow 
            className={classes.row}
            key={index}
            amount={balance.amount}
            usdValue={usdValue}
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