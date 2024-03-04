interface InputProps {
    title: string,
    onChange: any,
    subtext?: string,
    placeholder?: string,
    type?: string,
    options?: string[],
    onDropdownChange?: any,
    dropdownValue?: string,
    inputValue?: string | number,
    disabled?: boolean,
    description?: string,
}

function Input(props: InputProps) {

    return(
        <div className="grid grid-rows-2 w-full">
            <div className="flex flex-row gap-2 items-baseline justify-between">
                <div className="flex items-baseline gap-2 text-slate-400">
                    <p className="text-xl">{props.title}</p>
                    <p className="text-xs">{props.description}</p>
                </div>
                <p className="text-xs text-slate-400">{props.subtext}</p>
            </div>
            <div className="grid grid-cols-6 gap-2">
                <div className={`${props.options ? "col-span-5" : "col-span-6"}`}>
                    <input disabled={props.disabled} onChange={props.onChange} value={props.inputValue} className="w-full h-10 px-2 bg-slate-800 rounded-md" type={props.type} placeholder={props.placeholder} />
                </div>
                <div className="col-span-1">
                {props.options ? <select value={props.dropdownValue} className="w-full h-10 bg-slate-800 rounded-md text-slate-400 hover:bg-slate-600 hover:shadow-lg transition-all duration-300" onChange={props.onDropdownChange}>
                    {props.options.map((option, index) => {
                        return <option className="text-center" key={index} value={option}>{option}</option>
                    })}
                </select> : null}
                </div>
            </div>
        </div>
    )
}
          
export default Input;