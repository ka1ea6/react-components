import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface WorkHistory {
  company: string
  position: string
  startDate: string
  endDate?: string
  description?: string
}

interface Certification {
  name: string
  issuer?: string
  dateObtained?: string
  expirationDate?: string
}

interface AreaOfExpertise {
  area: string
  description?: string
}

interface ConsultantProfileProps {
  name: string
  email: string
  profilePicture?: string
  workHistory?: WorkHistory[]
  certifications?: Certification[]
  areasOfExpertise?: AreaOfExpertise[]
}

const ConsultantProfile: React.FC<ConsultantProfileProps> = ({
  name,
  email,
  profilePicture,
  workHistory = [],
  certifications = [],
  areasOfExpertise = [],
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full overflow-hidden">
              {profilePicture ? (
                <Image
                  src={profilePicture}
                  alt={name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-center mt-4">
              {name || 'Consultant Name'}
            </CardTitle>
            <p className="text-gray-600 text-center">{email || 'email@example.com'}</p>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Areas of Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {areasOfExpertise.length > 0 ? (
                areasOfExpertise.map((area, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {area.area}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-600">No areas of expertise available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Work History</CardTitle>
          </CardHeader>
          <CardContent>
            {workHistory.length > 0 ? (
              workHistory.map((job, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <h4 className="font-medium text-gray-800">
                    {job.position} at {job.company}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate || 'Present'}
                  </p>
                  {job.description && <p className="mt-1 text-gray-700">{job.description}</p>}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No work history available</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            {certifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-medium text-gray-800">{cert.name}</h4>
                    {cert.issuer && <p className="text-sm text-gray-600">{cert.issuer}</p>}
                    {cert.dateObtained && (
                      <p className="text-xs text-gray-500 mt-1">Obtained: {cert.dateObtained}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No certifications available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ConsultantProfile
