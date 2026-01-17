'use client';

import { useEffect } from 'react';
import Separator from '@/components/texts/separator';
import Title from '@/components/texts/title';
import Text from '@/components/texts/text';
import CardServices from '@/components/services/serviceCard';
import Slider from '@/components/slider/slider';
import { SwiperSlide } from 'swiper/react';
import RedButton from '@/components/buttons/redButton';
import { useRouter } from 'next/navigation';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { SwiperProps as SwiperPropsType } from 'swiper/react';
import { architectureIcons } from '@/types/constants';
import { useServices } from '@/lib/hooks/servicesHook';
import { useServicesStore } from '@/zustand/serviceStore';
import { ClipLoader } from 'react-spinners';

export default function HomeServices() {
  const router = useRouter();
  const { getServices } = useServices();
  const { services, setServices, isDataLoad } = useServicesStore();

  useEffect(() => {
    const fetchServices = async () => {
      if (isDataLoad) return;

      const fullServices = await getServices();
      if (!fullServices) return;
      setServices(fullServices);
    };

    fetchServices();
  }, [getServices, isDataLoad]);

  if (!isDataLoad)
    return (
      <div className="h-[300px] w-full flex items-center justify-center bg-secondary-white">
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
    <section className="flex items-center justify-center py-16 px-4 bg-secondary-white">
      <div className="flex flex-col gap-6 w-full max-w-7xl">
        <Separator value="¿Que Hacemos?" />

        <Title value="Nuestras Áreas de Especialización" color="secondary" />

        <Text
          value="En FREE PEOPLE S.A., ofrecemos un enfoque integral y profundamente profesional estructurado en tres ejes clave que cubren 
          todo el espectro de la industria: la ingeniería de infraestructura civil, el desarrollo de edificaciones de diversa escala y 
          la preservación de activos mediante la rehabilitación y el mantenimiento especializado. Nuestra propuesta de valor se basa en integrar diseño, 
          planificación técnica y una ejecución impecable, priorizando siempre la seguridad ocupacional y la sostenibilidad ambiental. 
          Trabajamos con procesos trazables y una comunicación clara para garantizar que cada intervención, ya sea una obra nueva o una remodelación técnica, 
          se entregue con la máxima calidad y dentro de los plazos acordados, asegurando la funcionalidad y el valor real para nuestros clientes."
          color="secondary"
        />

        <div className="w-full">
          {services && services.length > 0 && (
            <Slider props={sliderProps}>
              {services.map((service, index) => {
                const randomIcon = architectureIcons[index];

                return (
                  <SwiperSlide key={service.id}>
                    <div className="w-full flex items-center justify-center pb-12 px-2">
                      <CardServices
                        icon={randomIcon ? randomIcon : architectureIcons[0]}
                        name={service.name}
                        image={service.image}
                        description={service.description}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Slider>
          )}
        </div>

        <div>
          <RedButton
            value={
              <div className="flex items-center gap-2">
                <p>Nuestros Servicios</p>
                <IoIosArrowDroprightCircle className="w-6 h-6" />
              </div>
            }
            onClick={() => router.push('/services')}
            loading={false}
          />
        </div>
      </div>
    </section>
  );
}
