export default function PrimaryHeroSection() {
  return (
    <section
      className="relative flex items-center justify-center w-full h-[75vh] sm:h-[95vh] 
                 bg-cover bg-center 
                 bg-[url('/primary-hero-section-bg-img.jpg')]"
    >
      <div className="text-white text-left z-100 w-full max-w-2xl px-4">
        <p className="text-base sm:text-lg font-medium tracking-widest uppercase">
          Visión en
        </p>

        <h1 className="text-4xl sm:text-7xl font-bold uppercase mt-4">
          Construcción
        </h1>

        <p className="text-base sm:text-lg max-w-md mt-4">
          Nos enfocamos en la calidad y la innovación para construir proyectos
          que perduran, garantizando siempre la excelencia en cada detalle.
        </p>
      </div>

      <div className="hidden lg:flex absolute bottom-0 left-[50%] h-[90%] z-50">
        <img
          src="/primary-hero-section-bg-img-2.png"
          alt="Trabajador"
          className="h-full"
        />
      </div>

      <div className="hidden lg:flex absolute bottom-0 right-0">
        <img src="/primary-hero-section-bg-img-3.png" alt="Casa" />
      </div>
    </section>
  );
}
