'use client';

import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import { Provider } from "react-redux"
import { store } from "@/store"

import { Home } from 'lucide-react'

export default function Layout({ children }) {
  return (
      <SidebarProvider>
          <AppSidebar active={"chat"} />
          <SidebarInset>
              <header
                  className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                  <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                      <Breadcrumb>
                          <BreadcrumbList>
                              {/* <BreadcrumbItem className="hidden md:block">
                                  <BreadcrumbLink href="#">
                                      Building Your Application
                                  </BreadcrumbLink>
                              </BreadcrumbItem> 
                              <BreadcrumbSeparator className="hidden md:block" /> */}
                              <BreadcrumbItem>
                                  <BreadcrumbLink href="/dashboard"><Home className="h-4 w-4" /></BreadcrumbLink>
                              </BreadcrumbItem>
                              <BreadcrumbSeparator className="hidden md:block" />
                              <BreadcrumbItem>
                                  <BreadcrumbPage className='text-primary' > Chat</BreadcrumbPage>
                              </BreadcrumbItem>
                          </BreadcrumbList>
                      </Breadcrumb>
                  </div>
              </header>
              <Provider store={store}>
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  {children}
              </div>
              </Provider>
          </SidebarInset>
      </SidebarProvider>
  );
}
