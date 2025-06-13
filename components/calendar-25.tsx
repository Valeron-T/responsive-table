"use client"

import * as React from "react"
import { Check, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"

export default function Calendar25() {

  return (
    <div className="flex flex-col gap-6">
      <Popover>
        <PopoverTrigger asChild >
          <Button
            aria-label="Reset filters"
            variant="outline"
            size="sm"
            className="border-dashed"
          >
            <Clock />
            Time
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="time-from" className="px-1">
                From
              </Label>
              <Input
                type="time"
                id="time-from"
                step="1"
                defaultValue="10:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="time-to" className="px-1">
                To
              </Label>
              <Input
                type="time"
                id="time-to"
                step="1"
                defaultValue="12:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
            <div className="flex items-end">
              <PopoverClose asChild>
                <Button
                  aria-label="Time" 
                  variant="default"
                  size="icon"
                  className="border-dashed cursor-pointer"
                  onClick={() => toast('Time update simulated')}
                >
                  <Check />
                </Button>
              </PopoverClose>
            </div>
          </div>
        </PopoverContent>
      </Popover>

    </div>
  )
}
