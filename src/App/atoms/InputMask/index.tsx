import { Input, InputProps } from "@hope-ui/solid"

interface InputMaskProps extends InputProps {
    mask?: Function
}

export default function InputMask(props: InputMaskProps) {

    let inputRef;

    function handleChange(e) {
        if (typeof props.mask === 'function') {
            e.target.value = props.mask(e.target.value)
        }
    }

    return <Input oninput={handleChange} {...props} ref={inputRef} />
}