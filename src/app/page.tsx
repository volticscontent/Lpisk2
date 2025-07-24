'use client'

import Image from 'next/image'

const sectionsData = [
  {
    id: 1,
    title: 'TEXTO_IMAGE_HERO',
    image: '/next.svg',
    text: 'TEXTO_IMAGE_HERO',
    buttonText: 'Aplique para uma consultoria gratuita',
    miniText: 'Teste grátis por 14 dias'
  },
  {
    id: 2,
    title: 'Essa é a única onda que você precisa surfar pra mudar de vida em 2025…',
    image: '/vercel.svg',
    text: 'SPECIAL_SECTION_2',
    buttonText: 'Aplique para uma consultoria gratuita',
    miniText: 'Consultoria Nutra Global - O caminho certo para seu sucesso'
  },
  {
    id: 3,
    title: 'No plano Wifi money da consultoria gratuita você irá receber todos esses bônus:',
    image: '/file.svg',
    text: 'SPECIAL_SECTION_3',
    buttonText: 'QUERO ME APLICAR PRA CONSULTORIA',
    miniText: 'Consultoria 100% gratuita'
  },
  {
    id: 4,
    title: 'Por que é o método mais fácil de alcançar sua liberdade geográfica?',
    image: '/window.svg',
    text: 'SPECIAL_SECTION_4',
    buttonText: 'Aplique para uma consultoria gratuita',
    miniText: 'Se esse é o seu perfil, aplique agora'
  },
  {
    id: 5,
    title: 'SPECIAL_SECTION_5',
    image: '/star.svg',
    text: 'SPECIAL_SECTION_5',
    buttonText: 'QUERO ME APLICAR PRA CONSULTORIA',
    miniText: 'Consultoria 100% gratuita'
  },
  {
    id: 6,
    title: 'Quem é o Felipiska?',
    image: '/globe.svg',
    text: 'Quem sou eu pra te prometer tudo isso?\n\nMeu nome é Piska, tenho 21 anos e sou especialista em e-commerce global. Já viajei por mais de 30 países e entendi uma coisa: o mundo paga muito melhor que o Brasil.\n\nMontei minha primeira operação digital sozinho, com capital próprio.\n\nFaturei alto vendendo em moedas fortes, sem depender de seguidores, sem aparecer e sem ser refém de plataformas brasileiras.\n\nDepois disso, decidi ensinar minha metodologia e ajudar outras pessoas a conquistarem a mesma liberdade.\n\nJá ajudei dezenas de pessoas a criarem suas próprias operações globais e faturarem alto todos os meses.\n\nE agora, nesta Reunião Gratuita, eu quero te mostrar exatamente como você também pode montar sua operação de e-commerce internacional e escalar para faturar em euro, dólar ou libra — com uma estrutura validada que funciona.',
    buttonText: 'Aplique para uma consultoria gratuita',
    miniText: 'Metodologia testada e aprovada'
  }
]

export default function Home() {
  // Define background and text colors for each section
  const getSectionClasses = (sectionId: number) => {
    switch(sectionId) {
      case 1: return { bg: 'bg-black', text: 'text-white' } // Hero - preto
      case 2: return { bg: 'bg-white', text: 'text-black' } // Lista "Você não precisa" - branco
      case 3: return { bg: 'bg-[#F5F5F5]', text: 'text-black' } // Perfis - cinza claro
      case 4: return { bg: 'bg-black', text: 'text-white' } // Liberdade geográfica - preto
      case 5: return { bg: 'bg-white', text: 'text-black' } // Objeções - branco
      case 6: return { bg: 'bg-[#003322]', text: 'text-white' } // Quem é Felipiska - verde escuro
      default: return { bg: 'bg-black', text: 'text-white' }
    }
  }

  return (
    <div className="min-h-screen">
      {/* All Sections */}
      <main className="w-full">
        {sectionsData.map((section, index) => {
          const sectionClasses = getSectionClasses(section.id)
          return (
            <section key={section.id} className={`${sectionClasses.bg} ${sectionClasses.text} ${section.id === 1 ? '' : 'py-6'} ${index !== sectionsData.length - 1 ? 'border-b border-gray-300' : ''}`}>
              <div className={section.id === 1 ? "w-full" : "max-w-4xl mx-auto text-center px-2"}>

              {/* Banner Image - Only on first section at top */}
              {section.id === 1 && (
                <div className="w-full">
                  <Image
                    src="/banner4.png"
                    alt="Banner Principal LP Piska"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {section.id === 1 ? (
                <div className="max-w-4xl mx-auto text-center px-2 py-6">
                  {/* Hero Text Image or Regular Title/Text */}
                  {section.text === 'TEXTO_IMAGE_HERO' ? (
                    <div className="mb-6">
                      <Image
                        src="/texto1.png"
                        alt="Receba um plano de ação completo para e-commerce global"
                        width={800}
                        height={300}
                        className="w-full h-auto object-contain max-w-4xl mx-auto"
                      />
                    </div>
                  ) : (
                    <>
                      {/* Title */}
                      {section.text !== 'SPECIAL_SECTION_3' && (
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                          <span className="text-[#24b228]">{section.title}</span>
                        </h2>
                      )}

                      {/* Text */}
                      {section.text === 'SPECIAL_SECTION_2' ? (
                    <div className="mb-6">
                      {/* Tópico 2 Image */}
                      <div className="mb-8">
                        <Image
                          src="/Tópico 2.png"
                          alt="Tópico 2"
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain max-w-6xl mx-auto"
                        />
                      </div>
                      
                      {/* Tópico 3 Image */}
                      <div className="mb-8">
                        <Image
                          src="/topico3.png"
                          alt="Tópico 3"
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain max-w-6xl mx-auto"
                        />
                      </div>
                    </div>
                  ) : section.text === 'SPECIAL_SECTION_4' ? (
                    <div className="text-lg text-gray-300 mb-6 leading-relaxed max-w-4xl mx-auto">
                      <p className="text-center mb-8">
                        Enquanto você está se esforçando em um emprego convencional ou batendo cabeça para ter lucro com um ecommerce no brasil, você poderia estar ganhando 5, 6 ou até em 7 vezes mais,
                      </p>
                      <p className="text-center mb-8">
                        Dito isso, é muito mais fácil visitar países europeus e até mesmo países árabes ganhando em euro, assim como eu fiz
                      </p>
                      
                      {/* Gallery */}
                      <div className="gallery-wrapper">
                        <style jsx>{`
                          .gallery-wrapper {
                            max-width: 100%;
                            margin: 0;
                            padding: 0;
                            background: transparent;
                          }

                          .gallery-container {
                            width: 100%;
                            overflow: hidden;
                            position: relative;
                          }

                          .gallery-track {
                            display: flex;
                            will-change: transform;
                            animation: scroll 20s linear infinite;
                          }

                          .gallery-item {
                            width: 270px;
                            height: 480px;
                            flex-shrink: 0;
                            padding: 0;
                            margin-right: 12px;
                          }

                          .gallery-item img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 10px;
                            display: block;
                          }

                          @keyframes scroll {
                            0% {
                              transform: translateX(0);
                            }
                            100% {
                              transform: translateX(calc(-270px * 10));
                            }
                          }

                          @media (max-width: 768px) {
                            .gallery-item {
                              width: 180px;
                              height: 320px;
                            }
                            
                            .gallery-track {
                              animation: scroll-mobile 20s linear infinite;
                            }
                            
                            @keyframes scroll-mobile {
                              0% {
                                transform: translateX(0);
                              }
                              100% {
                                transform: translateX(calc(-180px * 10));
                              }
                            }
                          }
                        `}</style>
                        
                        <div className="gallery-container">
                          <div className="gallery-track">
                            {/* Imagens originais */}
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/1_858f830e-fbd1-4783-8268-0edf72a7ae74.png?v=1745991956" alt="Cliente 1" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/4_cb61cee8-1a96-4d78-a245-4237d11144c4.png?v=1745991956" alt="Cliente 2" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/6_523639f8-660c-468b-a810-a62969cc17af.png?v=1745991956" alt="Cliente 3" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/5_e466ef0c-fb21-4169-9d29-be1a0ef738de.png?v=1745991956" alt="Cliente 4" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/2_7c4d1b7b-444f-486c-af82-3910d085f0ef.png?v=1745991956" alt="Cliente 5" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/3_56b8ab06-4441-4ddb-96dd-266adba125e0.png?v=1745991956" alt="Cliente 6" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/10_0c4d5232-c8ed-4f00-b573-833250d617f2.png?v=1745991955" alt="Cliente 7" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/7_1bbd9376-a628-4b0d-a411-77965c396c53.png?v=1745991955" alt="Cliente 8" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/8_2ca3ac0d-47b8-4493-bf8d-b8fdef4ef259.png?v=1745991956" alt="Cliente 9" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/9_4f4fc849-c4e3-4303-9d53-52ead1929874.png?v=1745991955" alt="Cliente 10" />
                            </div>
                            
                            {/* Loop duplicado para rolagem contínua */}
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/1_858f830e-fbd1-4783-8268-0edf72a7ae74.png?v=1745991956" alt="Cliente 1 duplicado" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/4_cb61cee8-1a96-4d78-a245-4237d11144c4.png?v=1745991956" alt="Cliente 2 duplicado" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/6_523639f8-660c-468b-a810-a62969cc17af.png?v=1745991956" alt="Cliente 3 duplicado" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/5_e466ef0c-fb21-4169-9d29-be1a0ef738de.png?v=1745991956" alt="Cliente 4 duplicado" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : section.text === 'SPECIAL_SECTION_3' ? (
                    <div className="max-w-6xl mx-auto">
                      {/* Mask Group Image - Hidden on mobile */}
                      <div className="hidden md:block mb-8">
                        <img 
                          src="https://luizgrossi.com.br/wp-content/uploads/2025/01/mask_group.webp" 
                          alt="Decorative mask" 
                          className="w-full h-auto"
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Left Column - Content */}
                        <div className="space-y-6">
                          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            Se você se encaixa em um<br />
                            desses perfis, então a Consultoria Nutra Global é pra você!
                          </h2>
                          
                          <div className="space-y-4">
                            {[
                              'Tá na faculdade ou na CLT e quer usar o poder da internet pra mudar de vida',
                              'Já trabalha com tráfego direto (info ou nutra), mas ainda não tem resultados expressivos',
                              'Tem empresa física e quer abrir uma nova frente no digital visando mais liberdade, simplicidade e margem de lucro',
                              'Mora fora do Brasil e quer ganhar no mínimo 10 mil dólares por mês sem sair de casa e sem trabalhar em subempregos',
                              'Já tem uma empresa de nutra lucrativa, mas quer escalar pro próximo nível'
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#BBEA12] flex items-center justify-center">
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M10.61 12.25L8.63 9.59L8.42 9.27L5.59 5.25H7.18L9.03 7.95L9.2 8.23L12.2 12.25H10.61ZM5 12.25L8.42 8.47L9.19 9.79L6.87 12.25H5ZM9.27 8.25L8.5 7.47L10.37 5.25H11.86L9.27 8.25Z" fill="#111A44"/>
                                  </svg>
                                </div>
                                <span className="text-gray-300">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Right Column - Background Image */}
                        <div className="flex justify-center">
                          <img 
                            src="https://luizgrossi.com.br/wp-content/uploads/2025/01/background_1-2.webp" 
                            alt="Background illustration" 
                            className="w-full max-w-md h-auto"
                          />
                        </div>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="mt-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                          Agora se o seu caso não é nenhum desses, então infelizmente eu ainda não consigo te ajudar…
                        </h2>
                      </div>
                    </div>
                  ) : section.text === 'SPECIAL_SECTION_5' ? (
                    <div className="max-w-6xl mx-auto">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-6">
                          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            "Tudo isso parece muito bom, mas você me vai vender alguma coisa?"
                          </h2>
                          
                          <img 
                            src="https://luizgrossi.com.br/wp-content/uploads/2025/01/frame_52.webp" 
                            alt="Decorative frame" 
                            className="w-full h-auto"
                          />
                          
                          <div className="text-gray-300 space-y-4 text-sm md:text-base leading-relaxed">
                            <p>
                              Hoje eu possuo programas de aceleração de resultados para afiliados e produtores de nutra global, mas não quero e nem vou te vender nada se eu achar que não faz sentido!
                            </p>
                            <p>
                              Seria totalmente antiético da minha parte te vender alguma coisa sem nem te conhecer, sem saber do seu momento atual e sem entender o que você realmente está buscando.
                            </p>
                            <p>
                              E é por isso que a Consultoria Nutra Global é 100% gratuita!
                              Ela serve justamente para filtrar as pessoas que estão comprometidas e que eu sei que consigo verdadeiramente ajudar a "imprimir dinheiro" nesse mercado que mudou minha vida.
                            </p>
                            <p>
                              Dito isso, a consultoria é gratuita... Entretanto, se você for selecionado e, ao final da nossa reunião, eu achar que faz sentido, vou traçar um plano de ação completo para você, onde vou te acompanhar de perto durante 12 meses.
                            </p>
                          </div>
                        </div>
                        
                        {/* Right Column - Main Image */}
                        <div className="flex justify-center">
                          <img 
                            src="https://luizgrossi.com.br/wp-content/uploads/2025/01/group_17.webp" 
                            alt="Group illustration" 
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-lg text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                      {section.text.split('\n\n').map((paragraph, i) => (
                        <p key={i} className={`${i > 0 ? 'mt-4' : ''} ${paragraph.includes('✅') || paragraph.includes('•') ? 'text-left' : 'text-center'}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Button */}
                  <div className="mb-2">
                    <button className="bg-gradient-to-r from-[#1e9b23] via-[#24b228] to-[#2bc22f] hover:from-[#1a8220] hover:via-[#1e9b23] hover:to-[#24b228] text-white font-bold py-4 px-12 rounded-xl text-lg border-2 border-[#24b228] transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#24b228]/50 hover:shadow-[#24b228]/75 drop-shadow-[0_0_10px_#24b228] hover:drop-shadow-[0_0_20px_#24b228]">
                      {section.buttonText}
                    </button>
                  </div>

                  {/* Mini Text */}
                  <p className="text-xs text-gray-500">
                    {section.miniText}
                  </p>
                    </>
                  )}
                </div>
              ) : (
                <>
                   {/* Title */}
                   {section.text !== 'SPECIAL_SECTION_3' && (
                     <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                       <span className="text-[#24b228]">{section.title}</span>
                     </h2>
                   )}

                  
                        
                        {/* Right Column - Positive Messages */}
                        <div className="space-y-6">
                          <h3 className={`text-2xl font-bold ${section.id === 2 || section.id === 5 ? "text-black" : "text-white"} leading-tight`}>
                            Você só precisa de ter as<br />
                            <span className="text-[#24b228]">informações corretas</span> e direcionamento para colocá-las em prática!
                          </h3>
                          <h3 className="text-xl font-bold text-[#24b228]">
                            Se é isso que você está buscando, então você precisa da Consultoria Nutra Global!
                          </h3>
                          <
                        </div>
                      </div>
                    </div>
                  ) : section.text === 'SPECIAL_SECTION_4' ? (
                    <div className="text-lg text-gray-300 mb-6 leading-relaxed max-w-4xl mx-auto">
                      <p className="text-center mb-8">
                        Enquanto você está se esforçando em um emprego convencional ou batendo cabeça para ter lucro com um ecommerce no brasil, você poderia estar ganhando 5, 6 ou até em 7 vezes mais,
                      </p>
                      <p className="text-center mb-8">
                        Dito isso, é muito mais fácil visitar países europeus e até mesmo países árabes ganhando em euro, assim como eu fiz
                      </p>
                      
                      {/* Gallery */}
                      <div className="gallery-wrapper">
                        <style jsx>{`
                          .gallery-wrapper {
                            max-width: 100%;
                            margin: 0;
                            padding: 0;
                            background: transparent;
                          }

                          .gallery-container {
                            width: 100%;
                            overflow: hidden;
                            position: relative;
                          }

                          .gallery-track {
                            display: flex;
                            will-change: transform;
                            animation: scroll 20s linear infinite;
                          }

                          .gallery-item {
                            width: 270px;
                            height: 480px;
                            flex-shrink: 0;
                            padding: 0;
                            margin-right: 12px;
                          }

                          .gallery-item img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 10px;
                            display: block;
                          }

                          @keyframes scroll {
                            0% {
                              transform: translateX(0);
                            }
                            100% {
                              transform: translateX(calc(-270px * 10));
                            }
                          }

                          @media (max-width: 768px) {
                            .gallery-item {
                              width: 180px;
                              height: 320px;
                            }
                            
                            .gallery-track {
                              animation: scroll-mobile 20s linear infinite;
                            }
                            
                            @keyframes scroll-mobile {
                              0% {
                                transform: translateX(0);
                              }
                              100% {
                                transform: translateX(calc(-180px * 10));
                              }
                            }
                          }
                        `}</style>
                        
                        <div className="gallery-container">
                          <div className="gallery-track">
                            {/* Imagens originais */}
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/1_858f830e-fbd1-4783-8268-0edf72a7ae74.png?v=1745991956" alt="Cliente 1" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/4_cb61cee8-1a96-4d78-a245-4237d11144c4.png?v=1745991956" alt="Cliente 2" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/6_523639f8-660c-468b-a810-a62969cc17af.png?v=1745991956" alt="Cliente 3" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/5_e466ef0c-fb21-4169-9d29-be1a0ef738de.png?v=1745991956" alt="Cliente 4" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/2_7c4d1b7b-444f-486c-af82-3910d085f0ef.png?v=1745991956" alt="Cliente 5" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/3_56b8ab06-4441-4ddb-96dd-266adba125e0.png?v=1745991956" alt="Cliente 6" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/10_0c4d5232-c8ed-4f00-b573-833250d617f2.png?v=1745991955" alt="Cliente 7" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/7_1bbd9376-a628-4b0d-a411-77965c396c53.png?v=1745991955" alt="Cliente 8" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/8_2ca3ac0d-47b8-4493-bf8d-b8fdef4ef259.png?v=1745991956" alt="Cliente 9" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/9_4f4fc849-c4e3-4303-9d53-52ead1929874.png?v=1745991955" alt="Cliente 10" />
                            </div>
                            
                            {/* Loop duplicado para rolagem contínua */}
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/1_858f830e-fbd1-4783-8268-0edf72a7ae74.png?v=1745991956" alt="Cliente 1 duplicado" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/4_cb61cee8-1a96-4d78-a245-4237d11144c4.png?v=1745991956" alt="Cliente 2 duplicado" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/6_523639f8-660c-468b-a810-a62969cc17af.png?v=1745991956" alt="Cliente 3 duplicado" />
                            </div>
                            <div className="gallery-item">
                              <img src="https://cdn.shopify.com/s/files/1/0630/4838/4718/files/5_e466ef0c-fb21-4169-9d29-be1a0ef738de.png?v=1745991956" alt="Cliente 4 duplicado" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : section.text === 'SPECIAL_SECTION_3' ? (
                    <div className="max-w-6xl mx-auto">
                      {/* Mask Group Image - Hidden on mobile */}
                      <div className="hidden md:block mb-8">
                        <img 
                          src="https://luizgrossi.com.br/wp-content/uploads/2025/01/mask_group.webp" 
                          alt="Decorative mask" 
                          className="w-full h-auto"
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Left Column - Content */}
                        <div className="space-y-6">
                          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            Se você se encaixa em um<br />
                            desses perfis, então a Consultoria Nutra Global é pra você!
                          </h2>
                          
                          <div className="space-y-4">
                            {[
                              'Tá na faculdade ou na CLT e quer usar o poder da internet pra mudar de vida',
                              'Já trabalha com tráfego direto (info ou nutra), mas ainda não tem resultados expressivos',
                              'Tem empresa física e quer abrir uma nova frente no digital visando mais liberdade, simplicidade e margem de lucro',
                              'Mora fora do Brasil e quer ganhar no mínimo 10 mil dólares por mês sem sair de casa e sem trabalhar em subempregos',
                              'Já tem uma empresa de nutra lucrativa, mas quer escalar pro próximo nível'
                            ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#BBEA12] flex items-center justify-center">
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M10.61 12.25L8.63 9.59L8.42 9.27L5.59 5.25H7.18L9.03 7.95L9.2 8.23L12.2 12.25H10.61ZM5 12.25L8.42 8.47L9.19 9.79L6.87 12.25H5ZM9.27 8.25L8.5 7.47L10.37 5.25H11.86L9.27 8.25Z" fill="#111A44"/>
                                  </svg>
                                </div>
                                <span className="text-gray-300">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Right Column - Background Image */}
                        <div className="flex justify-center">
                          <img 
                            src="https://luizgrossi.com.br/wp-content/uploads/2025/01/background_1-2.webp" 
                            alt="Background illustration" 
                            className="w-full max-w-md h-auto"
                          />
                        </div>
                      </div>
                      
                      {/* Bottom Section */}
                      <div className="mt-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                          Agora se o seu caso não é nenhum desses, então infelizmente eu ainda não consigo te ajudar…
                        </h2>
                      </div>
                    </div>
                  ) : section.text === 'SPECIAL_SECTION_5' ? (
                    <div className="max-w-6xl mx-auto">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-6">
                          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            "Tudo isso parece muito bom, mas você me vai vender alguma coisa?"
                          </h2>
                          
                          <img 
                            src="https://luizgrossi.com.br/wp-content/uploads/2025/01/frame_52.webp" 
                            alt="Decorative frame" 
                            className="w-full h-auto"
                          />
                          
                          <div className="text-gray-300 space-y-4 text-sm md:text-base leading-relaxed">
                            <p>
                              Hoje eu possuo programas de aceleração de resultados para afiliados e produtores de nutra global, mas não quero e nem vou te vender nada se eu achar que não faz sentido!
                            </p>
                            <p>
                              Seria totalmente antiético da minha parte te vender alguma coisa sem nem te conhecer, sem saber do seu momento atual e sem entender o que você realmente está buscando.
                            </p>
                            <p>
                              E é por isso que a Consultoria Nutra Global é 100% gratuita!
                              Ela serve justamente para filtrar as pessoas que estão comprometidas e que eu sei que consigo verdadeiramente ajudar a "imprimir dinheiro" nesse mercado que mudou minha vida.
                            </p>
                            <p>
                              Dito isso, a consultoria é gratuita... Entretanto, se você for selecionado e, ao final da nossa reunião, eu achar que faz sentido, vou traçar um plano de ação completo para você, onde vou te acompanhar de perto durante 12 meses.
                            </p>
                          </div>
                        </div>
                        
                        {/* Right Column - Main Image */}
                        <div className="flex justify-center">
                          <img 
                            src="https://luizgrossi.com.br/wp-content/uploads/2025/01/group_17.webp" 
                            alt="Group illustration" 
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-lg text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                      {section.text.split('\n\n').map((paragraph, i) => (
                        <p key={i} className={`${i > 0 ? 'mt-4' : ''} ${paragraph.includes('✅') || paragraph.includes('•') ? 'text-left' : 'text-center'}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Button */}
                  <div className="mb-2">
                    <button className="bg-gradient-to-r from-[#1e9b23] via-[#24b228] to-[#2bc22f] hover:from-[#1a8220] hover:via-[#1e9b23] hover:to-[#24b228] text-white font-bold py-4 px-12 rounded-xl text-lg border-2 border-[#24b228] transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-[#24b228]/50 hover:shadow-[#24b228]/75 drop-shadow-[0_0_10px_#24b228] hover:drop-shadow-[0_0_20px_#24b228]">
                      {section.buttonText}
                    </button>
                  </div>

                  {/* Mini Text */}
                  <p className="text-xs text-gray-500">
                    {section.miniText}
                  </p>
                </>
              )}
            </div>
          </section>
          )
        })}
      </main>

      {/* WiFi Money Logo Divider */}
      <div className="w-full bg-black py-4 overflow-hidden border-b border-gray-300">
        <style jsx>{`
          .logo-slider {
            display: flex;
            animation: slide 15s linear infinite;
            width: calc(200% + 200px);
          }
          
          .logo-item {
            width: 200px;
            height: 80px;
            flex-shrink: 0;
            margin-right: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .logo-item img {
            width: auto;
            height: 60px;
            object-fit: contain;
          }
          
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @media (max-width: 768px) {
            .logo-item {
              width: 150px;
              height: 60px;
              margin-right: 30px;
            }
            
            .logo-item img {
              height: 45px;
            }
          }
        `}</style>
        
        <div className="logo-slider">
          {/* First set of logos */}
          {Array.from({ length: 12 }, (_, i) => (
            <div key={`logo-1-${i}`} className="logo-item">
              <img 
                src="/wifi-money-logo.png" 
                alt="WiFi Money Global" 
              />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {Array.from({ length: 12 }, (_, i) => (
            <div key={`logo-2-${i}`} className="logo-item">
              <img 
                src="/wifi-money-logo.png" 
                alt="WiFi Money Global" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#24b228] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#24b228] opacity-5 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}
