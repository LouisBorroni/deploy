import { ComponentPropsWithoutRef, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './TextArea.css'
import { IconProp } from "@fortawesome/fontawesome-svg-core";


export const TextArea: FC<ComponentPropsWithoutRef<"textarea"> & { icon?: IconProp}
> = ({
    icon,
    ...props
}) => {
    return(
        <div className="custom-textarea">
            {icon && <FontAwesomeIcon icon={icon} className="icon"/>}
            <textarea className="textarea" {...props} />
        </div>
    );
};