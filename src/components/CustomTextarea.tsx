import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

export const CustomTextarea = ({title, value, id, placeholder, onChange, name} : {title: string, id:string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, value: string, name: string}) => {
    return (
        <div className="flex flex-col items-start gap-3 mt-3">
            <Label className="font-semibold" htmlFor={id}>{title}</Label>
            <Textarea name={name} className="resize-none h-25" id={id} placeholder={placeholder} onChange={onChange} value={value}/>
        </div>
    )
}