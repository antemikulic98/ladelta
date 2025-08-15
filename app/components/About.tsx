export default function AboutSection() {
  const features = [
    {
      icon: '👨‍🍳',
      title: 'Ručna izrada',
      description:
        'Svaki proizvod radimo s ljubavlju i pažnjom u svakom detalju. Bez industrijskih dodataka.',
    },
    {
      icon: '🌾',
      title: 'Kvalitetni sastojci',
      description:
        'Biramo najbolje lokalne dobavljače i premium sastojke za autentičan okus.',
    },
    {
      icon: '🎨',
      title: 'Prilagođeni dizajn',
      description:
        'Svaku tortu i kolač dizajniramo prema vašim željama i posebnoj prigodi.',
    },
    {
      icon: '🚚',
      title: 'Fleksibilna dostava',
      description:
        'Dostava ili preuzimanje - prilagođavamo se vašim potrebama i rasporedu.',
    },
  ];

  return (
    <section id='o-nama' className='py-20 sm:py-28 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brandGold-50/20 via-white to-brandTeal-50/20' />
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-brandGold-200 rounded-full opacity-10' />
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-brandTeal-200 rounded-full opacity-10' />
      </div>

      <div className='container-page'>
        {/* Header */}
        <div className='text-center mb-16'>
          <span className='inline-block px-4 py-2 text-sm font-medium text-brandTeal bg-brandTeal-50 rounded-full mb-4'>
            🏺 Naša priča
          </span>
          <h2 className='text-4xl sm:text-5xl font-bold tracking-tight text-gradient mb-6'>
            O LaDelta slastičarstvu
          </h2>
          <p className='text-lg text-warmGray max-w-3xl mx-auto leading-relaxed'>
            LaDelta je nastala iz ljubavi prema tradicionalnom slastičarstvu i
            želje za stvaranjem nezaboravnih okusa. Mali smo hrvatski brend koji
            vjeruje da svaki trenutak zaslužuje posebnu slasticu - napravljena s
            pažnjom, ljubavlju i najboljim sastojcima.
          </p>
        </div>

        {/* Main content grid */}
        <div className='grid lg:grid-cols-2 gap-16 items-center mb-20'>
          {/* Story content */}
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-6'>
              Tradicija koja se prenosi
            </h3>
            <div className='space-y-4 text-warmGray leading-relaxed'>
              <p>
                Svaki naš recept je plod godina iskustva i strasti prema
                slastičarstvu. Kombiniramo tradicionalne tehnike s modernim
                pristupom, stvarajući slastice koje su istovremeno poznate i
                iznenađujuće.
              </p>
              <p>
                U našoj radionici, svaki dan počinje odabirom najkvalitetnijih
                sastojaka. Od svježih jaja lokalnih proizvođača do premium
                čokolade i sezonskog voća - nikad ne pristajemo na kompromise
                kad je riječ o kvaliteti.
              </p>
              <p>
                Vjerujemo da slastice nisu samo hrana, već mostovi koji povezuju
                ljude, stvaraju uspomene i čine posebne trenutke još
                vrjednijima.
              </p>
            </div>

            {/* Stats */}
            <div className='mt-8 grid grid-cols-2 gap-6'>
              <div className='text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm'>
                <div className='text-3xl font-bold text-brandTeal'>5+</div>
                <div className='text-sm text-warmGray'>Godina iskustva</div>
              </div>
              <div className='text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm'>
                <div className='text-3xl font-bold text-brandGold'>500+</div>
                <div className='text-sm text-warmGray'>Sretnih kupaca</div>
              </div>
            </div>
          </div>

          {/* Visual content */}
          <div className='relative'>
            <div className='bg-white rounded-3xl p-8 shadow-xl border border-gray-100'>
              <div className='text-center mb-6'>
                <div className='text-6xl mb-4'>🍰</div>
                <h4 className='text-xl font-bold text-gray-900'>
                  Naša filozofija
                </h4>
                <p className='text-warmGray text-sm'>
                  Kvaliteta iznad kvantitete
                </p>
              </div>

              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-brandGold rounded-full mt-2 flex-shrink-0' />
                  <p className='text-sm text-warmGray'>
                    Koristimo samo prirodne sastojke
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-brandTeal rounded-full mt-2 flex-shrink-0' />
                  <p className='text-sm text-warmGray'>
                    Sve radimo u malim serijama
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-brandGold rounded-full mt-2 flex-shrink-0' />
                  <p className='text-sm text-warmGray'>
                    Svaki proizvod je jedinstveno umjetničko djelo
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-2 h-2 bg-brandTeal rounded-full mt-2 flex-shrink-0' />
                  <p className='text-sm text-warmGray'>
                    Osobni pristup svakom kupcu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='product-card rounded-2xl p-6 text-center group hover:scale-105'
            >
              <div className='text-4xl mb-4 group-hover:scale-110 transition-transform duration-300'>
                {feature.icon}
              </div>
              <h4 className='text-lg font-bold text-gray-900 mb-3'>
                {feature.title}
              </h4>
              <p className='text-warmGray text-sm leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
