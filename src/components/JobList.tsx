import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import axios from 'axios';
import qs from 'qs';

// interface Job {
//   jobNumber: string;
//   e: string;
//   d: string | null;
//   versions: Array<{
//     version_id: number;
//     version_name: string;
//     version_number: number;
//   }>;
// }
interface Job {
  job_id:number;
  job_number: number;
  job_date_due: string;
}

interface JobListProps {
  entityId: number;
}

const JobList: React.FC<JobListProps> = ({ entityId }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const getJobs = async() => {
    const data = {
      mode:'getJobByEntity',
      entities_id:entityId
    }
    const baseUrl = `${window.location.protocol}//${window.location.host}/`;
    // const baseUrl = 'https://everyusb.io';
    try{
      const response = await axios.post(baseUrl + '/j/inc/class/class.entities.php', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      if (response.data.data != 'No jobs found.') {
        setJobs(response.data.data);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.log('ajax call error:', error);
    }
  }

  // Mock data for initial development
  useEffect(() => {
    getJobs();
    // const mockJobs = [
    //   {
    //     jobNumber: "12345",
    //     e: "Sample Project",
    //     d: "2024-03-15",
    //     versions: [
    //       {
    //         version_id: 1,
    //         version_name: "Initial Version",
    //         version_number: 1
    //       }
    //     ]
    //   }
    // ];
    // setJobs(mockJobs);
  }, [entityId]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Jobs</h3>
      <div className="space-y-4">
        {jobs && jobs.map((job) => (
          <div
            key={job.job_number}
            className="bg-gray-50 rounded-lg p-4 flex justify-between"
          >
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
              <a href={window.location.protocol + '//' + window.location.host + '/j/' + job.job_number} target='_blank'><span className="font-medium">Job #{job.job_number}</span></a>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {job.job_date_due && <div>Due Date: {new Date(job.job_date_due).toLocaleDateString()}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;