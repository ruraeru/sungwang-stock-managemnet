
import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps {
    name: string;
    errors: string[] | undefined;
}

const _Input = ({ name, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div>
            <input
                ref={ref}
                name={name}
                className="w-full text-black"
                {...rest}
            />
            {errors?.map((error, index) => (
                <span key={index} className="text-red-500 font-medium">
                    {error}
                </span>
            ))}
        </div>
    )
}

export default forwardRef(_Input);