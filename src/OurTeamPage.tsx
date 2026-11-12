import { useEffect, useState } from 'react';
import { teamMembers, type TeamMember } from './teamMembers';

function MemberCard({ member }: { member: TeamMember }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="w-[calc((100%_-_24px)/2)] flex-none min-w-0 text-center md:w-[calc((100%_-_64px)/3)] lg:w-[calc((100%_-_96px)/4)]">
      <div className="mb-3 aspect-square w-full overflow-hidden rounded-lg border border-white/10 bg-dark-secondary">
        {!imageFailed && (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <h2 className="break-words text-base font-semibold text-white md:text-lg">
        {member.name}
      </h2>
      <p className="mt-1 break-words text-sm text-neutral-400 md:text-base">
        {member.role}
      </p>
    </article>
  );
}

export default function OurTeamPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const existingDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = existingDescription?.content;
    const description = existingDescription ?? document.createElement('meta');

    document.title = 'Our Team | Bullz Racing';
    description.name = 'description';
    description.content = 'Meet the Bullz Racing Management Committee for 2026-27.';
    if (!existingDescription) {
      document.head.appendChild(description);
    }

    return () => {
      document.title = previousTitle;
      if (existingDescription) {
        existingDescription.content = previousDescription ?? '';
      } else {
        description.remove();
      }
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-dark py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-center text-4xl font-bold text-gold">
          MANAGEMENT COMMITTEE
        </h1>
        <div className="mx-auto mb-3 mt-2.5 h-px w-11 bg-gold" aria-hidden="true" />
        <p className="mb-5 text-center text-[27px] font-semibold text-white">2026-27</p>
        <p className="mx-auto mb-4 max-w-3xl text-center text-lg leading-relaxed text-silver">
          The Management Committee leads the strategic and operational direction of Bullz Racing, ensuring every subsystem works in sync towards a common goal. Bringing together leadership, technical expertise, and coordination, they drive the team forward through every stage of the build and beyond.
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <MemberCard key={member.image} member={member} />
          ))}
        </div>
      </div>
    </main>
  );
}
