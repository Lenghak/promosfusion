"use client";

import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "@wits/next-themes";
import {
  Bug,
  ChevronsUpDown,
  HelpCircle,
  Laptop2,
  LogOut,
  Moon,
  Palette,
  Plus,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

type Props = {};

const TopBarProfileDropdown = ({}: Props) => {
  const { data: session } = useSession();
  const { setTheme } = useTheme();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-4 mt-2 font-medium">
        <DropdownMenuLabel className="flex flex-nowrap items-center gap-4">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex h-full flex-col justify-between">
            <span>Shadcn UI</span>
            <span className="text-xs font-normal">someone@example.com</span>
          </div>

          <ChevronsUpDown className="h-7 w-[18px]" />
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="mr-4 h-7 w-[18px]" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="mr-4 h-7 w-[18px]" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-48 font-medium">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-4 h-7 w-[18px]" />
                  <span>Light Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-4 h-7 w-[18px]" />
                  <span>Dark Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop2 className="mr-4 h-7 w-[18px]" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings className="mr-4 h-7 w-[18px]" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/helps")}>
            <HelpCircle className="mr-4 h-7 w-[18px]" />
            <span>Help Center</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/customer-care")}>
            <Bug className="mr-4 h-7 w-[18px]" />
            <span>Bug Reports</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Plus className="mr-4 h-7 w-[18px]" />
            <span>Add Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/sign-in", redirect: true })}
          >
            <LogOut className="mr-4 h-7 w-[18px]" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TopBarProfileDropdown };
