import { SetStateAction } from "react"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { logoDetails } from "@/types"

export const SelectElement = ({ label, placeholder, arrayelements, value, setLogoDetails, name }: { label: string, placeholder: string, arrayelements: string[], value:string, name:string, setLogoDetails: React.Dispatch<SetStateAction<logoDetails>> }) => {
    return (
        <div className="flex flex-col items-start gap-2 mt-3">
            <Label className="font-semibold">{label}</Label>
            <Select onValueChange={(val) => {
                setLogoDetails((prev) => ({
                    ...prev,
                    [name]: val,
                }))
            }} value={value}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {arrayelements.map((each, index) => (
                        <SelectItem key={index} value={each}>{each}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}