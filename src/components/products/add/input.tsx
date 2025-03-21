
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
                className="w-full bg-transparent rounded-md
                h-10 focus:outline-none ring-1 focus:ring-2 transition
                ring-neutral-200 focus:ring-cyan-500 broder-none
                placeholder:text-neutral-400 p-2
                "
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