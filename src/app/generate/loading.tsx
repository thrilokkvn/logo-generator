import { HashLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
            <HashLoader color="text-foreground"/>
        </div>
    )
}