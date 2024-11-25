import { CalendarDays, ClipboardCheck, Clock, Eye, ShieldCheck, Star, UserRound } from "lucide-react";
import Navbar from "../custom/navbar";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

// interface Employee {
//     id: number,
//     name: string,
//     username: string,
//     password: string,
//     designation: {

//     }
// }

export default function Admin() {

    const [activeId, setActiveId] = useState<number>(-1);
    const [activeView, setActiveView] = useState<string>("DETAILS");
    const [employees, setEmployees] = useState(null);

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/employees`);
                const data = await response.json();

            }
            catch(error) {

            }
            finally {

            }
        }
        fetchAllEmployees();
    }, []);

    const handleClick = (event: React.MouseEvent) => {
        const targetElement = event.target as HTMLElement;
        const targetElementId = targetElement.id;
        const employeeId = targetElementId.split('-')[0];
        setActiveId(Number(employeeId));
    }

    const handleUserDetails = () => {
        setActiveView("DETAILS");
    }

    const handleUserTasks = () => {
        setActiveView("TASKS");
    }

    return (
        <div>
            <Navbar />
            <div className={ `px-2 py-2 sm:px-20 sm:py-10 ${ activeId != -1 && "grid grid-cols-[1fr,2fr] gap-8" }` }>
                <div>
                    <p className="text-2xl font-bold">Admin Panel</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/3">Id</TableHead>
                                <TableHead className="w-1/3 text-center">Name</TableHead>
                                <TableHead className="w-1/3 text-right">View more</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="font-bold">
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell className="text-center">Shreeyam Karan</TableCell>
                                <TableCell className="flex justify-end">
                                    <Button size="sm" id="1-activeId" onClick={ event => handleClick(event) }><Eye /></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell className="text-center">Shreeyam Karan</TableCell>
                                <TableCell className="flex justify-end">
                                    <Button size="sm" id="2-activeId" onClick={ event => handleClick(event) }><Eye /></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell className="text-center">Shreeyam Karan</TableCell>
                                <TableCell className="flex justify-end">
                                    <Button size="sm" id="3-activeId" onClick={ event => handleClick(event) }><Eye /></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell className="text-center">Shreeyam Karan</TableCell>
                                <TableCell className="flex justify-end">
                                    <Button size="sm" id="4-activeId" onClick={ event => handleClick(event) }><Eye /></Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell className="text-center">Shreeyam Karan</TableCell>
                                <TableCell className="flex justify-end">
                                    <Button size="sm" id="5-activeId" onClick={ event => handleClick(event) }><Eye /></Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                {
                    activeId != -1 &&
                    <div>
                        <div className="flex justify-end gap-4">
                            <Button size="sm" onClick={ handleUserDetails }><UserRound /> Details</Button>
                            <Button size="sm" onClick={ handleUserTasks }><ClipboardCheck /> Tasks</Button>
                        </div>
                        {
                            activeView == "DETAILS" &&
                            <div>
                                <p className="font-bold">Employee Details</p>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-1/2">Attribute</TableHead>
                                            <TableHead className="w-1/2">Value</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody className="font-bold">
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>1</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Shreeyam Karan</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell>shreeyam.karan</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Designation</TableCell>
                                            <TableCell>Developer Trainee</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Date of Birth</TableCell>
                                            <TableCell>01 September 2002</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Gender</TableCell>
                                            <TableCell>Male</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Date of Joining</TableCell>
                                            <TableCell>29 August 2024</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Office Location</TableCell>
                                            <TableCell>Hyderabad, India</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Overall Rating</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <p>2.8</p>
                                                    <Star size={ 16 } />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Projects</TableCell>
                                            <TableCell className="flex gap-2 flex-wrap">
                                                <Badge>Beesheets</Badge>
                                                <Badge>Alpha</Badge>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        }
                        {
                            activeView == "TASKS" &&
                            <div>
                                <p className="font-bold">Employee Tasks</p>
                                <Accordion type="multiple" className="w-full">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>
                                                <div className="flex justify-between w-full px-2 sm:px-10">
                                                    <div className="flex flex-col items-start gap-2">
                                                        <Badge>Alpha</Badge>
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck />
                                                            <p className="text-lg">Title 1</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end justify-end gap-1 font-bold">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarDays size={ 16 } />
                                                            <p>14 November 2024</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={ 16 } />
                                                            <p>5 minutes</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-4 px-2 sm:px-10">
                                                Revised react concepts description
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>
                                                <div className="flex justify-between w-full px-2 sm:px-10">
                                                    <div className="flex flex-col items-start gap-2">
                                                        <Badge>Alpha</Badge>
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck />
                                                            <p className="text-lg">Title 1</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end justify-end gap-1 font-bold">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarDays size={ 16 } />
                                                            <p>14 November 2024</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={ 16 } />
                                                            <p>5 minutes</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-4 px-2 sm:px-10">
                                                Revised react concepts description
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>
                                                <div className="flex justify-between w-full px-2 sm:px-10">
                                                    <div className="flex flex-col items-start gap-2">
                                                        <Badge>Alpha</Badge>
                                                        <div className="flex items-center gap-2">
                                                            <ShieldCheck />
                                                            <p className="text-lg">Title 1</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end justify-end gap-1 font-bold">
                                                        <div className="flex items-center gap-2">
                                                            <CalendarDays size={ 16 } />
                                                            <p>14 November 2024</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={ 16 } />
                                                            <p>5 minutes</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-4 px-2 sm:px-10">
                                                Revised react concepts description
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}