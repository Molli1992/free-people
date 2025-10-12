import { ProjectDescriptionProps } from '@/types/types';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';

export default function ProjectDescription({
  images,
  description,
}: ProjectDescriptionProps) {
  return (
    <section className="flex items-center justify-center py-16 px-4 bg-secondary-white">
      <div className="flex flex-col lg:flex-row gap-6 w-full sm:max-w-2xl lg:max-w-7xl">
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <div className="flex flex-col gap-4">
            <Title value="Project description" color="secondary" />
            {description &&
              description.map((text) => {
                return <Text value={text} color="secondary" />;
              })}
          </div>

          <div className="flex flex-col gap-4">
            <Title value="The challenge in installation" color="secondary" />
            <Text
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              color="secondary"
            />
            <Text
              value="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum. aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
              color="secondary"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Title value="The final view of project" color="secondary" />
            <Text
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              color="secondary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div
            className="w-full h-[350px] bg-cover bg-center"
            style={{ backgroundImage: `url(${images[0].src})` }}
          />

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
            <div
              className="w-full sm:w-1/2 h-[350px] sm:h-[400px] bg-cover bg-center"
              style={{ backgroundImage: `url(${images[1].src})` }}
            />
            <div
              className="w-full sm:w-1/2 h-[350px] sm:h-[400px] bg-cover bg-center"
              style={{ backgroundImage: `url(${images[2].src})` }}
            />
          </div>

          <div
            className="w-full h-[350px] bg-cover bg-center"
            style={{ backgroundImage: `url(${images[3].src})` }}
          />
        </div>
      </div>
    </section>
  );
}
