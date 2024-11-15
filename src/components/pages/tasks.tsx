import Navbar from "../custom/navbar";
import TaskCard from "../custom/task-card";
import { Accordion } from "../ui/accordion";

export default function Tasks() {
    return (
        <div>
            <Navbar />
            <div className="px-2 py-2 sm:px-20 sm:py-10">
                <p className="text-2xl font-bold mb-5">Tasks</p>
                <Accordion type="multiple" className="w-full">
                    <TaskCard value="item-1" />
                    <TaskCard value="item-2" />
                    <TaskCard value="item-3" />
                    <TaskCard value="item-4" />
                    <TaskCard value="item-5" />
                </Accordion>
            </div>
        </div>
    );
}