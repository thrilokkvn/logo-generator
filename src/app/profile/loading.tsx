import { HashLoader } from "react-spinners";

export default function Loading() {
    return (
            <div className="min-h-screen flex justify-center items-center">
                <HashLoader color="oklch(49.6% 0.265 301.924)" />
            </div>
        );
}