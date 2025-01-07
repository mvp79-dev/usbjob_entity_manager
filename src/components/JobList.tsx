import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';

interface Job {
  jobNumber: string;
  e: string;
  d: string | null;
  versions: Array<{
    version_id: number;
    version_name: string;
    version_number: number;
  }>;
}

interface JobListProps {
  entityId: number;
}

const JobList: React.FC<JobListProps> = ({ entityId }) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Mock data for initial development
  useEffect(() => {
    const mockJobs = [
      {
        jobNumber: "12345",
        e: "Sample Project",
        d: "2024-03-15",
        versions: [
          {
            version_id: 1,
            version_name: "Initial Version",
            version_number: 1
          }
        ]
      }
    ];
    setJobs(mockJobs);
  }, [entityId]);

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Jobs</h3>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.jobNumber}
            className="bg-gray-50 rounded-lg p-4"
          >
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">Job #{job.jobNumber}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <div>Project: {job.e}</div>
              {job.d && <div>Due Date: {new Date(job.d).toLocaleDateString()}</div>}
            </div>
            {job.versions.length > 0 && (
              <div className="mt-2">
                <div className="text-sm font-medium">Versions:</div>
                <div className="mt-1 space-y-1">
                  {job.versions.map((version) => (
                    <div
                      key={version.version_id}
                      className="text-sm text-gray-500"
                    >
                      {version.version_name} (v{version.version_number})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;