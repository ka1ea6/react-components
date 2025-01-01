import { PricingCard, PricingCardProps } from '@/components/Cards/PricingCard'
import { Container } from '@/components/Other/Container'
import { SectionHeading, type SectionHeadingWithoutStylingProps } from '@/components/HeaderFooter/SectionHeading'
import { getStaggeredDelay } from '@/lib/utils/setStaggeredDelay'

export interface PricingSectionProps {
  sectionHeading: SectionHeadingWithoutStylingProps
  cards: PricingCardProps[]
}

export function PricingSection({ sectionHeading, cards }: PricingSectionProps) {

  return (
    <section className="section-padding-primary !pt-0">
      <Container>
        <div className="mx-auto max-w-[630px]" data-aos="fade-up" data-aos-delay="100">
          <SectionHeading {...sectionHeading} alignment="center" hasBottomSpacing />
        </div>
        {cards && cards.length > 0 && (
          <div className="grid gap-30px">
            {cards.map((card, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={getStaggeredDelay([200, 400, 600], index)}
                className='py-2'
              >
                <PricingCard {...card} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
