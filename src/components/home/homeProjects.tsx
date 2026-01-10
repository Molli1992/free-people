'use client';

import { useEffect } from 'react';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import ProjectCard from '@/components/projects/projectCard';
import Slider from '@/components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import RedButton from '@/components/buttons/redButton';
import { useRouter } from 'next/navigation';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { SwiperProps as SwiperPropsType } from 'swiper/react';
import { useProjects } from '@/lib/hooks/projectsHook';
import { useProjectsStore } from '@/zustand/projectsStore';
import { ClipLoader } from 'react-spinners';

export default function HomeProjects() {
  const router = useRouter();
  const { getAllProjects } = useProjects();
  const { projects, setProjects, isDataLoad } = useProjectsStore();

  useEffect(() => {
    const fetchProjects = async () => {
      if (isDataLoad) return;

      const projects = await getAllProjects();
      if (!projects) return;
      setProjects(projects);
    };

    fetchProjects();
  }, [getAllProjects, isDataLoad]);

  if (!isDataLoad)
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-darkBlue">
        <ClipLoader color="#000000" size={50} />
      </div>
    );

  const sliderProps: SwiperPropsType = {
    pagination: {
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    loop: false,
    speed: 500,
    slidesPerView: 1,
    slidesPerGroup: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1280: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    },
  };

  return (
    <section className="flex items-center justify-center py-16 px-4 bg-darkBlue">
      <div className="flex flex-col gap-6 w-full max-w-7xl">
        <Separator value="Nuestro Trabajo" />

        <Title value="Explorar proyectos recientes" color="primary" />

        <Text
          value="Cada proyecto en nuestro portafolio es un testimonio de nuestra dedicación a la calidad y la innovación. 
          Desde construcciones residenciales hasta renovaciones comerciales, hemos dejado una marca de excelencia en cada obra. 
          Lo invitamos a explorar nuestra galería para descubrir el compromiso y la precisión que nos definen."
          color="primary"
        />

        <div className="w-full">
          {projects && projects.length > 0 && (
            <Slider props={sliderProps}>
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="w-full flex items-center justify-center pb-12 px-2">
                    <ProjectCard
                      id={project.id}
                      images={project.images}
                      title={project.title}
                      type={project.type}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Slider>
          )}
        </div>

        <div>
          <RedButton
            value={
              <div className="flex items-center gap-2">
                <p>Nuestros Proyectos</p>
                <IoIosArrowDroprightCircle className="w-6 h-6" />
              </div>
            }
            onClick={() => router.push('/projects')}
            loading={false}
          />
        </div>
      </div>
    </section>
  );
}
