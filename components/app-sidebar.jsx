"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

import UserService from "@/services/userService"
import { forEach } from "lodash"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useState, useEffect } from "react"

// This is sample data.
let data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Announcements",
          url: "/announcements",
        },
        {
          title: "Complaints",
          url: "/complaints",
        },
      ],
    },
    {
      title: "Channels",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "#General",
          url: "#",
        },
        {
          title: "#Events",
          url: "#",
        },
        // {
        //   title: "Quantum",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Chat's",
      url: "#",
      icon: BookOpen,
      items:
        [
        {
          title: "Kevin",
          url: "/chat/1",
        },
        {
          title: "Jenny",
          url: "/chat/2",
        },
        {
          title: "Tom",
          url: "/chat/3",
        },
        {
          title: "John",
          url: "/chat/4",
        },
        {
          title: "Sara",
          url: "/chat/5",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const router = useRouter();
  const [user, setUser] = useState({})
  const [navMainItems, setNavMainItems] = useState(data.navMain)

  // Handle navigation with the router instead of direct links
  const handleNavigation = (url) => {
    if (url && url !== "#") {
      router.push(url);
    }
  };

  useEffect(() => {
    UserService.getCurrentUser().then((res) => {
      const me = res
      console.log("User data:", me)
      setUser({
        name: me.username,
        email: me.email,
        avatar: me.profile_image_url
      })
      localStorage.setItem("user", JSON.stringify(me))

      UserService.getWorkspaceUsers(me.workspace[0]).then((res) => {
        let data = []
        forEach(res, (workspaceUser) => {
          console.log("Workspace user:", workspaceUser)
          localStorage.setItem("workspaceUsers", JSON.stringify(res)) // to show the list of users in left pane of the layout
          console.log("Current user:", me)
          if (workspaceUser.user !== me.id)
            data.push({
              title: workspaceUser.username,
              url: "/chat/" + workspaceUser.user,
            })
        })

        // Update the Chat's items in navMainItems with API data
        setNavMainItems(prevNavMain => {
          return prevNavMain.map(item => {
            if (item.title === "Chat's") {
              return { ...item, items: data };
            }
            return item;
          });
        });
      }).catch((error) => {
        console.error("Failed to fetch workspace users:", error)
      }
      )
    }).catch((error) => {
      console.error("Failed to fetch user data:", error)
    })
  }, [])

  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} onNavigate={handleNavigation} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} popupData={0} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
