import { HashLoader } from "react-spinners";

export default function Loading() {
    return (
            <div className="min-h-screen flex justify-center items-center">
                <HashLoader color="rgba(115, 17, 242, 1)" />
            </div>
        );
}