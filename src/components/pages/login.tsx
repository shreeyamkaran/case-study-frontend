import { useTheme } from "@/utils/theme-provider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Moon, Sun } from "lucide-react";

export default function Login() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        if(theme == "light") {
            setTheme("dark");
        }
        else {
            setTheme("light");
        }
    }
    return (
        <div className="relative flex min-h-screen justify-center items-center">
            <Button className="absolute top-4 right-8" variant="outline" size="icon" onClick={ toggleTheme }>
                {
                    theme == "dark" ? (
                        <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    ) : (
                        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    )
                }
            </Button>
            <div className="flex flex-col items-center gap-4">
                <div className="text-4xl">
                    <p>Login to your account</p>
                </div>
                <div className="w-full max-w-96 flex flex-col gap-2">
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
                </div>
                <div className="w-full text-center">
                    <Button className="w-1/2">Login</Button>
                </div>
            </div>
        </div>
    );
}