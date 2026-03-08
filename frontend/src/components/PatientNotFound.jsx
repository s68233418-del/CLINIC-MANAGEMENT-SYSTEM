import { NotebookIcon } from 'lucide-react'
import { Link } from 'react-router'
const PatientNotFound = () => {
   return (
      <div className='flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
         <div className='bg-primary/10 rounded-full p-8'>
            <NotebookIcon className='size-10 text-primary' />
         </div>
         <h3 className='text-2xl font-bold'> No patients yet</h3>
         <p className='text-base-content/70'>
            Ready to add patients? Add first patient to the Clinic.
         </p>
         <Link to='/create' className='btn btn-primary'>
            Add First Patient to the Clinic
         </Link>
      </div>
   )
}
export default PatientNotFound