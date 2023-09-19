import { Select as SelectSolid, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import './style.css'

interface SelectProps {
    data?: Array<any>;
    placeholder?: string;
    class?: string;
    isCreateable?: boolean;
    onChange?: (value: any) => void;
}

export default function Select(props: SelectProps) {

    const options = createOptions(
        props.data,
        { createable: props.isCreateable }
    );

    return <SelectSolid {...options} {...props} class={`select ${props.class}`} />;
}