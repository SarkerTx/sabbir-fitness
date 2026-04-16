import { NavLink, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import logo from "@/assets/logo.png";
import {
  LayoutDashboard, UserPlus, Users, CreditCard, Package, PlusCircle,
  Bell, Dumbbell, Settings, LogOut,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainLinks = [
  { title: "ড্যাশবোর্ড", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "আবেদনকারী", url: "/admin/applicants", icon: UserPlus },
  { title: "সদস্য তালিকা", url: "/admin/members", icon: Users },
  { title: "পেমেন্ট / রাজস্ব", url: "/admin/payments", icon: CreditCard },
];

const manageLinks = [
  { title: "প্ল্যান / মূল্য", url: "/admin/plans", icon: Package },
  { title: "অ্যাড-অন", url: "/admin/addons", icon: PlusCircle },
  { title: "নোটিশ", url: "/admin/notices", icon: Bell },
  { title: "প্রশিক্ষক", url: "/admin/trainers", icon: Dumbbell },
  { title: "সেটিংস", url: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { logout } = useAdminAuth();
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
      location.pathname === path
        ? "bg-primary/15 text-primary font-semibold"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          {!collapsed && <span className="font-bold text-sm text-foreground">SABBIR FITNESS</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>প্রধান</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainLinks.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={linkClass(item.url)}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>ব্যবস্থাপনা</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {manageLinks.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={linkClass(item.url)}>
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "লগ আউট"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
