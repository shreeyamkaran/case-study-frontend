import Navbar from "../custom/navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { ShieldCheck, CalendarDays, Clock, Pencil, Trash2, CalendarIcon } from 'lucide-react';
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { format } from "date-fns";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";

export default function Tasks() {
    const [date, setDate] = useState<Date>()
    return (
        <div>
            <Navbar />
            <div className="px-2 py-2 sm:px-20 sm:py-10">
                <p className="text-2xl font-bold mb-5">Tasks</p>
                <Accordion type="multiple" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <div className="flex justify-between px-2 sm:px-20 items-center w-full">
                                <div className="flex gap-4">
                                    <ShieldCheck />
                                    <Badge>Training</Badge>
                                </div>
                                <p className="text-lg">Revised React Concepts</p>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={ 16 } />
                                        <p>8 November 2024</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={ 16 } />
                                        <p>5 minutes</p>
                                    </div>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="px-2 sm:px-20">
                                <p>Revised some react concepts by utilising the hooks such as useState, useEffect, useRef, etc. I also revised about context api hooks like useContext and managed complex states that, otherwise, requires props drilling and props lifting, in an easy way.</p>
                                <div className="overflow-x-auto">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="icon"><Pencil /></Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[525px]">
                                            <DialogHeader>
                                                <DialogTitle>Edit Task</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">Title</Label>
                                                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="username" className="text-right">Description</Label>
                                                    <Textarea className="col-span-3 row-span-2 resize-none" placeholder="Type your message here." />
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="username" className="text-right">Date</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
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
                                                    <Label htmlFor="name" className="text-right">Time (HH:MM)</Label>
                                                    <InputOTP maxLength={ 4 }>
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
                                                    <Label htmlFor="name" className="text-right">Title</Label>
                                                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Save changes</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="destructive" size="icon"><Trash2 /></Button>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}