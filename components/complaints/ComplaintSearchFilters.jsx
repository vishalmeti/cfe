import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusCircle, Search, SortAsc, Filter } from "lucide-react"

export function ComplaintSearchFilters({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory 
}) {
  return (
    <>
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
    </>
  )
}
