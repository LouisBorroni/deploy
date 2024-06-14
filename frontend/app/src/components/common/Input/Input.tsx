import { ComponentPropsWithoutRef, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Input.css'
import { IconProp } from "@fortawesome/fontawesome-svg-core";


export const Input: FC<ComponentPropsWithoutRef<"input"> & { icon?: IconProp}
> = ({
    icon,
    ...props
}) => {
    return(
        <div className="custom-input">
            {icon && <FontAwesomeIcon icon={icon} className="icon"/>}
            <input className="input" {...props} />
        </div>
    );
};