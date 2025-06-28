"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

export const InputBar = ({title, value, id, placeholder, type, onChange, name} : {title: string, id:string, placeholder: string, type:string, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, value: string, name:string}) => {
    return (
        <div className="flex flex-col items-start gap-3 mt-3">
            <Label className="font-semibold" htmlFor={id}>{title}</Label>
            <Input name={name} id={id} placeholder={placeholder} type={type} onChange={onChange} value={value}/>
        </div>
    )
}