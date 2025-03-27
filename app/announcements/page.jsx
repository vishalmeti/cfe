import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import Image from "next/image";


const announcements = [
  {
    id: "1",
    title: "System Maintenance",
    content: "Scheduled maintenance will occur on Saturday at 2 AM EST.",
    date: "2024-03-04",
    category: "Maintenance",
  },
  {
    id: "2",
    title: "New Feature Release",
    content: "We've added new collaboration tools to enhance your experience.",
    date: "2024-03-03",
    category: "Update",
  },
  {
    id: "3",
    title: "Holiday Schedule",
    content: "Office will be closed during the upcoming holidays.",
    date: "2024-03-02",
    category: "General",
  },
  {
    id: "1",
    title: "System Maintenance",
    content: "Scheduled maintenance will occur on Saturday at 2 AM EST.",
    date: "2024-03-04",
    category: "Maintenance",
  },
  {
    id: "2",
    title: "New Feature Release",
    content: "We've added new collaboration tools to enhance your experience.",
    date: "2024-03-03",
    category: "Update",
  },
  {
    id: "3",
    title: "Holiday Schedule",
    content: "Office will be closed during the upcoming holidays.",
    date: "2024-03-02",
    category: "General",
  },
  {
    id: "1",
    title: "System Maintenance",
    content: "Scheduled maintenance will occur on Saturday at 2 AM EST.",
    date: "2024-03-04",
    category: "Maintenance",
  },
  {
    id: "2",
    title: "New Feature Release",
    content: "We've added new collaboration tools to enhance your experience.",
    date: "2024-03-03",
    category: "Update",
  },
  {
    id: "3",
    title: "Holiday Schedule",
    content: "Office will be closed during the upcoming holidays.",
    date: "2024-03-02",
    category: "General",
  },
  {
    id: "1",
    title: "System Maintenance",
    content: "Scheduled maintenance will occur on Saturday at 2 AM EST.",
    date: "2024-03-04",
    category: "Maintenance",
  },
  {
    id: "2",
    title: "New Feature Release",
    content: "We've added new collaboration tools to enhance your experience.",
    date: "2024-03-03",
    category: "Update",
  },
  {
    id: "3",
    title: "Holiday Schedule",
    content: "Office will be closed during the upcoming holidays.",
    date: "2024-03-02",
    category: "General",
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Announcements</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full ">
        {/* Left side - Announcements */}
        <div>
          <ScrollArea className="h-[80vh] w-[80vw] rounded-md border ">
            <div className="p-4 space-y-4">
              {announcements?.map((announcement) => (
                <Card key={announcement.id} className="relative hover:bg-accent transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base font-medium">
                          {announcement.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(announcement.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {announcement.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {announcement.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right side - Image
        <div className="relative  hidden md:block">
          <div className=" h-[80vh] sticky top-8">
            <Card className="border border-red-400 h-full">
              <CardContent>
                <div className="relative aspect-video rounded-lg h-full">
                  <Image
                    src="/announcement.png" // Replace with your image path
                    alt="Announcement featured image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div> */}
      </div>
    </div>
  );
}