import { Pencil, CalendarIcon } from 'lucide-react';
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { useState } from 'react';

export default function TaskModal() {
    const [date, setDate] = useState<Date>();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [time, setTime] = useState<string>("");
    const [project, setProject] = useState<string>("");
    const handleClick = () => {
        console.log("date", date);
        console.log("title", title);
        console.log("description", description);
        console.log("time", time);
        console.log("project", project);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon"><Pencil /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title-modal-textfield" className="text-right">Title</Label>
                        <Input id="title-modal-textfield" value={ title } className="col-span-3" onChange={ event => setTitle(event.target.value) } />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description-modal-textfield" className="text-right">Description</Label>
                        <Textarea id="description-modal-textfield" className="col-span-3 row-span-2 resize-none" placeholder="Type your message here." value={ description } onChange={ event => setDescription(event.target.value) } />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="date-modal-datepicker" className="text-right">Date</Label>
                        <Popover>
                            <PopoverTrigger asChild id="date-modal-datepicker">
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "col-span-3 justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time-modal-textfield" className="text-right">Time (HH:MM)</Label>
                        <InputOTP maxLength={ 4 } id="time-modal-textfield">
                            <InputOTPGroup>
                                <InputOTPSlot index={ 0 } />
                                <InputOTPSlot index={ 1 } />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={ 2 } />
                                <InputOTPSlot index={ 3 } />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="project-modal-dropdown" className="text-right">Project</Label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild id="project-modal-dropdown">
                                <Button variant="outline">Select one</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>List of Projects</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                    <DropdownMenuItem>Training</DropdownMenuItem>
                                    <DropdownMenuItem>Beesheets</DropdownMenuItem>
                                    <DropdownMenuItem>Destroy Earth</DropdownMenuItem>
                                    <DropdownMenuItem>Dragon Balls</DropdownMenuItem>
                                    <DropdownMenuItem>Surpass Goku</DropdownMenuItem>
                                    <DropdownMenuItem>Love 6 yrs olds</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-1">
                            <Checkbox id="checkbox-modal-appraisal" />
                            <Label htmlFor="checkbox-modal-appraisal" className="text-right">Mark for appraisal</Label>
                        </div>
                        <DialogClose asChild>
                            <Button type="submit" onClick={ handleClick }>Save changes</Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}