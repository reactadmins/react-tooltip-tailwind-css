import { Fragment, createContext, useContext, useState } from "react";

export const TooltipProviderContext = createContext();

function TooltipProvider({ children }) {
    const [isTooltip, setIsTooltip] = useState(false);
    return (
        <TooltipProviderContext.Provider value={{ isTooltip, setIsTooltip }}>
            {children}
        </TooltipProviderContext.Provider>
    );
}

function Tooltip({ children }) {
    return (
        <div
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "max-content",
            }}
        >
            {children}
        </div>
    );
}

function TooltipTrigger({ className, children }) {
    const { setIsTooltip } = useContext(TooltipProviderContext);

    return (
        <div
            style={{ width: "max-content" }}
            className={`${className ? className : ""}`}
            onMouseOver={() => setIsTooltip(true)}
            onMouseOut={() => setIsTooltip(false)}
        >
            {children}
        </div>
    );
}

function TooltipContent({ position = "top", children, className }) {
    const { isTooltip } = useContext(TooltipProviderContext);

    return (
        <Fragment>
            {isTooltip ? (
                <div
                    style={{
                        position: "absolute",
                        top: `${position === "top" ? "-50px" : ""}`,
                        bottom: `${position === "bottom" ? "-50px" : ""}`,
                        left: `${position === "left" ? "-140px" : ""}`,
                        right: `${position === "right" ? "-140px" : ""}`,
                        width: "max-content",
                    }}
                    className={`${className ? className : ""}`}
                >
                    {children}
                </div>
            ) : null}
        </Fragment>
    );
}

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
