export function About() {
  return (
    <section
      className="w-full place-items-center bg-background-secondary px-4 md:px-12 lg:px-24 py-16"
      id="sobre"
    >
      <div className="max-w-7xl">
        {/* Título principal */}
        <h2 className="font-bold mb-8">Sobre Mim</h2>
        {/* Parágrafo introdutório */}
        <p className="text-base md:text-lg leading-relaxed mb-12 text-foreground"
          
        >
          Lorem ipsum dolor sit amet consectetur. Leo hac nec dolor nulla
          semper. In id non fusce nullam. Pellentesque senectus habitasse
          gravida hac fermentum maecenas. Purus vein eu non fermentum nulla
          vitae volutpat. Ipsum est ullamcorper amet tincidunt. Commodo varius
          commodo consequat vulputate vitae. Eget elementum egestas tincidunt
          nec diam auctor. Odio nec est arcu turpis lorem. Sed donec sit nec
          turpis sed in aliquet. Leo tortor pulvinar lorem vel mus sed
          pellentesque viverra. Aliquam donec sed dolor viverra commodo eu
          rutrum sapien ac. Dignissim duis iaculis tempus morbi orci. Netus
          lacinia tincidunt eu auctor. Pretium cras tortor aliquet ullamcorper
          amet. Tristique turpis sit tempus cursus iaculis diam. Ac tortor non
          elementum lobortis semper velit neque. Euismod tellus odio in amet sed
          sapien. Integer tincidunt ultrices vitae pretium. Ante morbi gravida
          imperdiet phasellus suscipit. Ut mi sed amet ac risus imperdiet nibh
          scelerisque amet. Pellentesque sed orci eu id nulla. Venenatis arcu
          orci sit posuere gravida. Id quisque velit euismod at pharetra rhoncus
          urna lectus tortor. Metus parturient parturient ultrices tellus varius
          luctus imperdiet eu.
        </p>
        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Aprendizado Contínuo */}
          <div>
            <h3 className="mb-4">Aprendizado Contínuo</h3>
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              Lorem ipsum dolor sit amet consectetur. Non phasellus eu sed ac
              aliquam suspendisse adipiscing. Vulputate ridiculus non sed sit.
            </p>
          </div>
          {/* Foco em Resolução de Problemas */}
          <div>
            <h3 className="mb-4">Foco em Resolução de Problemas</h3>
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              Lorem ipsum dolor sit amet consectetur. Non phasellus eu sed ac
              aliquam suspendisse adipiscing. Vulputate ridiculus non sed sit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
