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

import UserService from "@/services/userService"

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
      items: [
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
  const [user, setUser] = useState({})

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
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} popupData={0} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
