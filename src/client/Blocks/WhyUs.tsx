import * as React from 'react'
import { BarChart3, CogIcon as LightbulbCog, Building2, BadgeCheck } from 'lucide-react'

export function WhyUs() {
  return (
    <div className="w-full bg-primary text-white p-8 rounded-lg border border-dashed border-white/30">
      <div className="grid md:grid-cols-4 gap-8 relative">
        {/* Connecting lines with dots */}
        {/* <div className="hidden md:flex absolute top-5 left-[25%] w-[50%] items-center">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="h-px bg-white flex-1" />
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
        <div className="hidden md:flex absolute top-5 left-[50%] w-[50%] items-center">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="h-px bg-white flex-1" />
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
        <div className="hidden md:flex absolute top-5 left-[75%] w-[25%] items-center">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="h-px bg-white flex-1" />
          <div className="w-2 h-2 rounded-full bg-white" />
        </div> */}

        {/* Section 1 */}
        <div className="space-y-4 bg-primary p-3 rounded-lg">
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white">
              <span className="text-[#0B3B4E]">1</span>
            </div>
            <BarChart3 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold">
            Agile Delivery and Leadership in Complex Environments
          </h2>
          <p className="text-secondary text-sm">
            We excel in delivering technology solutions in complex environments with evolving
            customer needs, regulatory constraints, and resource limitations.
          </p>
          <ul className="text-sm">
            <li>Strategy definition</li>
            <li>Programme leadership</li>
            <li>Detailed planning</li>
            <li>• Financial control</li>
            <li>• Rigorous governance</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white">
              <span className="text-[#0B3B4E]">2</span>
            </div>
            <LightbulbCog className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold">
            Significant Technical Expertise in Cloud, AI, & Data
          </h2>
          <p className="text-sky-200 text-sm">
            Our architects and engineers possess extensive expertise in designing, building, and
            operating modern, leading-edge technologies and enterprise-class solutions.
          </p>
          <p className="text-sm">
            We deploy highly experienced, multidisciplinary teams skilled in product delivery,
            architecture, software development, DevOps, and security.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white">
              <span className="text-[#0B3B4E]">3</span>
            </div>
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold">
            Deep Public Sector, FS, Regulatory & Security Expertise
          </h2>
          <p className="text-sky-200 text-sm">
            We understand how to navigate public sector and financial services regulation and how to
            deliver compliant and robustly secure cutting-edge solutions in this context.
          </p>
          <p className="text-sm">
            We have successfully completed projects for numerous public sector and Financial
            Services engagements, including XXX, XXXXXX XXXXXX, XXXXX XXXXXXXXXXXXXXX,
            XXXXXXXXXXXXXX and many other institutions.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white">
              <span className="text-[#0B3B4E]">4</span>
            </div>
            <BadgeCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold">Extensive track record of delivery within XXXX</h2>
          <p className="text-sky-200 text-sm">
            We have collaborated closely with the XXXX since 2020 and understand its technology
            landscape and ambitions.
          </p>
          <p className="text-sm">
            As an XXXX strategic partner, we have led numerous transformation programmes, providing
            expertise in architectural design, engineering standards and technical leadership, and
            optimisations.
          </p>
        </div>
      </div>
    </div>
  )
}
