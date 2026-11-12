import { notFound } from "next/navigation";
import { PatientTypeDashboard } from "@/sub-components/patients/PatientTypeDashboard";

const patientTypes = {
  "t-type": "T-type",
  "l-type": "L-type",
  "e-type": "E-type",
};

export function generateStaticParams() {
  return Object.keys(patientTypes).map((type) => ({ type }));
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const patientType = patientTypes[type];

  return {
    title: patientType ? `${patientType} patients | Glucosebook` : "Patient type | Glucosebook",
    description: patientType ? `Review ${patientType} patients.` : "Review patients by monitoring type.",
  };
}

export default async function PatientTypePage({ params }) {
  const { type } = await params;
  const patientType = patientTypes[type];

  if (!patientType) {
    notFound();
  }

  return <PatientTypeDashboard patientType={patientType} />;
}
