export const userGroupsResponse = {
  meta: {
    generatedAt: "2026-11-12T09:10:00+05:30",
    timezone: "Asia/Kolkata",
  },
  groups: [
    {
      id: "group-care-coordinators",
      name: "Care coordinators",
      description: "Coordinates follow-ups, scheduling, and day-to-day patient outreach.",
      accessLevel: "Care operations",
    },
    {
      id: "group-endocrinologists",
      name: "Endocrinologists",
      description: "Reviews clinical trends and owns diabetes treatment decisions.",
      accessLevel: "Clinical review",
    },
    {
      id: "group-educators",
      name: "Diabetes educators",
      description: "Supports device onboarding, nutrition guidance, and self-management.",
      accessLevel: "Patient education",
    },
  ],
  users: [
    {
      id: "user-asha-kapoor",
      name: "Asha Kapoor",
      email: "asha.kapoor@example.com",
      role: "Lead coordinator",
      groupId: "group-care-coordinators",
      status: "Active",
    },
    {
      id: "user-nikhil-rao",
      name: "Nikhil Rao",
      email: "nikhil.rao@example.com",
      role: "Care coordinator",
      groupId: "group-care-coordinators",
      status: "Active",
    },
    {
      id: "user-meera-shah",
      name: "Dr. Meera Shah",
      email: "meera.shah@example.com",
      role: "Consultant endocrinologist",
      groupId: "group-endocrinologists",
      status: "Active",
    },
    {
      id: "user-vikram-sen",
      name: "Dr. Vikram Sen",
      email: "vikram.sen@example.com",
      role: "Endocrinologist",
      groupId: "group-endocrinologists",
      status: "Invited",
    },
    {
      id: "user-priya-nair",
      name: "Priya Nair",
      email: "priya.nair@example.com",
      role: "Diabetes educator",
      groupId: "group-educators",
      status: "Active",
    },
  ],
};
