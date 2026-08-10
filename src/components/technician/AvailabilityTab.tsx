'use client';

import { useState } from 'react';
import { useUpdateAvailability } from '@/hooks/useTechnicianData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const DAYS = [
  { label: 'Sunday', value: 0 },
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
];

interface DaySlot {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

export function AvailabilityTab() {
  const { mutate: updateAvailability, isPending } = useUpdateAvailability();

  const [slots, setSlots] = useState<Record<number, DaySlot>>(
    DAYS.reduce(
      (acc, day) => ({
        ...acc,
        [day.value]: { enabled: false, startTime: '09:00', endTime: '17:00' },
      }),
      {}
    )
  );

  const toggleDay = (day: number) => {
    setSlots((prev) => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled },
    }));
  };

  const updateTime = (day: number, field: 'startTime' | 'endTime', value: string) => {
    setSlots((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSave = () => {
    const payload = Object.entries(slots)
      .filter(([, slot]) => slot.enabled)
      .map(([day, slot]) => ({
        dayOfWeek: Number(day),
        startTime: slot.startTime,
        endTime: slot.endTime,
      }));

    updateAvailability(payload);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {DAYS.map((day) => (
            <div key={day.value} className="flex flex-wrap items-center gap-4 rounded-lg border p-3">
              <div className="flex w-32 items-center gap-2">
                <Checkbox
                  id={`day-${day.value}`}
                  checked={slots[day.value].enabled}
                  onCheckedChange={() => toggleDay(day.value)}
                />
                <Label htmlFor={`day-${day.value}`}>{day.label}</Label>
              </div>

              {slots[day.value].enabled && (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    className="w-32"
                    value={slots[day.value].startTime}
                    onChange={(e) => updateTime(day.value, 'startTime', e.target.value)}
                  />
                  <span className="text-sm text-gray-500">to</span>
                  <Input
                    type="time"
                    className="w-32"
                    value={slots[day.value].endTime}
                    onChange={(e) => updateTime(day.value, 'endTime', e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <Button className="mt-6" onClick={handleSave} disabled={isPending}>
          {isPending ? 'Saving...' : 'Save Availability'}
        </Button>
      </CardContent>
    </Card>
  );
}
