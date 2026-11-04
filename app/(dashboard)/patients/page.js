import PatientsBoard from 'sub-components/patients/PatientsBoard';

export const metadata = {
	title: 'Patients | Glucosebook Clinical Workspace',
	description: 'Search and manage the clinic patient caseload.'
};

export default function PatientsPage() {
	return <PatientsBoard />;
}
