import { Badge } from "./ui/badge";

export const LogoStyleBadge = ({ logoStyle }: { logoStyle: string }) => {
    let logoStyleColor;

    switch (logoStyle) {
        case "Minimalist":
            logoStyleColor = "bg-blue-100 text-blue-400";
            break;
        case "Modern":
            logoStyleColor = "bg-gray-100 text-gray-600";
            break;
        case "Vintage":
            logoStyleColor = "bg-yellow-100 text-yellow-600";
            break;
        case "Playful":
            logoStyleColor = "bg-pink-100 text-pink-500";
            break;
        case "Elegant":
            logoStyleColor = "bg-purple-100 text-purple-600";
            break;
        case "Bold":
            logoStyleColor = "bg-red-100 text-red-600";
            break;
        case "Geometric":
            logoStyleColor = "bg-indigo-100 text-indigo-500";
            break;
        case "Organic":
            logoStyleColor = "bg-green-100 text-green-500";
            break;
        case "Tech/ Digital":
            logoStyleColor = "bg-blue-200 text-blue-500";
            break;
        case "Hand-drawn":
            logoStyleColor = "bg-orange-100 text-orange-500";
            break;
        default:
            logoStyleColor = "bg-gray-50 text-gray-400";
            break;
    }

    return <Badge className={`${logoStyleColor} px-2 py-1`}>{logoStyle}</Badge>;
};
