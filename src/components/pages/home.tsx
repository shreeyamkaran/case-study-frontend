import Navbar from "../custom/navbar"
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import { Star } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
    const count = useSelector((state: RootState) => state.counter.count);
    return (
        <div>
            { count }
            <Navbar />
            <div className="px-2 py-2 sm:px-20 sm:py-10">
                <div className="grid grid-cols-[2fr,3fr] gap-12">
                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-xl">Welcome, <span className="font-bold">King Piccolo</span></p>
                        </div>
                        <div>
                            <Label htmlFor="employeeId-textfield">Employee Id</Label>
                            <div id="employeeId-textfield" className="border py-1 px-2 rounded-md font-bold">641</div>
                        </div>
                        <div>
                            <Label htmlFor="username-textfield">Username</Label>
                            <div id="username-textfield" className="border py-1 px-2 rounded-md font-bold">king.piccolo</div>
                        </div>
                        <div>
                            <Label htmlFor="designation-textfield">Designation</Label>
                            <div id="designation-textfield" className="border py-1 px-2 rounded-md font-bold">Developer Trainee</div>
                        </div>
                        <div>
                            <Label htmlFor="dateOfBirth-textfield">Date of Birth</Label>
                            <div id="dateOfBirth-textfield" className="border py-1 px-2 rounded-md font-bold">01 September 2002</div>
                        </div>
                        <div>
                            <Label htmlFor="gender-textfield">Gender</Label>
                            <div id="gender-textfield" className="border py-1 px-2 rounded-md font-bold">Male</div>
                        </div>
                        <div>
                            <Label htmlFor="dateOfJoining-textfield">Date of Joining</Label>
                            <div id="dateOfJoining-textfield" className="border py-1 px-2 rounded-md font-bold">29 August 2024</div>
                        </div>
                        <div>
                            <Label htmlFor="officeLocation-textfield">Office Location</Label>
                            <div id="officeLocation-textfield" className="border py-1 px-2 rounded-md font-bold">Hyderabad, India</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4">
                            <p className="font-bold">Projects</p>
                            <div className="flex flex-wrap gap-4">
                                <Badge>Training</Badge>
                                <Badge>Beesheets</Badge>
                                <Badge>Destroy Earth </Badge>
                                <Badge>Dragon Balls</Badge>
                                <Badge>Surpass Goku</Badge>
                                <Badge>Love 6 yrs olds</Badge>
                            </div>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Skill</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Category</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="font-bold">
                                        <TableCell>Java</TableCell>
                                        <TableCell className="flex items-center gap-1">
                                            <p>3.5</p>
                                            <Star size={ 16 } />
                                        </TableCell>
                                        <TableCell>Technical</TableCell>
                                    </TableRow>
                                    <TableRow className="font-bold">
                                        <TableCell>Spring Boot</TableCell>
                                        <TableCell className="flex items-center gap-1">
                                            <p>4.7</p>
                                            <Star size={ 16 } />
                                        </TableCell>
                                        <TableCell>Technical</TableCell>
                                    </TableRow>
                                    <TableRow className="font-bold">
                                        <TableCell>React</TableCell>
                                        <TableCell className="flex items-center gap-1">
                                            <p>2.9</p>
                                            <Star size={ 16 } />
                                        </TableCell>
                                        <TableCell>Technical</TableCell>
                                    </TableRow>
                                    <TableRow className="font-bold">
                                        <TableCell>Problem Solving</TableCell>
                                        <TableCell className="flex items-center gap-1">
                                            <p>4.6</p>
                                            <Star size={ 16 } />
                                        </TableCell>
                                        <TableCell>Non Technical</TableCell>
                                    </TableRow>
                                    <TableRow className="font-bold">
                                        <TableCell>Conversation</TableCell>
                                        <TableCell className="flex items-center gap-1">
                                            <p>4.0</p>
                                            <Star size={ 16 } />
                                        </TableCell>
                                        <TableCell>Non Technical</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}