"use client";

import { useRouter } from "next/navigation";

import { ProfileAvatar } from "@/components/modules/profile-avatar";
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

import { useSignOutService } from "@/services/auth";

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
import { useSession } from "next-auth/react";

const TopBarProfileDropdown = () => {
  //* session from next-auth for user session data
  const { data: session } = useSession();

  //* theme from next-theme for themes
  const { setTheme, theme } = useTheme();

  //* router for navigation
  const router = useRouter();

  const { mutate: signOut } = useSignOutService();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ProfileAvatar />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-4 mt-2 font-medium">
        <DropdownMenuLabel className="flex cursor-pointer flex-nowrap items-center gap-4">
          <ProfileAvatar />

          <div className="flex h-full flex-col justify-between">
            <span>{session?.user.name}</span>
            <span className="text-xs font-normal">{session?.user.email}</span>
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
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className={theme === "light" ? "bg-accent text-primary" : ""}
                >
                  <Sun className="mr-4 h-7 w-[18px]" />
                  <span>Light Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className={theme === "dark" ? "bg-accent text-primary" : ""}
                >
                  <Moon className="mr-4 h-7 w-[18px]" />
                  <span>Dark Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className={theme === "system" ? "bg-accent text-primary" : ""}
                >
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

          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-4 h-7 w-[18px]" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TopBarProfileDropdown };
