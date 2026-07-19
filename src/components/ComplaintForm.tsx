"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapPin, UploadCloud, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema for form validation
const formSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal("")),
  service_code: z.string({ message: "Please select a category." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  lat: z.number({ message: "Location is required." }),
  long: z.number({ message: "Location is required." }),
  media_url: z.string().optional(),
});

export function ComplaintForm() {
  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      description: "",
      media_url: "",
    },
  });

  // Handle auto-location
  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          form.setValue("lat", position.coords.latitude);
          form.setValue("long", position.coords.longitude);
          setIsLocating(false);
          toast.success("Location acquired successfully!");
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
          toast.error("Failed to get location. Please ensure location services are enabled.");
        }
      );
    } else {
      setIsLocating(false);
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/v2/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request.");
      }

      const data = await response.json();
      toast.success("Success! " + data[0]?.service_notice || "Your complaint has been submitted.");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit complaint. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Personal Details Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ahmed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="El Amrani" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+212 600-000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="ahmed@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Complaint Details */}
        <FormField
          control={form.control}
          name="service_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complaint Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* These match the PRISMA seed categories */}
                  <SelectItem value="WATER_ENERGY">Water & Energy (ONEE, Redal, Amendis)</SelectItem>
                  <SelectItem value="SANITATION_WASTE">Sanitation & Waste Management</SelectItem>
                  <SelectItem value="INFRA_ROADS">Infrastructure & Roads</SelectItem>
                  <SelectItem value="PUBLIC_HEALTH">Public Health & Hygiene</SelectItem>
                  <SelectItem value="URBAN_PLANNING">Urban Planning & Construction</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose the category that best matches your issue.</FormDescription>
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
                  placeholder="Please describe the issue in detail..." 
                  className="resize-none" 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Section */}
        <div className="bg-muted p-4 rounded-lg flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-blue-600" />
            Location Coordinates
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              {form.watch("lat") && form.watch("long") ? (
                <span className="text-green-600 font-medium">
                  {form.watch("lat").toFixed(6)}, {form.watch("long").toFixed(6)}
                </span>
              ) : (
                "No location selected."
              )}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={handleGetLocation} disabled={isLocating}>
              {isLocating ? "Locating..." : "Use My Location"}
            </Button>
          </div>
          {/* Hidden fields for lat/long so react-hook-form validates them */}
          <input type="hidden" {...form.register("lat", { valueAsNumber: true })} />
          <input type="hidden" {...form.register("long", { valueAsNumber: true })} />
          {form.formState.errors.lat && (
            <p className="text-[0.8rem] font-medium text-destructive">Location is required to submit a complaint.</p>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full h-12 text-md bg-blue-700 hover:bg-blue-800" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Complaint"}
        </Button>
      </form>
    </Form>
  );
}
