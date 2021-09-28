import { useState } from "react";
import PureWS from "./socket/PureWS";

const AuthWhat = () => {

    const [open, setOpen] = useState(false);

    const openSocket = () => {
        setOpen(true);
    }

    return (
        <div>
        hellooo

        <button onClick={openSocket}>open socket</button>
        
        {
            (open) && (<PureWS />)
        }

        </div>
    );
}

export default AuthWhat;
