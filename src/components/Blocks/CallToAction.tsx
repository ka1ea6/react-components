'use client'
import React, { useState } from 'react';

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { RichText } from '@/components/Payload/RichText'
import { CMSLink } from '@/components/Payload/Link'
import { Form } from '../../sections/form';

export const CallToActionBlockOld: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" content={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}


export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal if the click is on the overlay (not the modal content)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="relative isolate overflow-hidden bg-black">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center prose">
          {richText && (
            <RichText
              className="mb-0 prose-p:text-white text-white"
              content={richText}
              enableGutter={false}
            />
          )}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <div className="flex flex-col gap-8 text-white">
              {(links || []).map(({ link }, i) => {
                if (link?.url === '/contact') {
                  return (
                    <div
                      key={i}
                      onClick={openModal} // Open modal on click
                      className="rounded-full px-3.5 py-2.5 border border-accent text-white no-underline cursor-pointer"
                    >
                      {link.label}
                    </div>
                  );
                } else {
                  return (
                    <CMSLink
                      key={i}
                      size="lg"
                      className="rounded-full px-3.5 py-2.5 border border-accent text-white no-underline"
                      {...link}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick} // Close modal on overlay click
        >
          <div className="bg-white p-6 pt-10 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ✕
            </button>
            <Form /> {/* Render the form inside the modal */}
          </div>
        </div>
      )}

      <svg
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
      >
        <circle
          r={512}
          cx={512}
          cy={512}
          fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#22B2AA" />
            <stop offset={1} stopColor="#22B2AA" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

