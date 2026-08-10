'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useUpdateProfile } from '@/hooks/useTechnicianData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/services/auth.service';
import apiClient from '@/lib/axios';
import { TechnicianProfile } from '@/types';
import { ServicesTab } from '@/components/technician/ServicesTab';
import { AvailabilityTab } from '@/components/technician/AvailabilityTab';

export default function TechnicianProfilePage() {
  const [Profile, setProfile] = useState<TechnicianProfile | null>(null);
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('0');
  const [location, setLocation] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  useEffect(() => {
    apiClient.get('/api/auth/me').then((res) => {
      const data = res.data.data;
      const tp: TechnicianProfile = data.technicianProfile;
      if (tp) {
        setProfile(tp);
        setBio(tp.bio || '');
        setExperience(String(tp.experience || 0));
        setLocation(tp.location || '');
        setSkillsInput((tp.skills || []).join(', '));
      }
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    updateProfile({
      bio,
      experience: Number(experience),
      location,
      skills,
    });
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Manage Profile</h1>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell customers about your experience..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    placeholder="Plumbing, Pipe Fitting, Wiring"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience (years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Dhaka"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Saving...' : 'Save Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="availability">
          <AvailabilityTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}
