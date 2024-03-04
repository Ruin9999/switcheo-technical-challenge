import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ModalProps {
    handleClose: any,
    fromAmount: number, 
    toAmount: number,
    from: string,
    to: string,
}

function Modal(props : ModalProps) {
    const modal = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
       gsap.from(modal.current, {
        height: "0",
        width: "0",
        duration: 0.05,
       })
    });

    return (
        <>
        <div className="fixed flex justify-center items-center h-screen w-screen bg-black bg-opacity-50 z-50 text-white font-bold">
            <div ref={modal} className="flex flex-col gap-5 w-fit h-fit bg-slate-800 rounded-md p-10 justify-center item-center text-center overflow-hidden">
                <h1 className="text-2xl sm:text-3xl">Conversion Successful</h1>
                <p className="text-center">You have successfully converted</p>
                <p>{props.fromAmount} {` ${props.from}`}</p>
                <p> to </p>
                <p>{props.toAmount} {` ${props.to}`}</p>
                <div className="flex justify-center items-center h-10 w-full">
                    <button onClick={props.handleClose} className="w-1/2 h-10 bg-gradient-to-r from-violet-800 to-purple-800 rounded-md hover:shadow-lg transition-all duration-300">Close</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Modal;