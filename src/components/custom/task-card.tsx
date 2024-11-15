import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { ShieldCheck, CalendarDays, Clock, Trash2 } from 'lucide-react';
import { Button } from "../ui/button";
import TaskModal from "./task-modal";

interface TaskProps {
    value: string
}

export default function TaskCard({ value }: TaskProps) {
    return (
        <AccordionItem value={ value }>
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
                <div className="px-2 sm:px-20 flex flex-col gap-4">
                    <p>Revised some react concepts by utilising the hooks such as useState, useEffect, useRef, etc. I also revised about context api hooks like useContext and managed complex states that, otherwise, requires props drilling and props lifting, in an easy way.</p>
                    <div className="flex gap-2">
                        <TaskModal />
                        <Button variant="destructive" size="icon"><Trash2 /></Button>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}