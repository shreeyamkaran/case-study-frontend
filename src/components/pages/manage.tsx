import { CalendarDays, Check, CircleCheckBig, Clock, Settings, ShieldCheck, Star, X } from "lucide-react";
import Navbar from "../custom/navbar";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Fragment, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEmployeesUnderManager, fetchProjectByManagerId } from "@/redux/managerSlice";
import { fetchTasks, setTaskRating } from "@/redux/taskSlice";
import { fetchEmployeeDetails, fetchEmployeeSkillsAndRatings } from "@/redux/employeeSlice";

export default function Manage() {
    const [activeId, setActiveId] = useState<string>("");
    const [activeView, setActiveView] = useState<string>("");

    const dispatch: AppDispatch = useDispatch();
    const employeesUnderManager= useSelector((state: RootState) => state.manager.employeesUnderManager);
    const currentProject = useSelector((state: RootState) => state.manager.projectUnderManager);
    const loading = useSelector((state: RootState) => state.manager.loading);
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const taskLoading = useSelector((state: RootState) => state.task.loading);
    const activeEmployee = useSelector((state: RootState) => state.employee.employeeDetails);
    const employeeLoading = useSelector((state: RootState) => state.employee.loading);
    const employeeSkillsAndRatings = useSelector((state: RootState) => state.employee.skillsAndRatings);

    useEffect(() => {
        dispatch(fetchProjectByManagerId(3));
        dispatch(fetchEmployeesUnderManager(3));
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

    const getColor = (appraisalStatus: string) => {
        switch(appraisalStatus) {
            case "DID_NOT_APPLY": return "text-primary";
            case "PENDING": return "text-yellow-400";
            case "APPROVED": return "text-green-400";
            case "REJECTED": return "text-red-400";
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, taskId: number) => {
        let newRating = Number(event.target.value);
        if(newRating > 5) {
            newRating = 5;
        } // Get the new rating value
        // Dispatch action to update the rating of the task in Redux store
        dispatch(setTaskRating({ taskId, newRating }));
    };

    const handleClick = async (taskId: number) => {
        const task = tasks.find(task => task.id == taskId);
        const taskRatings = task?.ratings;
        const numberOfRatings = task?.numberOfRatings;
        console.log("taskId = " + taskId);
        console.log("taskRatings = " + taskRatings);
        const url = (numberOfRatings == 0) ? `http://localhost:8080/api/v1/tasks/rateTask/${ taskId }` : `http://localhost:8080/api/v1/tasks/updateTaskRating/${ taskId }`;
        try {
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskRatings)
            });
        }
        catch(error) {
            console.log(error);
        }
    }

    if(loading) {
        return (
            <Fragment>
                <Navbar />
                <div className="px-2 py-2 sm:px-20 sm:py-10">
                    <div className="flex flex-col gap-4">
                        <p className="text-2xl font-bold">Manage Employees</p>
                        <div className="mb-5 flex items-center gap-1">Working on project <Badge>{ currentProject?.name }</Badge></div>
                        <div>Loading...</div>
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <div>
            <Navbar />
            <div className={ `px-2 py-2 sm:px-20 sm:py-10 ${ activeId && "grid grid-cols-[1fr,2fr] gap-8" }` }>
                <div>
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl font-bold">Manage Employees</p>
                        <div className="mb-5 flex items-center gap-1">Working on project <Badge>{ currentProject?.name }</Badge></div>
                    </div>
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
                                                <Button size="sm" id={ `${ object.id }-tasks` } onClick={ event => viewEmployeesTasks(event) }><Settings /></Button>
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
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold">Employee Details</p>
                                            <div className="flex gap-4">
                                                <Button size="sm" id={ `${ activeId }-details` } onClick={ event => viewEmployeesDetails(event) }><Star /></Button>
                                                <Button size="sm" id={ `${ activeId }-tasks` } onClick={ event => viewEmployeesTasks(event) }><Settings /></Button>
                                            </div>
                                        </div>
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
                                                    <TableCell>Date of Joining</TableCell>
                                                    <TableCell>{ formatdate(activeEmployee.doj) }</TableCell>
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
                                                                    <TableRow key={ index }>
                                                                        <TableCell>{ object.name }</TableCell>
                                                                        <TableCell>{ object.category }</TableCell>
                                                                        <TableCell>
                                                                            <div className="flex items-center gap-1">
                                                                                <p>{ object.rating }</p>
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
                                                            tasks.filter(task => task.projectId == currentProject?.id).map((object, index) => {
                                                                return (
                                                                    <AccordionItem key={ index } value={ `item-${ index + 1 }` }>
                                                                        <AccordionTrigger>
                                                                            <div className="flex justify-between items-center w-full px-2 sm:px-10">
                                                                                <div className="flex items-center gap-2">
                                                                                    <ShieldCheck className={ `${ getColor(object.appraisalStatus) }` } />
                                                                                    <p className="text-lg">{ object.title }</p>
                                                                                </div>
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
                                                                            <div className="flex flex-col gap-4 px-2 sm:px-10">
                                                                                <p>{ object.description }</p>
                                                                                <div className="flex gap-4 items-end">
                                                                                    <div>
                                                                                        <div className="flex">
                                                                                            <Input type="number" className="max-w-32 rounded-tr-none rounded-br-none" placeholder="Rate this task" value={ object.ratings } onChange={ event => handleChange(event, object.id) } />
                                                                                            <Button className="rounded-tl-none rounded-bl-none" onClick={ event => handleClick(object.id) }><CircleCheckBig /></Button>
                                                                                        </div>
                                                                                    </div>
                                                                                    {
                                                                                        object.appraisalStatus != "DID_NOT_APPLY" &&
                                                                                        <Fragment>
                                                                                            <Button disabled={ object.appraisalStatus == ("APPROVED" || "REJECTED") }><Check />Approve</Button>
                                                                                            <Button variant="destructive" disabled={ object.appraisalStatus == ("APPROVED" || "REJECTED") }><X />Reject</Button>
                                                                                        </Fragment>
                                                                                    }
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