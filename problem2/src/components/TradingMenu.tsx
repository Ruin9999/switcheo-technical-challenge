import { useState } from "react";
import { FaArrowsUpDown } from "react-icons/fa6";

import Modal from "./Modal";
import Input from "./CustomInput";
import Button from "./CutomButton";

function TradingMenu() {

    let currencies = {
        "BLUR": 0.20811525423728813,
        "bNEO": 7.1282679,
        "BUSD": 0.999183113,
        "USD": 0.9998782611186441,
        "ETH": 1,
        "GMX": 1645.9337373737374,
        "STEVMOS" : 0.07276706779661017,
        "LUNA" : 0.40955638983050846,
        "RATOM" : 10.250918915254237,
        "STRD" : 0.7386553389830508,
        "EVMOS" : 0.06246181355932203,
        "IBCX" : 41.26811355932203,
        "IRIS" : 0.0177095593220339,
        "ampLUNA" : 0.49548589830508477,
        "KUJI" : 0.675,
        "STOSMO" : 0.431318,
        "USDC" : 0.989832,
        "axlUSDC" : 0.989832,
        "ATOM" : 7.186657333333334,
        "STATOM" : 8.512162050847458,
        "OSMO" : 0.3772974333333333,
        "rSWTH" : 0.00408771,
        "STLUNA" : 0.44232210169491526,
        "LSI" : 67.69661525423729,
        "OKB" : 42.97562059322034,
        "OKT" : 13.561577966101694,
        "SWTH" : 0.004039850455012084,
        "USC" : 0.994,
        "WBTC" : 26002.82202020202,
        "wstETH" : 1872.2579742372882,
        "YieldUSD" : 1.0290847966101695,
        "ZIL" : 0.01651813559322034,
    }


    const [from, setFrom] = useState(Object.keys(currencies)[0]);
    const [to, setTo] = useState(Object.keys(currencies)[0]);
    const [fromAmount, setFromAmount] = useState(0);
    const [toAmount, setToAmount] = useState(0);
    const [isConverted, setIsConverted] = useState(false);
    
    function handleSubmit(e : any) {
        setIsConverted(true);
    }

    function handleConversionRateDropdown() {
        let toAmount = fromAmount * currencies[to as keyof typeof currencies] / currencies[from as keyof typeof currencies];
        setToAmount(toAmount);
    }

    function handleConversionRate(e : any) {
        let amount = e.target.value;
        let toAmount = amount * currencies[to as keyof typeof currencies] / currencies[from as keyof typeof currencies];
        setFromAmount(amount);
        setToAmount(toAmount);
    }

    function handleSwitch() {
        let prevFrom = from;
        let prevTo = to;
        let prevFromAmount = fromAmount;
        let prevToAmount = toAmount;
        setFromAmount(prevToAmount);
        setToAmount(prevFromAmount);
        setFrom(prevTo);
        setTo(prevFrom);
    }
    
    return(
        <>
        {
            //Create a modal
            isConverted ? <Modal fromAmount={fromAmount} toAmount={toAmount} from={from} to={to} handleClose={() => setIsConverted(false)}/> : null
        }
        <section className="h-screen pt-16 px-10 text-white font-bold">
            <div className="grid grid-rows-12 h-full justify-center items-center gap-5">
                <div className="grid row-start-5 grid-cols-12 gap-3">
                    <div className="flex flex-col gap-5 col-span-12 sm:col-span-10 ">
                        <Input title="From" 
                                type="number" 
                                description={`${currencies[from as keyof typeof currencies]}`}
                                subtext={`Balance : 10.0000 ${from}`} 
                                placeholder="0" 
                                dropdownValue={from} 
                                inputValue={fromAmount} 
                                onChange={handleConversionRate} 
                                options={Object.keys(currencies)} 
                                onDropdownChange={(e : any) => {setFrom(e.target.value); handleConversionRateDropdown()}} />
                        <Button className="block sm:hidden" 
                                onClick={() => handleSwitch()} 
                                icon={<FaArrowsUpDown 
                                className="w-5 h-5 sm:w-10 sm:h-10" size="32" />} />
                        <Input title="To" 
                                type="number" 
                                disabled={true} 
                                description={`${currencies[to as keyof typeof currencies]}`}
                                subtext={`Balance : 10.0000 ${to}`} 
                                placeholder="0" 
                                dropdownValue={to} 
                                inputValue={toAmount} 
                                onChange={(e : any) => setToAmount(e.target.value)} 
                                options={Object.keys(currencies)} 
                                onDropdownChange={(e : any) => {setTo(e.target.value); handleConversionRateDropdown()}} />
                    </div>
                    <div className="hidden sm:block sm:col-span-2">
                        <Button onClick={() => handleSwitch()} icon={<FaArrowsUpDown size="32" />} />
                    </div>
                </div>
                <div className="h-10 w-full row-start-11 sm:row-start-7 mt-10">
                    <Button title="Convert" onClick={handleSubmit}/>   
                </div>
            </div>            
        </section>
        </>
    )
}

export default TradingMenu;