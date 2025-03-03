'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PieCard from "@/components/pie-card"
import {
    BarChart3,
    Building2,
    Users,
    Bell,
    Home,
    Settings,
    AlertTriangle,
    MessageSquare,
    CalendarCheck,
    // ClipboardList,
    // PieChart
} from "lucide-react"

const DashboardPage = () => {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState(false)

    // Mock data
    const buildingData = {
        name: "The Skyline Towers",
        address: "123 Main Street, Cityville",
        totalUnits: 120,
        occupiedUnits: 108,
        amenities: ["Pool", "Gym", "Parking", "Security"]
    }

    const complaintData = {
        total: 8,
        open: 3,
        inProgress: 2,
        resolved: 3,
        recent: [
            { id: 1, title: "Water leak in bathroom", status: "open", date: "2025-03-01" },
            { id: 2, title: "Elevator maintenance", status: "in-progress", date: "2025-02-28" },
            { id: 3, title: "Noise complaint", status: "resolved", date: "2025-02-25" }
        ],
        // Monthly data for charts
        monthly: [
            { category: "Plumbing", count: 9, color: "bg-blue-500" },
            { category: "Electrical", count: 6, color: "bg-green-500" },
            { category: "Noise", count: 6, color: "bg-yellow-500" },
            { category: "Other", count: 3, color: "bg-orange-500" }
        ],
        // Trend data for line chart visualization
        trend: [
            { month: "Jan", count: 10 },
            { month: "Feb", count: 8 },
            { month: "Mar", count: 8 },
            { month: "Apr", count: 12 },
            { month: "May", count: 7 },
            { month: "Jun", count: 5 }
        ]
    }

    const neighborData = [
        { id: 1, name: "Jane Smith", unit: "301", avatar: "/avatars/jane.png" },
        { id: 2, name: "Michael Johnson", unit: "302", avatar: "/avatars/michael.png" },
        { id: 3, name: "Sarah Williams", unit: "303", avatar: "/avatars/sarah.png" },
        { id: 4, name: "Robert Brown", unit: "304", avatar: "/avatars/robert.png" }
    ]

    const announcementData = [
        { id: 1, title: "Annual Building Maintenance", date: "2025-03-15", priority: "high" },
        { id: 2, title: "Community BBQ", date: "2025-03-20", priority: "medium" }
    ]

    const notificationData = [
        { id: 1, message: "Your complaint #123 has been resolved", time: "2 hours ago" },
        { id: 2, message: "Maintenance scheduled for tomorrow", time: "1 day ago" },
        { id: 3, message: "New announcement posted", time: "3 days ago" }
    ]

    // Monthly complaint trend data for a 12-month period
    const complaintTrendData = [
        { month: "Jan", count: 8 },
        { month: "Feb", count: 12 },
        { month: "Mar", count: 7 },
        { month: "Apr", count: 9 },
        { month: "May", count: 11 },
        { month: "Jun", count: 14 },
        { month: "Jul", count: 6 },
        { month: "Aug", count: 5 },
        { month: "Sep", count: 10 },
        { month: "Oct", count: 8 },
        { month: "Nov", count: 13 },
        { month: "Dec", count: 9 }
    ];

    // Monthly complaint data broken down by category
    const complaintsMonthlyByCategory = [
        { month: "Jan", plumbing: 3, electrical: 2, noise: 2, other: 1 },
        { month: "Feb", plumbing: 5, electrical: 3, noise: 3, other: 1 },
        { month: "Mar", plumbing: 2, electrical: 1, noise: 3, other: 1 },
        { month: "Apr", plumbing: 4, electrical: 2, noise: 1, other: 2 },
        { month: "May", plumbing: 3, electrical: 4, noise: 2, other: 2 },
        { month: "Jun", plumbing: 6, electrical: 3, noise: 3, other: 2 },
        { month: "Jul", plumbing: 2, electrical: 1, noise: 2, other: 1 },
        { month: "Aug", plumbing: 1, electrical: 2, noise: 1, other: 1 },
        { month: "Sep", plumbing: 4, electrical: 2, noise: 3, other: 1 },
        { month: "Oct", plumbing: 3, electrical: 2, noise: 1, other: 2 },
        { month: "Nov", plumbing: 5, electrical: 3, noise: 4, other: 1 },
        { month: "Dec", plumbing: 3, electrical: 2, noise: 2, other: 2 }
    ];

    const billsData = {
        current: 850,
        due: "2025-03-15",
        history: [
            { month: "Jan", amount: 850 },
            { month: "Feb", amount: 850 },
            { month: "Mar", amount: 850 }
        ]
    }

    // Admin specific data
    const adminData = {
        occupancyRate: 90,
        totalComplaints: 24,
        maintenanceRequests: 12,
        monthlyRevenue: 108500
    }

    // Calculate max value for scaling
    const maxComplaintCount = Math.max(...complaintData.trend.map(item => item.count));

    // Function to get height percentage based on value
    const getHeightPercentage = (value) => {
        return (value / maxComplaintCount) * 100;
    }

    const routeToComplaints = () => {
        // Navigate to complaints page
        router.push("/complaints")
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome to {buildingData.name} management system
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Label htmlFor="role-toggle" className={isAdmin ? "text-primary" : "text-muted-foreground"}>
                        {isAdmin ? "Admin View" : "Resident View"}
                    </Label>
                    <Switch
                        id="role-toggle"
                        checked={isAdmin}
                        onCheckedChange={setIsAdmin}
                    />
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 md:w-auto">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="building">Building</TabsTrigger>
                    <TabsTrigger value="complaints">Complaints</TabsTrigger>
                    <TabsTrigger value="neighbors">Neighbors</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    {/* Top row cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {/* Building Status Card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Building Status</CardTitle>
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{buildingData.name}</div>
                                <p className="text-xs text-muted-foreground">{buildingData.address}</p>
                            </CardContent>
                        </Card>

                        {/* Complaints Card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Complaints</CardTitle>
                                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{complaintData.open}</div>
                                <p className="text-xs text-muted-foreground">
                                    {complaintData.total} total complaints
                                </p>
                            </CardContent>
                        </Card>

                        {/* Neighbors Card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Neighbors</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {buildingData.occupiedUnits}/{buildingData.totalUnits}
                                </div>
                                <p className="text-xs text-muted-foreground">Units occupied</p>
                            </CardContent>
                        </Card>

                        {/* Notifications Card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                                <Bell className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{notificationData.length}</div>
                                <p className="text-xs text-muted-foreground">New updates</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Admin specific dashboard statistics */}
                    {isAdmin && (
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Building Overview</CardTitle>
                                <CardDescription>Administrative dashboard statistics</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium">Occupancy Rate</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold">{adminData.occupancyRate}%</span>
                                        <Progress value={adminData.occupancyRate} className="h-2" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Total Complaints</p>
                                    <p className="text-2xl font-bold">{adminData.totalComplaints}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Maintenance Requests</p>
                                    <p className="text-2xl font-bold">{adminData.maintenanceRequests}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Monthly Revenue</p>
                                    <p className="text-2xl font-bold">${adminData.monthlyRevenue}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Middle row */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Recent Complaints */}
                        <Card className="lg:col-span-4">
                            <CardHeader>
                                <CardTitle>Recent Complaints</CardTitle>
                                <CardDescription>Latest complaints submitted by residents</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {complaintData.recent.map(complaint => (
                                        <div key={complaint.id} className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">{complaint.title}</p>
                                                <p className="text-xs text-muted-foreground">{complaint.date}</p>
                                            </div>
                                            <Badge variant={
                                                complaint.status === 'open' ? 'destructive' :
                                                    complaint.status === 'in-progress' ? 'warning' : 'success'
                                            }>
                                                {complaint.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full" onClick={routeToComplaints} >
                                    View All Complaints
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Announcements */}
                        <Card className="lg:col-span-3">
                            <CardHeader>
                                <CardTitle>Announcements</CardTitle>
                                <CardDescription>Latest updates from building management</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {announcementData.map(announcement => (
                                        <div key={announcement.id} className="flex items-center space-x-4">
                                            <div className="flex-1 space-y-1">
                                                <p className="font-medium leading-none flex items-center">
                                                    {announcement.title}
                                                    {announcement.priority === 'high' && (
                                                        <Badge variant="destructive" className="ml-2">Important</Badge>
                                                    )}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {announcement.date}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            {isAdmin && (
                                <CardFooter>
                                    <Button size="sm" className="w-full">
                                        Create Announcement
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>
                    </div>

                    {/* Bottom row */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Neighbors list */}
                        <Card className="lg:col-span-4">
                            <CardHeader>
                                <CardTitle>Neighbors</CardTitle>
                                <CardDescription>People in your building</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {neighborData.map(neighbor => (
                                        <div key={neighbor.id} className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={neighbor.avatar} />
                                                <AvatarFallback>{neighbor.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-1">
                                                <p className="font-medium leading-none">{neighbor.name}</p>
                                                <p className="text-sm text-muted-foreground">Unit {neighbor.unit}</p>
                                            </div>
                                            {isAdmin && (
                                                <Button variant="ghost" size="icon">
                                                    <MessageSquare className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                    View All Residents
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Bills & Payments or Admin Calendar */}
                        <Card className="lg:col-span-3">
                            {isAdmin ? (
                                <>
                                    <CardHeader>
                                        <CardTitle>Upcoming Events</CardTitle>
                                        <CardDescription>Scheduled maintenance and events</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <CalendarCheck className="h-5 w-5 mr-2 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium">Building Inspection</p>
                                                    <p className="text-xs text-muted-foreground">March 10, 2025</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <CalendarCheck className="h-5 w-5 mr-2 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium">Fire Alarm Testing</p>
                                                    <p className="text-xs text-muted-foreground">March 15, 2025</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <CalendarCheck className="h-5 w-5 mr-2 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium">Community Meeting</p>
                                                    <p className="text-xs text-muted-foreground">March 20, 2025</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </>
                            ) : (
                                <>
                                    <CardHeader>
                                        <CardTitle>Bills & Payments</CardTitle>
                                        <CardDescription>Your current and upcoming bills</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm font-medium">Current Bill</p>
                                                <p className="text-2xl font-bold">${billsData.current}</p>
                                                <p className="text-xs text-muted-foreground">Due on {billsData.due}</p>
                                            </div>
                                            <div className="pt-4">
                                                <p className="text-sm font-medium mb-2">Payment History</p>
                                                {billsData.history.map((bill, index) => (
                                                    <div key={index} className="flex justify-between text-sm py-1">
                                                        <span>{bill.month} 2025</span>
                                                        <span className="font-medium">${bill.amount}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button size="sm" className="w-full">
                                            Make Payment
                                        </Button>
                                    </CardFooter>
                                </>
                            )}
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="building" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Building Information</CardTitle>
                            <CardDescription>{buildingData.name}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Property Details</h3>
                                <div className="grid gap-2 mt-2">
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Address:</span>
                                        <span>{buildingData.address}</span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Total Units:</span>
                                        <span>{buildingData.totalUnits}</span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Occupancy:</span>
                                        <span>{buildingData.occupiedUnits} units ({Math.round(buildingData.occupiedUnits / buildingData.totalUnits * 100)}%)</span>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <span className="text-muted-foreground">Amenities:</span>
                                        <span>{buildingData.amenities.join(", ")}</span>
                                    </div>
                                </div>
                            </div>

                            {/* More building details would go here */}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="complaints" className="space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Complaint Management</CardTitle>
                                <CardDescription>Track and submit complaints</CardDescription>
                            </div>
                            <Button size="sm">
                                New Complaint
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-2">Complaints Overview</h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="border rounded-md p-3">
                                        <p className="text-2xl font-bold">{complaintData.open}</p>
                                        <p className="text-sm text-muted-foreground">Open</p>
                                    </div>
                                    <div className="border rounded-md p-3">
                                        <p className="text-2xl font-bold">{complaintData.inProgress}</p>
                                        <p className="text-sm text-muted-foreground">In Progress</p>
                                    </div>
                                    <div className="border rounded-md p-3">
                                        <p className="text-2xl font-bold">{complaintData.resolved}</p>
                                        <p className="text-sm text-muted-foreground">Resolved</p>
                                    </div>
                                </div>
                            </div>

                            {/* Charts section using Shadcn primitives */}
                            <div className="mb-6">
                                {/* Bar Chart */}
                                {/* <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-base">Complaints by Category</CardTitle>
                                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {complaintData.monthly.map((item, index) => (
                                                <div key={index} className="space-y-1">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span>{item.category}</span>
                                                        <span className="font-medium">{item.count}</span>
                                                    </div>
                                                    <div className="h-2 rounded-full overflow-hidden bg-muted">
                                                        <div
                                                            className={`h-full ${item.color}`}
                                                            style={{ width: `${(item.count / 10) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card> */}

                                {/* Line Chart using Shadcn primitives */}
                                {/* <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-base">Complaint Trends</CardTitle>
                                            <PieChart className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[200px] flex items-end gap-[2px] pt-4">
                                            {complaintData.trend.map((item, i) => (
                                                <div key={i} className="grow flex flex-col items-center">
                                                    <div
                                                        className="w-full bg-primary rounded-t-sm"
                                                        style={{ height: `${getHeightPercentage(item.count)}%` }}
                                                    ></div>
                                                    <span className="text-xs text-muted-foreground mt-2">{item.month}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card> */}
                                <PieCard />
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-2">Recent Complaints</h3>
                                <div className="space-y-4">
                                    {complaintData.recent.map(complaint => (
                                        <div key={complaint.id} className="flex items-center justify-between border-b pb-3">
                                            <div className="space-y-1">
                                                <p className="font-medium">{complaint.title}</p>
                                                <p className="text-xs text-muted-foreground">Submitted on {complaint.date}</p>
                                            </div>
                                            <Badge variant={
                                                complaint.status === 'open' ? 'destructive' :
                                                    complaint.status === 'in-progress' ? 'warning' : 'success'
                                            }>
                                                {complaint.status}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="neighbors" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Building Residents</CardTitle>
                            <CardDescription>Your neighbors at {buildingData.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {neighborData.concat(neighborData).map((neighbor, index) => (
                                    <div key={`${neighbor.id}-${index}`} className="flex flex-col items-center space-y-3 border rounded-lg p-4">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src={neighbor.avatar} />
                                            <AvatarFallback className="text-lg">{neighbor.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 text-center">
                                            <h3 className="font-medium">{neighbor.name}</h3>
                                            <p className="text-sm text-muted-foreground">Unit {neighbor.unit}</p>
                                        </div>
                                        {isAdmin && (
                                            <Button variant="outline" size="sm" className="w-full">
                                                Contact
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default DashboardPage