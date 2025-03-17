import { PhotoIcon } from "@heroicons/react/20/solid";

export default function Loading() {
    return (
        <div className="absolute w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-60 left-0 top-0">
            <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
                <div className="aspect-square bg-neutral-700 text-neutral-200 rounded-md p-5">
                    <div className="animate-pulse w-full h-full flex flex-col gap-2">
                        <div className="w-full h-full flex items-center justify-center border-4 border-dashed">
                            <PhotoIcon className="h-28" />
                        </div>
                        <div className="w-full">
                            <div className="w-full flex flex-col gap-2 *:rounded-full">
                                <div className="*:rounded-full flex items-center gap-2">
                                    <div className="w-10 h-5 bg-neutral-300" />
                                    <div className="w-20 h-5 bg-neutral-300" />
                                </div>
                                <div className="*:rounded-full flex items-center gap-2">
                                    <div className="w-10 h-5 bg-neutral-300" />
                                    <div className="w-20 h-5 bg-neutral-300" />
                                </div>
                                <div className="*:rounded-full flex items-center gap-2">
                                    <div className="w-10 h-5 bg-neutral-300" />
                                    <div className="w-20 h-5 bg-neutral-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}