import { colorPalettes } from "@/config/config";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { SetStateAction } from "react";
import { logoDetails } from "@/types";
import { ErrorMessage } from "./ErrorMessage";

export const ColorPalette = ({setLogoDetails, name, value, error} : {setLogoDetails: React.Dispatch<SetStateAction<logoDetails>>, name: string, value: string, error: string}) => {
    return (
        <div className="flex flex-col items-start gap-3 mt-5">
            <Label className="font-semibold mb-0 pb-0">Color Palette</Label>
            {error !== "" && <ErrorMessage message={error}/>}
            <RadioGroup className="space-y-3" onValueChange={(val) => {
                setLogoDetails((prev) => ({
                    ...prev,
                    [name]: val,
                }))
            }} value={value}>
            {colorPalettes.map((palette) => (
                <div key={palette.name} className="flex items-center space-x-3">
                    <RadioGroupItem value={palette.name} id={palette.name.toLowerCase()}/>
                    <Label htmlFor={palette.name.toLowerCase()} className="flex items-center space-x-3 cursor-pointer flex-1">
                        <span className="font-medium text-sm min-w-[120px]">
                            {palette.name}
                        </span>
                        <div className="flex space-x-1">
                            {palette.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="w-5 h-5 rounded-full shadow-sm"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                            ))}
                        </div>
                    </Label>
                </div>
            ))}
        </RadioGroup>
        </div>
    );
};
