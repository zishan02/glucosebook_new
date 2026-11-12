import { PatientsDashboard } from "@/sub-components/patients/PatientsDashboard";

export const metadata = {
  title: "Patients | Glucosebook",
  description: "Search, filter, and review the clinic patient roster.",
};

export default function PatientsPage() {
  return <PatientsDashboard />;
}
