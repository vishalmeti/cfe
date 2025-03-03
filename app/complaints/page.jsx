'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  MoreVertical,
  PlusCircle,
  Search,
  SortAsc
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ComplaintsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock complaints data
  const mockComplaints = [
    {
      id: 'C-001',
      title: 'Water leak in bathroom ceiling',
      description: 'There is a water leak coming from the ceiling in my bathroom. It appears to be coming from the unit above me.',
      category: 'Plumbing',
      status: 'open',
      priority: 'high',
      submittedBy: 'John Doe',
      unit: '402',
      createdAt: '2025-02-28T14:30:00',
      updatedAt: '2025-02-28T15:45:00',
      images: ['/images/leak-1.jpg', '/images/leak-2.jpg'],
      assignedTo: null,
      messages: [
        {
          id: 'm1',
          sender: 'John Doe',
          role: 'resident',
          text: 'The leak is getting worse, please help!',
          timestamp: '2025-02-28T15:45:00'
        }
      ]
    },
    {
      id: 'C-001',
      title: 'Water leak in bathroom ceiling',
      description: 'There is a water leak coming from the ceiling in my bathroom. It appears to be coming from the unit above me.',
      category: 'Plumbing',
      status: 'open',
      priority: 'high',
      submittedBy: 'John Doe',
      unit: '402',
      createdAt: '2025-02-28T14:30:00',
      updatedAt: '2025-02-28T15:45:00',
      images: ['/images/leak-1.jpg', '/images/leak-2.jpg'],
      assignedTo: null,
      messages: [
        {
          id: 'm1',
          sender: 'John Doe',
          role: 'resident',
          text: 'The leak is getting worse, please help!',
          timestamp: '2025-02-28T15:45:00'
        }
      ]
    },
    {
      id: 'C-001',
      title: 'Water leak in bathroom ceiling',
      description: 'There is a water leak coming from the ceiling in my bathroom. It appears to be coming from the unit above me.',
      category: 'Plumbing',
      status: 'open',
      priority: 'high',
      submittedBy: 'John Doe',
      unit: '402',
      createdAt: '2025-02-28T14:30:00',
      updatedAt: '2025-02-28T15:45:00',
      images: ['/images/leak-1.jpg', '/images/leak-2.jpg'],
      assignedTo: null,
      messages: [
        {
          id: 'm1',
          sender: 'John Doe',
          role: 'resident',
          text: 'The leak is getting worse, please help!',
          timestamp: '2025-02-28T15:45:00'
        }
      ]
    },
    {
      id: 'C-001',
      title: 'Water leak in bathroom ceiling',
      description: 'There is a water leak coming from the ceiling in my bathroom. It appears to be coming from the unit above me.',
      category: 'Plumbing',
      status: 'open',
      priority: 'high',
      submittedBy: 'John Doe',
      unit: '402',
      createdAt: '2025-02-28T14:30:00',
      updatedAt: '2025-02-28T15:45:00',
      images: ['/images/leak-1.jpg', '/images/leak-2.jpg'],
      assignedTo: null,
      messages: [
        {
          id: 'm1',
          sender: 'John Doe',
          role: 'resident',
          text: 'The leak is getting worse, please help!',
          timestamp: '2025-02-28T15:45:00'
        }
      ]
    },
    {
      id: 'C-002',
      title: 'Broken light fixture in hallway',
      description: 'The ceiling light in the hallway is flickering and sometimes doesn\'t turn on at all.',
      category: 'Electrical',
      status: 'in-progress',
      priority: 'medium',
      submittedBy: 'Sarah Williams',
      unit: '303',
      createdAt: '2025-02-25T09:15:00',
      updatedAt: '2025-02-27T11:20:00',
      images: ['/images/light-fixture.jpg'],
      assignedTo: 'Maintenance Team',
      messages: [
        {
          id: 'm2',
          sender: 'Sarah Williams',
          role: 'resident',
          text: 'The light is completely out now.',
          timestamp: '2025-02-26T10:30:00'
        },
        {
          id: 'm3',
          sender: 'Building Management',
          role: 'admin',
          text: 'We\'ve scheduled an electrician for tomorrow.',
          timestamp: '2025-02-26T14:10:00'
        }
      ]
    },
    {
      id: 'C-003',
      title: 'Loud noise from upstairs neighbor',
      description: 'The resident above me is making excessive noise late at night, particularly after 11 PM.',
      category: 'Noise',
      status: 'open',
      priority: 'medium',
      submittedBy: 'Michael Johnson',
      unit: '302',
      createdAt: '2025-03-01T23:40:00',
      updatedAt: '2025-03-02T08:15:00',
      images: [],
      assignedTo: null,
      messages: [
        {
          id: 'm4',
          sender: 'Michael Johnson',
          role: 'resident',
          text: 'It happened again last night around 1 AM.',
          timestamp: '2025-03-02T08:15:00'
        }
      ]
    },
    {
      id: 'C-004',
      title: 'AC not cooling properly',
      description: 'My air conditioner is running but not cooling the apartment effectively.',
      category: 'HVAC',
      status: 'in-progress',
      priority: 'high',
      submittedBy: 'Emma Davis',
      unit: '501',
      createdAt: '2025-02-26T13:20:00',
      updatedAt: '2025-03-01T16:45:00',
      images: ['/images/ac-unit.jpg'],
      assignedTo: 'HVAC Technician',
      messages: [
        {
          id: 'm5',
          sender: 'Emma Davis',
          role: 'resident',
          text: 'The temperature in my apartment is 82°F despite the AC running constantly.',
          timestamp: '2025-02-26T13:20:00'
        },
        {
          id: 'm6',
          sender: 'Building Management',
          role: 'admin',
          text: 'We\'ve scheduled an HVAC technician to inspect your unit tomorrow between 2-4 PM.',
          timestamp: '2025-02-26T17:00:00'
        },
        {
          id: 'm7',
          sender: 'Emma Davis',
          role: 'resident',
          text: 'Thank you, I\'ll be home during that time.',
          timestamp: '2025-02-26T17:30:00'
        }
      ]
    },
    {
      id: 'C-005',
      title: 'Elevator out of service',
      description: 'The main elevator has been non-functional for two days. This is creating accessibility issues.',
      category: 'Building Services',
      status: 'resolved',
      priority: 'critical',
      submittedBy: 'Robert Brown',
      unit: '304',
      createdAt: '2025-02-20T08:10:00',
      updatedAt: '2025-02-22T15:30:00',
      images: [],
      assignedTo: 'Elevator Maintenance Company',
      messages: [
        {
          id: 'm8',
          sender: 'Robert Brown',
          role: 'resident',
          text: 'This is causing serious problems for elderly residents.',
          timestamp: '2025-02-20T08:10:00'
        },
        {
          id: 'm9',
          sender: 'Building Management',
          role: 'admin',
          text: 'We\'ve contacted the elevator company for emergency service.',
          timestamp: '2025-02-20T09:30:00'
        },
        {
          id: 'm10',
          sender: 'Building Management',
          role: 'admin',
          text: 'Elevator repairs have been completed and it is now back in service.',
          timestamp: '2025-02-22T15:30:00'
        }
      ]
    },
    {
      id: 'C-006',
      title: 'Parking spot being used by unauthorized vehicle',
      description: 'Someone is regularly parking in my assigned spot (#42).',
      category: 'Parking',
      status: 'resolved',
      priority: 'medium',
      submittedBy: 'Jane Smith',
      unit: '301',
      createdAt: '2025-02-15T18:30:00',
      updatedAt: '2025-02-17T10:15:00',
      images: ['/images/parking.jpg'],
      assignedTo: 'Security Team',
      messages: [
        {
          id: 'm11',
          sender: 'Jane Smith',
          role: 'resident',
          text: 'This has happened three times this week.',
          timestamp: '2025-02-15T18:30:00'
        },
        {
          id: 'm12',
          sender: 'Building Management',
          role: 'admin',
          text: 'We\'ve identified the vehicle owner and addressed the issue.',
          timestamp: '2025-02-17T10:15:00'
        }
      ]
    }
  ];

  // Filter complaints based on search term and category
  const filteredComplaints = mockComplaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || complaint.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Group complaints by status
  const openComplaints = filteredComplaints.filter(c => c.status === 'open');
  const inProgressComplaints = filteredComplaints.filter(c => c.status === 'in-progress');
  const resolvedComplaints = filteredComplaints.filter(c => c.status === 'resolved');

  // Function to render complaint card
  const renderComplaintCard = (complaint) => {
    const date = new Date(complaint.createdAt);
    const formattedDate = `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    
    // Color mapping for priority badges
    const priorityColors = {
      low: "success",
      medium: "warning",
      high: "destructive",
      critical: "destructive",
    };

    return (
      <Card 
        key={complaint.id} 
        className="mb-3 hover:bg-accent/40 cursor-pointer transition-colors"
        onClick={() => router.push(`/complaints/${complaint.id}`)}
      >
        <CardContent className="p-4">
          <div className="flex justify-between mb-2">
            <Badge variant={
              complaint.status === 'open' ? 'outline' : 
              complaint.status === 'in-progress' ? 'secondary' : 
              'success'
            }>
              {complaint.status === 'open' && "Open"}
              {complaint.status === 'in-progress' && "In Progress"}
              {complaint.status === 'resolved' && "Resolved"}
            </Badge>
            <Badge variant={priorityColors[complaint.priority]}>
              {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)} Priority
            </Badge>
          </div>
          
          <h3 className="font-medium leading-none mb-1">{complaint.title}</h3>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <div>
              <span>#{complaint.id} • </span>
              <span>{complaint.category} • </span>
              <span>Unit {complaint.unit}</span>
            </div>
            <div>{formattedDate}</div>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-1 text-xs text-muted-foreground">
              {complaint.messages.length > 0 && (
                <span>{complaint.messages.length} message{complaint.messages.length > 1 ? 's' : ''}</span>
              )}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/complaints/${complaint.id}`);
                  }}>
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Copy ID</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-6 md:p-6">
      <Tabs defaultValue="kanban" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Complaints</h1>
          <TabsList>
            <TabsTrigger value="kanban">Board View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search complaints..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="noise">Noise</SelectItem>
                <SelectItem value="parking">Parking</SelectItem>
                <SelectItem value="building services">Building Services</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <SortAsc className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="hidden sm:flex">
              <PlusCircle className="mr-2 h-4 w-4" /> New Complaint
            </Button>
          </div>
        </div>

        {/* Responsive new complaint button for small screens */}
        <Button className="sm:hidden">
          <PlusCircle className="mr-2 h-4 w-4" /> New Complaint
        </Button>

        {/* Main content with tabs */}
        <TabsContent value="kanban" className="pt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Open column */}
            <Card>
              <CardHeader className="bg-muted/40 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <CardTitle className="text-base">Open</CardTitle>
                  </div>
                  <Badge variant="outline">{openComplaints.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <ScrollArea className="h-[calc(100vh-360px)]">
                  {openComplaints.length ? (
                    openComplaints.map(renderComplaintCard)
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center p-4">
                      <p className="text-muted-foreground text-sm">No open complaints</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* In Progress column */}
            <Card>
              <CardHeader className="bg-muted/40 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <CardTitle className="text-base">In Progress</CardTitle>
                  </div>
                  <Badge variant="outline">{inProgressComplaints.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <ScrollArea className="h-[calc(100vh-360px)]">
                  {inProgressComplaints.length ? (
                    inProgressComplaints.map(renderComplaintCard)
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center p-4">
                      <p className="text-muted-foreground text-sm">No complaints in progress</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Resolved column */}
            <Card>
              <CardHeader className="bg-muted/40 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <CardTitle className="text-base">Resolved</CardTitle>
                  </div>
                  <Badge variant="outline">{resolvedComplaints.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <ScrollArea className="h-[calc(100vh-360px)]">
                  {resolvedComplaints.length ? (
                    resolvedComplaints.map(renderComplaintCard)
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center p-4">
                      <p className="text-muted-foreground text-sm">No resolved complaints</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* List view */}
        <TabsContent value="list" className="pt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Complaints</CardTitle>
              <CardDescription>
                Total of {filteredComplaints.length} complaint{filteredComplaints.length !== 1 && 's'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredComplaints.length ? (
                  filteredComplaints.map(renderComplaintCard)
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-center p-4">
                    <p className="text-muted-foreground">No complaints found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}