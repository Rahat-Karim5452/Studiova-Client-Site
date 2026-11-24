"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ImagePlus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { amenities, categories } from "@/lib/constants"
import { getTokenFromClient } from "@/lib/getTokenFromClient"
import type { IStudio } from "@/lib/types/studio"
import { cn } from "@/lib/utils"

type FormValues = {
  title: string
  category: string
  hourlyRate: string
  securityDeposit: string
  maxCapacity: string
  location: string
  imageUrl: string
  amenities: string[]
  overview: string
}

const initialValues = (studio?: IStudio): FormValues => ({
  title: studio?.title ?? "",
  category: studio?.category ?? "",
  hourlyRate: studio ? String(studio.hourlyRate) : "",
  securityDeposit: studio ? String(studio.securityDeposit ?? 0) : "0",
  maxCapacity: studio ? String(studio.maxCapacity) : "",
  location: studio?.location ?? "",
  imageUrl: studio?.imageUrl ?? "",
  amenities: studio?.amenities ?? [],
  overview: studio?.overview ?? "",
})

const uploadToImgBB = async (file: File): Promise<string> => {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY

  if (!key) throw new Error("Image upload is not configured")

  const body = new FormData()
  body.append("image", file)

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`,
    { method: "POST", body }
  )
  const data = await res.json()

  if (!res.ok || !data?.data?.url) {
    throw new Error(data?.error?.message || "Image upload failed")
  }

  return data.data.url as string
}

const StudioForm = ({ studio }: { studio?: IStudio }) => {
  const router = useRouter()
  const [values, setValues] = useState<FormValues>(() => initialValues(studio))
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const setField = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => setValues((current) => ({ ...current, [field]: value }))

  const toggleAmenity = (amenity: string) =>
    setValues((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity)
        ? current.amenities.filter((item) => item !== amenity)
        : [...current.amenities, amenity],
    }))

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return

    setUploading(true)

    try {
      setField("imageUrl", await uploadToImgBB(file))
      toast.success("Cover image uploaded")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not upload image"
      )
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const hourlyRate = Number(values.hourlyRate)
    const securityDeposit = Number(values.securityDeposit || 0)
    const maxCapacity = Number(values.maxCapacity)

    if (
      !values.title.trim() ||
      !values.category ||
      !values.location.trim() ||
      !values.overview.trim()
    ) {
      toast.error("Please fill in every field")
      return
    }

    if (!values.imageUrl) {
      toast.error("Please upload a cover image")
      return
    }

    if (!(hourlyRate > 0) || !(maxCapacity > 0) || securityDeposit < 0) {
      toast.error("Please check the rate, deposit and capacity")
      return
    }

    setSubmitting(true)

    try {
      const token = await getTokenFromClient()
      const endpoint = studio
        ? `${process.env.NEXT_PUBLIC_API_URL}/studio/${studio._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/add-studio`

      const res = await fetch(endpoint, {
        method: studio ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...values,
          hourlyRate,
          securityDeposit,
          maxCapacity,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        toast.error(data.msg || "Could not save the studio")
        return
      }

      toast.success(
        studio ? "Studio updated successfully" : "Studio listed successfully"
      )
      router.push("/my-listings")
      router.refresh()
    } catch {
      toast.error("Could not reach the server. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
      {studio && (
        <p className="rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
          Listed by {studio.ownerName} ({studio.ownerEmail}). Host details
          cannot be changed here.
        </p>
      )}

      <div className="grid gap-2">
        <Label htmlFor="title">Studio title</Label>
        <Input
          id="title"
          value={values.title}
          onChange={(event) => setField("title", event.target.value)}
          placeholder="e.g. Sunlit Photo Loft"
          required
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={values.category}
            onChange={(event) => setField("category", event.target.value)}
            className="h-12 w-full rounded-xl border border-input bg-background px-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            required
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={values.location}
            onChange={(event) => setField("location", event.target.value)}
            placeholder="City or neighbourhood"
            required
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="hourlyRate">Hourly rate ($)</Label>
          <Input
            id="hourlyRate"
            type="number"
            min="1"
            step="1"
            value={values.hourlyRate}
            onChange={(event) => setField("hourlyRate", event.target.value)}
            placeholder="75"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="securityDeposit">Security deposit ($)</Label>
          <Input
            id="securityDeposit"
            type="number"
            min="0"
            step="1"
            value={values.securityDeposit}
            onChange={(event) =>
              setField("securityDeposit", event.target.value)
            }
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="maxCapacity">Max capacity</Label>
          <Input
            id="maxCapacity"
            type="number"
            min="1"
            step="1"
            value={values.maxCapacity}
            onChange={(event) => setField("maxCapacity", event.target.value)}
            placeholder="10"
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="overview">Overview</Label>
        <Textarea
          id="overview"
          value={values.overview}
          onChange={(event) => setField("overview", event.target.value)}
          placeholder="Describe the space, lighting and what creators can do here"
          className="min-h-32"
          required
        />
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm leading-none font-medium">Amenities</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {amenities.map((amenity) => (
            <Label
              key={amenity}
              className="gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-normal"
            >
              <input
                type="checkbox"
                checked={values.amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="size-4 accent-primary"
              />
              {amenity}
            </Label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-3">
        <Label htmlFor="coverImage">Cover image</Label>
        <div className="overflow-hidden rounded-xl border border-dashed border-input bg-muted/30 p-4">
          {values.imageUrl ? (
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg">
              <Image
                src={values.imageUrl}
                alt="Studio cover preview"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="mb-4 flex h-24 items-center justify-center gap-2 text-sm text-muted-foreground">
              <ImagePlus className="size-5" />
              Upload a photo of your space
            </div>
          )}
          <Input
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className={cn(
              "h-auto cursor-pointer bg-background",
              uploading && "opacity-60"
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" size="lg" disabled={uploading || submitting}>
          {submitting ? (
            <>
              <Loader2 className="animate-spin" />
              Saving...
            </>
          ) : studio ? (
            "Save changes"
          ) : (
            "List studio"
          )}
        </Button>
        {(uploading || submitting) && (
          <span className="text-sm text-muted-foreground">
            {uploading ? "Uploading image..." : "Saving studio..."}
          </span>
        )}
      </div>
    </form>
  )
}

export default StudioForm
