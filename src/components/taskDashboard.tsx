
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, User, Package, Clock, DollarSign, Clock3 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog' 
import Link from 'next/link'

interface Task {
  id: string
  title: string
  category: string
  location: string
  resource: string
  materialsOrdered: boolean
  estimatedTime: string
  totalPrice: string
  scheduledDate: string
  completed: boolean
}

const mockTasks: Task[] = [
  {
    id: '#1201',
    title: 'Install Ceiling Fan',
    category: 'Upcoming June-After July',
    location: '34 Elm Street, NY',
    resource: 'Esther Howard',
    materialsOrdered: true,
    estimatedTime: '1.5 hours',
    totalPrice: '$200',
    scheduledDate: '05-07-2026 10:00 (27-07-2026 16:00)',
    completed: false,
  },
  {
    id: '#1202',
    title: 'Fix Plumbing',
    category: 'Ongoing',
    location: '45 Oak Avenue, NY',
    resource: 'John Doe',
    materialsOrdered: false,
    estimatedTime: '2 hours',
    totalPrice: '$150',
    scheduledDate: '01-09-2025 09:00 (01-09-2025 11:00)',
    completed: false,
  },
]



export default function TaskDashboard() {
  const [activeSection, setActiveSection] = useState("Today's Task")
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [openModal, setOpenModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const filteredTasks = mockTasks.filter((task) => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'materialsOrdered') return task.materialsOrdered
    if (selectedFilter === 'completed') return task.completed
    return task.category === selectedFilter
  })

  const handleModalOpen = (task: Task) => {
    setSelectedTask(task)
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setSelectedTask(null)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6">
        <div className="mx-auto container">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#4B5563] mt-8 sm:mt-0">
              {activeSection}
            </h1>
          
          </div>

          {/* Task Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {filteredTasks.slice(0, 2).map((task, index) => (
              <TaskCard
                key={`today-${index}`}
                task={task}
                onViewOffer={() => handleModalOpen(task)}
              />
            ))}
          </div>

          {/* Weekly Tasks Section */}
          <div className="mt-8">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
              Weekly Task
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredTasks.slice(0, 2).map((task, index) => (
                <TaskCard
                  key={`weekly-${index}`}
                  task={task}
                  onViewOffer={() => handleModalOpen(task)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Viewing Offer */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="sm:max-w-md md:max-w-lg max-h-[80vh]  bg-white overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl text-[#4B5563] text-center" >
                Task {selectedTask?.id} - {selectedTask?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-4 p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="text-[#059669] w-5 h-5" />
                  <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                    Category:
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    {selectedTask.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#059669] w-5 h-5" />
                  <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                    Location:
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    {selectedTask.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="text-[#059669] w-5 h-5" />
                  <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                    Resource:
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    {selectedTask.resource}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="text-[#059669] w-5 h-5" />
                  <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                    Materials Ordered:
                  </span>
                  <Badge variant={selectedTask.materialsOrdered ? 'default' : 'secondary'}>
                    {selectedTask.materialsOrdered ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-[#059669] w-5 h-5" />
                  <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                    Estimated Time:
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    {selectedTask.estimatedTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="text-[#059669] w-5 h-5" />
                  <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                    Total Price:
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    {selectedTask.totalPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="text-[#059669] w-5 h-5" />
                  <span className="text-base sm:text-lg font-medium text-[#6B7280]">
                    Scheduled:
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    {selectedTask.scheduledDate}
                  </span>
                </div>
              </div>
            )}
            <DialogClose asChild >
              <div className='flex justify-between w-full gap-4 '>
                <Button
                  variant="outline"
                  className="mt-4 w-full sm:w-1/2"
                  onClick={handleModalClose}
                >
                  Close
                </Button>
                <Button
                  variant="ghost"
                  className="mt-4 w-full bg-[#059669] sm:w-1/2 text-white"
                >
                  Confirm Order
                </Button>
              </div>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

function TaskCard({ task, onViewOffer }: { task: Task; onViewOffer: () => void }) {
  return (
    <Card className="bg-card border-[#059669] shadow-sm hover:shadow-md transition-shadow hover:duration-300 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg sm:text-xl font-medium text-[#4B5563]">
            Task {task.id} - {task.title}
          </CardTitle>
        </div>
        <p className="text-sm sm:text-base flex items-center gap-2 text-[#4B5563] font-normal">
          <Clock3 className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
          Scheduled: {task.scheduledDate}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-base sm:text-lg font-medium text-[#6B7280]">
            Categorize:
          </span>
          <span className="text-sm sm:text-base font-normal text-muted-foreground">
            {task.category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-base sm:text-lg font-medium text-[#6B7280]">
            Location:
          </span>
          <span className="text-sm sm:text-base font-normal text-muted-foreground">
            {task.location}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-base sm:text-lg font-medium text-[#6B7280]">
            Resource:
          </span>
          <span className="text-sm sm:text-base font-normal text-muted-foreground">
            {task.resource}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-base sm:text-lg font-medium text-[#6B7280]">
            Materials ordered:
          </span>
          <Badge variant={task.materialsOrdered ? 'default' : 'secondary'} className="text-xs">
            {task.materialsOrdered ? 'Yes' : 'No'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-base sm:text-lg font-medium text-[#6B7280]">
            Estimated Time:
          </span>
          <span className="text-sm sm:text-base font-normal text-muted-foreground">
            {task.estimatedTime}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="text-[#059669] w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-base sm:text-lg font-medium text-[#6B7280]">
            Total Price:
          </span>
          <span className="text-sm sm:text-base font-normal text-muted-foreground">
            {task.totalPrice}
          </span>
        </div>
       <div className="flex flex-col sm:flex-row gap-4 pt-4">
  {/* View Offer Button */}
  <Link href={'/offers/projects'} className="flex-1">
    <Button
      variant="ghost"
      size="sm"
      className="w-full gap-2 text-[#047857] font-semibold py-4 sm:py-6 bg-[#D1FAE5] hover:text-white hover:bg-[#047857]"
    >
      View Offer
    </Button>
  </Link>

  {/* Completed Button */}
  <div className="flex-1">
    <Button
      variant="ghost"
      size="sm"
      className="w-full gap-2 text-[#ffffff] font-semibold py-4 sm:py-6 bg-[#059669] hover:bg-[#047857] hover:text-white"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 sm:w-5 sm:h-5"
      >
        <path
          d="M2 12.5L6.07574 16.5757C6.31005 16.8101 6.68995 16.8101 6.92426 16.5757L9.5 14"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M16.5 7L12.5 11"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7.5 12L12.0757 16.5757C12.3101 16.8101 12.6899 16.8101 12.9243 16.5757L22.5 7"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      Completed
    </Button>
  </div>
</div>

      </CardContent>
    </Card>
  )
}