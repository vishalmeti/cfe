import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ComplaintCard } from '@/components/complaints/ComplaintCard'

export function ComplaintListView({ complaints }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>All Complaints</CardTitle>
        <CardDescription>
          Total of {complaints.length} complaint{complaints.length !== 1 && 's'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {complaints.length ? (
            complaints.map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-center p-4">
              <p className="text-muted-foreground">No complaints found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
