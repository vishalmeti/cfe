'use client'

import { useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ComplaintCard({ complaint }) {
  const router = useRouter()
  
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
}
