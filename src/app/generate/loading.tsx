import { HashLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
            <HashLoader color="rgba(115, 17, 242, 1)" />
        </div>
    )
}