import { KanbanColumn } from '@/components/complaints/KanbanColumn'
import { AlertTriangle, CheckCircle2, Clock } from "lucide-react"

export function ComplaintKanbanView({ openComplaints, inProgressComplaints, resolvedComplaints }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <KanbanColumn
        title="Open"
        icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
        complaints={openComplaints}
        emptyMessage="No open complaints"
      />
      
      <KanbanColumn
        title="In Progress"
        icon={<Clock className="h-4 w-4 text-amber-500" />}
        complaints={inProgressComplaints}
        emptyMessage="No complaints in progress"
      />
      
      <KanbanColumn
        title="Resolved"
        icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
        complaints={resolvedComplaints}
        emptyMessage="No resolved complaints"
      />
    </div>
  )
}
