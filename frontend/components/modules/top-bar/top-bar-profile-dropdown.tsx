import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Laptop2,
  LogOut,
  Moon,
  Palette,
  Settings,
  Sun,
  User,
} from "lucide-react";

type Props = {};

const TopBarProfileDropdown = ({}: Props) => {
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-4 h-7 w-[18px]" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="mr-4 h-7 w-[18px]" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-48">
                <DropdownMenuItem>
                  <Sun className="mr-4 h-7 w-[18px]" />
                  <span>Light Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Moon className="mr-4 h-7 w-[18px]" />
                  <span>Dark Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Laptop2 className="mr-4 h-7 w-[18px]" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Settings className="mr-4 h-7 w-[18px]" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-4 h-7 w-[18px]" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TopBarProfileDropdown };
