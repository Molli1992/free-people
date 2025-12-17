import { ProjectDescriptionProps } from '@/types/projects';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import { v4 as uuidv4 } from 'uuid';

export default function ProjectDescription({
  images,
  description,
  challenge,
  finalView,
}: ProjectDescriptionProps) {
  return (
    <section className="flex items-center justify-center py-16 px-4 bg-secondary-white">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-2xl lg:max-w-7xl">
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <Title value="Project description" color="secondary" />
            <Text key={uuidv4()} value={description} color="secondary" />
          </div>

          <div className="flex flex-col gap-4">
            <Title value="The challenge in installation" color="secondary" />
            <Text value={challenge} color="secondary" />
          </div>

          <div className="flex flex-col gap-4">
            <Title value="The final view of project" color="secondary" />
            <Text value={finalView} color="secondary" />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div
            className="w-full h-[350px] bg-cover bg-center"
            style={{ backgroundImage: `url(${images[0]})` }}
          />

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            <div
              className="w-full sm:w-1/2 h-[350px] sm:h-[400px] bg-cover bg-center"
              style={{ backgroundImage: `url(${images[1]})` }}
            />
            <div
              className="w-full sm:w-1/2 h-[350px] sm:h-[400px] bg-cover bg-center"
              style={{ backgroundImage: `url(${images[2]})` }}
            />
          </div>

          <div
            className="w-full h-[350px] bg-cover bg-center"
            style={{ backgroundImage: `url(${images[3]})` }}
          />
        </div>
      </div>
    </section>
  );
}
