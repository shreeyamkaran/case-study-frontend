import { CalendarDays, Check, CircleCheckBig, Clock, Settings, Star, X } from "lucide-react";
import Navbar from "../custom/navbar";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Fragment, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployeesUnderManager } from "@/redux/managerSlice";
import { fetchTasks } from "@/redux/taskSlice";
import { fetchEmployeeDetails, fetchEmployeeSkillsAndRatings } from "@/redux/employeeSlice";

interface Employee {
    id: number,
    name: string,
    username: string,
    designation: {
        id: number,
        name: string,
        skills: [{
            id: number,
            name: string,
            category: string
        }]
    },
    dob: string,
    gender: string,
    doj: string,
    ratings: number,
    location: string
}

export default function Manage() {

    const [activeId, setActiveId] = useState<string>("");
    const [activeView, setActiveView] = useState<string>("");

    const dispatch: AppDispatch = useDispatch();
    const employeesUnderManager= useSelector((state: RootState) => state.manager.employeesUnderManager);
    const loading = useSelector((state: RootState) => state.manager.loading);
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const taskLoading = useSelector((state: RootState) => state.task.loading);
    const activeEmployee = useSelector((state: RootState) => state.employee.employeeDetails);
    const employeeLoading = useSelector((state: RootState) => state.employee.loading);
    const employeeSkillsAndRatings = useSelector((state: RootState) => state.employee.skillsAndRatings);
    
    useEffect(() => {
        dispatch(fetchEmployeesUnderManager(5));
    }, []);

    useEffect(() => {
        dispatch(fetchTasks(Number(activeId)));
        dispatch(fetchEmployeeDetails(Number(activeId)));
        dispatch(fetchEmployeeSkillsAndRatings(Number(activeId)));
    }, [activeId]);

    const viewEmployeesDetails = (event: React.MouseEvent) => {
        const targetElement = event.target as HTMLElement;
        const targetElementId = targetElement.id;
        const employeeId = targetElementId.split('-')[0];
        setActiveId(targetElement.id);
        setActiveView("attributes");
        setActiveId(employeeId);
    }

    const viewEmployeesTasks = (event: React.MouseEvent) => {
        const targetElement = event.target as HTMLElement;
        const targetElementId = targetElement.id;
        const employeeId = targetElementId.split('-')[0];
        setActiveView("tasks");
        setActiveId(employeeId);
    }

    const formatdate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        return formattedDate;
    }

    if(loading) {
        return (
            <Fragment>
                <Navbar />
                <div className="px-2 py-2 sm:px-20 sm:py-10">
                    <p className="text-2xl font-bold mb-5">Manage Employees</p>
                    <div>Loading...</div>
                </div>
            </Fragment>
        );
    }

    return (
        <div>
            <Navbar />
            <div className={ `px-2 py-2 sm:px-20 sm:py-10 ${ activeId && "grid grid-cols-[1fr,2fr] gap-8" }` }>
                <div>
                    <p className="text-2xl font-bold mb-5">Manage Employees</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="font-bold">
                            {
                                employeesUnderManager.map(object => {
                                    return (
                                        <TableRow key={ object.id }>
                                            <TableCell>{ object.id }</TableCell>
                                            <TableCell>{ object.name }</TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button size="sm" id={ `${ object.id }-details` } variant="outline" onClick={ event => viewEmployeesDetails(event) }><Star /></Button>
                                                <Button size="sm" id={ `${ object.id }-tasks` } variant="outline" onClick={ event => viewEmployeesTasks(event) }><Settings /></Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                {
                    activeId && activeEmployee &&
                    (taskLoading || employeeLoading ? (
                            <div>Loading...</div>
                        ) : (
                            <Fragment>
                                <div className="flex flex-col gap-8">
                                    <div>
                                        <p className="font-bold">Employee Details</p>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-1/2">Attribute</TableHead>
                                                    <TableHead className="w-1/2">Details</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody className="font-bold">
                                                <TableRow>
                                                    <TableCell>Id</TableCell>
                                                    <TableCell>{ activeEmployee.id }</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>{ activeEmployee.name }</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Designation</TableCell>
                                                    <TableCell>{ activeEmployee.designation.name }</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Overall Rating</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <p>{ activeEmployee.ratings }</p>
                                                            <Star size={ 16 } />
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    {
                                        activeView == "attributes" ? (
                                            activeEmployee && employeeSkillsAndRatings &&
                                            <div>
                                                <p className="font-bold">Employee Skills</p>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Skill</TableHead>
                                                            <TableHead>Category</TableHead>
                                                            <TableHead>Avg Rating</TableHead>
                                                            <TableHead>Your Rating</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody className="font-bold">
                                                        {
                                                            employeeSkillsAndRatings.map((object, index) => {
                                                                return (
                                                                    <TableRow>
                                                                        <TableCell>{ object[0] }</TableCell>
                                                                        <TableCell>{ object[2] }</TableCell>
                                                                        <TableCell>
                                                                            <div className="flex items-center gap-1">
                                                                                <p>{ object[1] }</p>
                                                                                <Star size={ 16 } />
                                                                            </div>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Input type="number" className="max-w-24" />
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })
                                                        }
                                                        <TableRow>
                                                            <TableCell></TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell></TableCell>
                                                            <TableCell><Button size="sm"><CircleCheckBig /></Button></TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        ) : (
                                            tasks &&
                                            <div>
                                                <p className="font-bold">Employee Tasks</p>
                                                <div>
                                                    <Accordion type="multiple" className="w-full">
                                                        {
                                                            tasks.map((object, index) => {
                                                                return (
                                                                    <AccordionItem key={ index } value={ `item-${ index + 1 }` }>
                                                                        <AccordionTrigger>
                                                                            <div className="flex justify-between items-center w-full px-2 sm:px-10">
                                                                                <p className="text-lg">{ object.title }</p>
                                                                                <div className="flex flex-col gap-2">
                                                                                    <Badge className="flex items-center gap-2">
                                                                                        <CalendarDays size={ 16 } />
                                                                                        <p>{ formatdate(object.date) }</p>
                                                                                    </Badge>
                                                                                    <Badge className="flex items-center gap-2">
                                                                                        <Clock size={ 16 } />
                                                                                        <p>{ object.duration } minutes</p>
                                                                                    </Badge>
                                                                                </div>
                                                                            </div>
                                                                        </AccordionTrigger>
                                                                        <AccordionContent>
                                                                            <div className="flex flex-col gap-4">
                                                                                <p>{ object.description }</p>
                                                                                <div className="flex gap-4 items-end">
                                                                                    <div>
                                                                                        <Label>Rate this task</Label>
                                                                                        <div className="flex">
                                                                                            <Input type="number" className="max-w-24 rounded-tr-none rounded-br-none" />
                                                                                            <Button className="rounded-tl-none rounded-bl-none"><CircleCheckBig /></Button>
                                                                                        </div>
                                                                                    </div>
                                                                                    <Button><Check />Approve</Button>
                                                                                    <Button variant="destructive"><X />Reject</Button>
                                                                                </div>
                                                                            </div>
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                );
                                                            })
                                                        }
                                                    </Accordion>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </Fragment>
                        )
                    )
                }
            </div>
        </div>
    );
}