

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold tracking-tight mb-6 text-primary">À Propos de ZangaAuto</h1>
        <div className="space-y-4 text-card-foreground">
          <p>
            Ce site ne collecte pas d'informations sur les personnes et aucun payement n'est effectué sur ce site.
          </p>
          <p>
            ZangaAuto est une plateforme de vitrine pour des véhicules d'exception. Notre objectif est de présenter une collection de voitures de qualité. 
          </p>
          <p>
           Pour plus d'informations, vous êtes sollicités à contacter le personnel directement via les options de contact disponibles sur la page de détail de chaque véhicule.
          </p>
        </div>
      </div>
    </div>
  );
}
