'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ImagePlus, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  unit: z.string().min(1, "Unit number is required"),
  priority: z.string().min(1, "Please select priority"),
})

const steps = ["Details", "Category", "Images"]

export function NewComplaintModal({ open, onOpenChange }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [images, setImages] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      unit: "",
      priority: "",
    },
  })

  // Add useEffect to reset states when modal opens
  useEffect(() => {
    if (open) {
      // Reset all states when modal opens
      setCurrentStep(0)
      setImages([])
      setImageUrls([])
      setIsSubmitting(false)
      form.reset({
        title: "",
        description: "",
        category: "",
        unit: "",
        priority: "",
      })
    }
  }, [open, form])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement actual submission logic here
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      console.log({ ...data, images })
      
      // Reset everything
      setCurrentStep(0)
      setImages([])
      setImageUrls([])
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([...images, ...files])
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file))
    setImageUrls([...imageUrls, ...urls])
  }

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    const newUrls = imageUrls.filter((_, i) => i !== index)
    setImages(newImages)
    setImageUrls(newUrls)
  }

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800"
  }

  const canNavigateToStep = (stepIndex) => {
    if (stepIndex === 0) return true;
    if (stepIndex === 1) {
      return form.getValues(['title', 'description', 'unit']).every(Boolean);
    }
    if (stepIndex === 2) {
      return form.getValues(['category', 'priority']).every(Boolean);
    }
    return false;
  };

  const handleStepClick = (index) => {
    if (index <= currentStep || canNavigateToStep(index)) {
      setCurrentStep(index);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="px-6 pt-6 pb-6 bg-gradient-to-r from-primary/10 to-primary/5">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Create New Complaint
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Fill in the details of your complaint. Be as specific as possible.
            </DialogDescription>
            <div className="flex justify-between items-center mt-6">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    onClick={() => handleStepClick(index)}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${index <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                      ${(index <= currentStep || canNavigateToStep(index)) ? 'cursor-pointer hover:ring-2 hover:ring-primary/50' : 'cursor-not-allowed opacity-50'}
                      transition-all duration-200
                    `}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 w-12 mx-2 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="px-6 py-4 space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief title of the issue" {...field} className="h-11" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detailed description of the issue"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your unit number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">Category</FormLabel>
                          <div className="grid grid-cols-2 gap-3">
                            {["Plumbing", "Electrical", "HVAC", "Building Services", "Noise", "Parking"].map((category) => (
                              <div
                                key={category}
                                onClick={() => field.onChange(category)}
                                className={`
                                  p-4 rounded-lg border-2 cursor-pointer transition-all
                                  ${field.value === category ? 'border-primary bg-primary/5' : 'border-muted'}
                                `}
                              >
                                {category}
                              </div>
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">Priority</FormLabel>
                          <div className="grid grid-cols-4 gap-3">
                            {Object.entries(priorityColors).map(([priority, colorClass]) => (
                              <div
                                key={priority}
                                onClick={() => field.onChange(priority)}
                                className={`
                                  p-3 rounded-lg cursor-pointer text-center capitalize transition-all
                                  ${field.value === priority ? colorClass : 'bg-muted'}
                                `}
                              >
                                {priority}
                              </div>
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FormItem className="space-y-4">
                      <FormLabel className="text-base font-semibold">Images</FormLabel>
                      <motion.div
                        className="grid gap-4"
                        layout
                      >
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <ImagePlus className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Drag and drop or click to upload</p>
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        {imageUrls.length > 0 && (
                          <motion.div 
                            className="grid grid-cols-2 md:grid-cols-3 gap-4"
                            layout
                          >
                            {imageUrls.map((url, index) => (
                              <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group aspect-square"
                              >
                                <img
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 p-1 rounded-full bg-destructive/90 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    </FormItem>
                  </div>
                )}
              </motion.div>

              <div className="flex justify-between gap-4 pt-4 border-t">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(step => step - 1)}
                  >
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(step => step + 1)}
                    className="ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="ml-auto">
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      "Submit Complaint"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
