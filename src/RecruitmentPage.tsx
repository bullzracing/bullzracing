import { useState } from 'react';
import { motion } from 'framer-motion';

const RECRUITMENT_FORM_URL = 'GOOGLE_FORM_URL_PLACEHOLDER';

interface RecruitmentSubsection {
  title: string;
  description: string;
}

interface RecruitmentSubsystem {
  title: string;
  description: string;
  image: string;
  alt: string;
  label?: string;
  subsections?: RecruitmentSubsection[];
}

const subsystems: RecruitmentSubsystem[] = [
  {
    title: 'Chassis',
    description: 'Designing and manufacturing the backbone of the car, engineered for strength, safety, and performance while pushing the limits of lightweight design.',
    image: '/Resources/Recruitment/chassis.jpg',
    alt: 'Chassis subsystem',
  },
  {
    title: 'Vehicle Dynamics',
    description: 'Engineering how the car responds on track through braking, steering, and suspension, optimising every interaction between the driver and the road.',
    image: '/Resources/Recruitment/vehicleDynamics.JPG',
    alt: 'Vehicle Dynamics subsystem',
  },
  {
    title: 'Powertrain',
    description: 'Engineering end-to-end powertrain systems integrating intake, fueling, cooling, exhaust, and drivetrain to maximise performance, efficiency, and reliability.',
    image: '/Resources/Recruitment/powertrain.JPG',
    alt: 'Powertrain subsystem',
  },
  {
    title: 'DAQ',
    label: 'Data Acquisition',
    description: 'Validating our designs through data, capturing and analysing information from every subsystem to understand, optimise, and push the car’s performance further.',
    image: '/Resources/Recruitment/daq.JPG',
    alt: 'Data Acquisition subsystem',
  },
  {
    title: 'EV Powertrain',
    description: 'Building Bullz Racing’s first EV for the upcoming season, taking on the challenge of developing the systems that power the car and keep it safe on track.',
    image: '/Resources/Recruitment/evPowertrain.JPG',
    alt: 'EV Powertrain subsystem',
    subsections: [
      {
        title: 'High Voltage',
        description: 'Working at the heart of the electric powertrain, developing the systems that deliver, manage, and control the energy driving the car.',
      },
      {
        title: 'Low Voltage',
        description: 'Designing the systems that make the car intelligent and safe, from control and monitoring circuits to the critical systems that ensure the car is always ready to race.',
      },
    ],
  },
  {
    title: 'Aerodynamics',
    description: 'Shaping airflow around the car to generate downforce, improve stability, and maximise performance without compromising efficiency.',
    image: '/Resources/Recruitment/aerodynamics.jpeg',
    alt: 'Aerodynamics subsystem',
  },
  {
    title: 'Management',
    description: 'Driving the team beyond engineering through sponsorships, finance, marketing, operations, and strategic decisions that keep Bullz Racing moving forward.',
    image: '/Resources/Recruitment/management.JPG',
    alt: 'Management subsystem',
  },
  {
    title: 'Media',
    description: 'Telling the Bullz Racing story through photography, videography, design, and digital content that brings our work, people, and racing experience to life.',
    image: '/Resources/Recruitment/media.JPG',
    alt: 'Media subsystem',
  },
];

function RecruitmentImage({ src, alt, hero = false }: { src: string; alt: string; hero?: boolean }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`w-full overflow-hidden border border-white/10 bg-dark-secondary ${hero ? 'absolute inset-0 rounded-none' : 'relative aspect-[4/3] rounded-lg'}`}
      role={hasError ? 'img' : undefined}
      aria-label={hasError ? alt : undefined}
    >
      {hasError ? (
        <div className={`absolute inset-0 flex ${hero ? 'items-end justify-start' : 'items-center justify-center'} bg-dark-secondary p-6`}>
          <span className={`glass-effect rounded-lg px-6 py-4 text-center text-silver ${hero ? 'relative z-10' : ''}`}>
            Image coming soon
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={hero ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}

function SubsystemSection({ subsystem, index }: { subsystem: RecruitmentSubsystem; index: number }) {
  const imageFirst = index % 2 === 0;

  return (
    <motion.section
      aria-labelledby={`recruitment-${index}-title`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`py-14 md:py-20 ${index % 2 === 0 ? 'bg-dark' : 'bg-dark-secondary'}`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
        <div className={imageFirst ? 'md:order-1' : 'md:order-2'}>
          <RecruitmentImage src={subsystem.image} alt={subsystem.alt} />
        </div>
        <div className={`space-y-6 ${imageFirst ? 'md:order-2' : 'md:order-1'}`}>
          <div>
            <h2 id={`recruitment-${index}-title`} className="mb-4 text-3xl font-bold text-gold md:text-4xl">
              {subsystem.title}
            </h2>
            {subsystem.label && <p className="mb-3 text-lg font-semibold text-white">{subsystem.label}</p>}
            <p className="text-lg leading-relaxed text-silver">{subsystem.description}</p>
          </div>
          {subsystem.subsections && (
            <div className="grid gap-4 md:grid-cols-2">
              {subsystem.subsections.map((subsection) => (
                <div key={subsection.title} className="glass-card rounded-lg p-5">
                  <h3 className="mb-3 text-xl font-bold text-gold">{subsection.title}</h3>
                  <p className="leading-relaxed text-silver">{subsection.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

export default function RecruitmentPage() {
  return (
    <main>
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-dark px-4 pb-12 pt-24 text-center">
        <RecruitmentImage
          src="/Resources/Recruitment/recruitmentApplyNow.jpeg"
          alt="Recruitment hero image"
          hero
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-6">
          <img
            src="/Resources/Logos/Bullz Logo_Best.png"
            alt="Bullz Racing"
            width={256}
            height={265}
            decoding="async"
            className="h-28 w-auto object-contain md:h-36"
          />
          <h1 className="text-4xl font-bold leading-tight text-gold drop-shadow-[4px_4px_10px_rgba(0,0,0,1)] sm:text-5xl md:text-6xl">
            <span className="block sm:inline">Bullz Racing is Recruiting! </span>
            <span className="block sm:inline"></span>
            <span className="block"></span>
          </h1>
          <a
            href={RECRUITMENT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-black/50 px-8 py-3 font-semibold text-gold transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            APPLY NOW
          </a>
        </div>
      </section>
      {subsystems.map((subsystem, index) => (
        <SubsystemSection key={subsystem.title} subsystem={subsystem} index={index} />
      ))}
    </main>
  );
}
