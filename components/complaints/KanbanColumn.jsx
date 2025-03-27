import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ComplaintCard } from '@/components/complaints/ComplaintCard'

export function KanbanColumn({ title, icon, complaints, emptyMessage }) {
  return (
    <Card>
      <CardHeader className="bg-muted/40 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Badge variant="outline">{complaints.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[calc(100vh-360px)]">
          {complaints.length ? (
            complaints?.map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center p-4">
              <p className="text-muted-foreground text-sm">{emptyMessage}</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
