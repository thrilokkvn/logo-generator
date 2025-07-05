import { Badge } from "./ui/badge";

export const IndustryBadge = ({ industry }: { industry: string }) => {
    let industryColor;

    switch (industry) {
        case "Technology":
            industryColor = "bg-cyan-100 text-cyan-600";
            break;
        case "Healthcare":
            industryColor = "bg-teal-100 text-teal-600";
            break;
        case "Finance":
            industryColor = "bg-indigo-100 text-indigo-600";
            break;
        case "Education":
            industryColor = "bg-yellow-100 text-yellow-600";
            break;
        case "Retail":
            industryColor = "bg-pink-100 text-pink-500";
            break;
        case "Food & Beverage":
            industryColor = "bg-red-100 text-red-500";
            break;
        case "Real Estate":
            industryColor = "bg-blue-100 text-blue-600";
            break;
        case "Consulting":
            industryColor = "bg-gray-100 text-gray-600";
            break;
        case "Creative Services":
            industryColor = "bg-purple-100 text-purple-600";
            break;
        case "Manufacturing":
            industryColor = "bg-orange-100 text-orange-600";
            break;
        case "Non-profit":
            industryColor = "bg-green-100 text-green-600";
            break;
        case "Other":
            industryColor = "bg-slate-100 text-slate-500";
            break;
        default:
            industryColor = "bg-gray-50 text-gray-400";
            break;
    }

    return (
        <div className="flex flex-row items-center gap-2">
            <span className="font-semibold">Industry: </span> <Badge className={`${industryColor} px-2 py-1`}>{industry}</Badge>
        </div>
    )
};
