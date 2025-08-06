'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

// Declare fbq and ttq for TypeScript
declare global {
  interface Window {
    fbq: (command: string, eventType: string, parameters?: Record<string, unknown>) => void;
    ttq: {
      track: (eventName: string, parameters?: Record<string, unknown>) => void;
      page: () => void;
      load: (pixelId: string) => void;
    };
  }
}

// Enhanced tracking function - eventos Meta Pixel adicionados
const trackCTAClick = (ctaNumber: number, sectionId: number, ctaType: string, buttonText: string) => {
  // Only run on client side after hydration
  if (typeof window !== 'undefined') {
    // Use setTimeout to ensure this runs after hydration
    setTimeout(() => {
      // Get stored UTM parameters
      let utmParams = {};
      try {
        const storedParams = sessionStorage.getItem('utmParams');
        if (storedParams) {
          utmParams = JSON.parse(storedParams);
        }
      } catch (error) {
        console.error('Erro ao recuperar parâmetros UTM:', error);
      }

      const baseEventData = {
        cta_number: ctaNumber,
        button_name: buttonText,
        section_id: sectionId,
        cta_type: ctaType,
        section_name: `Seção ${sectionId}`,
        timestamp: Date.now(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        ...utmParams
      };

      // Meta Pixel tracking
      if (window.fbq) {
        // Custom LPInitiate_Quiz event
        const initiateQuizData = {
          content_name: `CTA_${ctaNumber}`,
          content_category: `Seção ${sectionId}`,
          value: ctaNumber,
          currency: 'BRL',
          ...baseEventData
        };

        window.fbq('trackCustom', 'Att-LPInitiate_Quiz', initiateQuizData);
        
        // Custom LPCta-click event with specific number and suffix
        const ctaEventName = `Att-LPCtaClick-${ctaNumber}`;
        window.fbq('trackCustom', ctaEventName, baseEventData);

        console.log(`📊 Meta Pixel: ${ctaEventName} e LPInitiate_Quiz - "${buttonText}" clicado na seção ${sectionId}`);
      }

      // TikTok Pixel tracking
      if (window.ttq) {
        // Custom LPInitiate_Quiz event for TikTok
        const tiktokInitiateData = {
          content_name: `CTA_${ctaNumber}`,
          content_category: `Seção ${sectionId}`,
          value: ctaNumber,
          currency: 'BRL',
          ...baseEventData
        };

        window.ttq.track('Att-LPInitiate_Quiz', tiktokInitiateData);
        
        // Custom LPCta-click event for TikTok
        const tiktokCtaEventName = `Att-LPCtaClick-${ctaNumber}`;
        window.ttq.track(tiktokCtaEventName, baseEventData);

        console.log(`📊 TikTok Pixel: ${tiktokCtaEventName} e Att-LPInitiate_Quiz - "${buttonText}" clicado na seção ${sectionId}`);
      }
    }, 0);
  }
}

// Function to build quiz URL with UTM parameters
const buildQuizURL = (source: string = 'landing-page') => {
  const baseURL = 'https://quiz.felipiska.com/';
  
  if (typeof window === 'undefined') {
    return baseURL;
  }

  try {
    const storedParams = sessionStorage.getItem('utmParams');
    if (!storedParams) {
      // Se não há UTMs armazenados, adicionar UTMs básicos para rastreamento interno
      const fallbackURL = `${baseURL}?utm_source=${source}&utm_medium=cta&utm_campaign=piscapage&page=CopyKevin`;
      console.log('🔗 Quiz URL (sem UTMs originais):', fallbackURL);
      return fallbackURL;
    }

    const utmParams = JSON.parse(storedParams);
    const urlParams = new URLSearchParams();

    // Adicionar UTMs originais se existirem
    if (utmParams.utm_source) urlParams.append('utm_source', utmParams.utm_source);
    if (utmParams.utm_medium) urlParams.append('utm_medium', utmParams.utm_medium);
    if (utmParams.utm_campaign) urlParams.append('utm_campaign', utmParams.utm_campaign);
    if (utmParams.utm_term) urlParams.append('utm_term', utmParams.utm_term);
    if (utmParams.utm_content) urlParams.append('utm_content', utmParams.utm_content);
    
    // Adicionar identificadores de cliques do Facebook e Google se existirem
    if (utmParams.fbclid) urlParams.append('fbclid', utmParams.fbclid);
    if (utmParams.gclid) urlParams.append('gclid', utmParams.gclid);

    // Se não temos UTMs originais, adicionar UTMs padrão para rastreamento
    if (!utmParams.utm_source && !utmParams.utm_medium && !utmParams.utm_campaign) {
      urlParams.append('utm_source', source);
      urlParams.append('utm_medium', 'cta');
      urlParams.append('utm_campaign', 'piscapage');
    }

    // Sempre adicionar o parâmetro personalizado page=CopyKevin
    urlParams.append('page', 'CopyKevin');

    const queryString = urlParams.toString();
    const finalURL = queryString ? `${baseURL}?${queryString}` : `${baseURL}?page=CopyKevin`;
    
    console.log(`🔗 Quiz URL construída (${source}):`, finalURL);
    console.log('📊 Parâmetros UTM passados adiante:', Object.fromEntries(urlParams));
    
    return finalURL;
  } catch (error) {
    console.error('Erro ao construir URL do quiz:', error);
    const fallbackURL = `${baseURL}?utm_source=${source}&utm_medium=cta&utm_campaign=piscapage&page=CopyKevin`;
    console.log('🔗 Quiz URL (fallback):', fallbackURL);
    return fallbackURL;
  }
}

const sectionsData = [
  {
    id: 1,
    title: 'TEXTO_IMAGE_HERO',
    image: '/next.svg',
    buttonText: 'QUERO APLICAR PARA A VAGA',
  },
  {
    id: 2,
    title: 'Essa é a única onda que você precisa surfar pra mudar de vida em 2025…',
    image: '/vercel.svg',
    text: 'SPECIAL_SECTION_2',
    buttonText: 'Quero aplicar para a consultoria gratuita',
    miniText: 'Consultoria Nutra Global - O caminho certo para seu sucesso'
  },
  {
    id: 2.5,
    title: 'Esse é o mar azul com o maior potencial de mudar a sua vida',
    image: '/mitigacao.svg',
    text: 'MITIGACAO_OBJECOES',
    buttonText: 'Quero aplicar para a vaga',
    miniText: 'Sem barreiras para o seu sucesso'
  },
  {
    id: 3,
    title: 'O WI-FI MONEY É PRA VOCÊ!',
    image: '/file.svg',
    text: 'SPECIAL_SECTION_3',
    buttonText: 'Quero aplicar para a vaga',
    miniText: 'Vagas limitadas'
  },
  {
    id: 4,
    title: 'Porque o mercado de produto físico global vai formar o maior número de novos milionários já visto?',
    image: '/star.svg',
    text: 'SPECIAL_SECTION_4',
    buttonText: 'Quero aplicar para a vaga',
    miniText: 'Mercado trilionário esperando por você'
  },
  {
    id: 5,
    title: 'FOTO_FINAL',
    image: '/globe.svg',
    text: 'FOTO_FINAL',
    buttonText: 'Quero aplicar para a vaga',
    miniText: 'Última seção'
  }
]

export default function Home() {
  // Hydration state
  const [isClient, setIsClient] = useState(false)
  
  // Calculator state
  const [euroValue, setEuroValue] = useState(50000)
  const [realValue, setRealValue] = useState(325000)
  const [selectedOrders, setSelectedOrders] = useState(17)
  const exchangeRate = 6.50
  
  // Quiz URLs with UTM tracking
  const [quizURLs, setQuizURLs] = useState({
    banner1: 'https://quiz.felipiska.com/',
    images: 'https://quiz.felipiska.com/',
    continue: 'https://quiz.felipiska.com/',
    joinMentoria: 'https://quiz.felipiska.com/'
  })

  // Ensure hydration and build quiz URLs
  useEffect(() => {
    setIsClient(true)
    
    // Build quiz URLs with UTM parameters after hydration
    setQuizURLs({
      banner1: buildQuizURL('banner1'),
      images: buildQuizURL('images'),
      continue: buildQuizURL('continue'),
      joinMentoria: buildQuizURL('join-mentoria')
    })
  }, [])

  // Handle Euro input change
  const handleEuroChange = (value: number) => {
    setEuroValue(value)
    setRealValue(value * exchangeRate)
  }

  // Handle Real input change
  const handleRealChange = (value: number) => {
    setRealValue(value)
    setEuroValue(value / exchangeRate)
  }

  // Handle quick amount buttons (now for daily orders)
  const handleQuickAmount = (dailyOrders: number) => {
    const ticketMedio = 100 // €100 ticket médio
    const diasPorMes = 30
    const eurosPorMes = dailyOrders * ticketMedio * diasPorMes
    
    setEuroValue(eurosPorMes)
    setRealValue(eurosPorMes * exchangeRate)
    setSelectedOrders(dailyOrders)
  }

  // Define background and text colors for each section
  const getSectionClasses = (sectionId: number) => {
    switch(sectionId) {
      case 1: return { bg: 'bg-white', text: 'text-white' } // Hero - branco
      case 2: return { bg: 'bg-gradient-to-b from-[#151515] via-[#151515] to-[#0e0e0e]', text: 'text-white' } // Lista "Você não precisa" - branco
      case 2.5: return { bg: 'bg-[#0e0e0e]', text: 'text-white' } // Mitigação de objeções - preto
      case 3: return { bg: 'bg-[#0e0e0e]', text: 'text-white' } // Wi-Fi Money - preto
      case 4: return { bg: 'bg-[#0e0e0e]', text: 'text-white' } // Mercado Global - claro
      case 5: return { bg: 'bg-white', text: 'text-white' } // Foto Final - branco
      default: return { bg: 'bg-[#0e0e0e]', text: 'text-white' }
    }
  }

  return (
    <div className="min-h-screen">
      {/* All Sections */}
      <main className="w-full bg-[#0B0F0D]">
        {sectionsData.map((section, index) => {
          const sectionClasses = getSectionClasses(section.id)
          return (
            <div key={section.id}>
              <section className={`${sectionClasses.bg} ${sectionClasses.text} ${index !== sectionsData.length - 1}`}>
                <div className={section.id === 1 || section.id === 5 ? "w-full" : "max-w-4sxl mx-auto text-center"}>

                {/* Banner Image - Only on first section at top */}
                {section.id === 1 ? (
                  <Image
                    src="/banner1.png"
                    alt="Banner Principal LP Piska"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                  />
                ) : section.id === 2 ? (
                  <div className="space-y-8">
                    <div className="text-[#21f74f] text-shadow-green-300 text-center text-[18px] font-bold mx-4">
                      <p>Enquanto o Brasil afoga seus empreendedores,
                      empresários globais estão lucrando em euro, libra e dólar com operações simples e validadas.</p>
                      <span className="text-[#ffffff] font-normal text-[10px] mt-4 line-clamp-3">Consultoria estratégica gratuita para empreendedores que querem vender em euro, libra ou dólar com uma estrutura enxuta, validada e escalável — <span className="text-[#21f74f] font-semibold">Ainda em 2025</span></span>
                    </div>
                    
                  {/* Button */}
                                      <div className="mb-5"> {/* Aumenta o espaçamento abaixo do primeiro botão */}
                        <a 
                          href={quizURLs.banner1} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block bg-gradient-to-r rounded-lg shadow-lg shadow-[#0fff1ba2] from-[#03af0c] via-[#0fe219] to-[#0fc718] text-white text-bold px-4 py-4 text-[18px] transition-colors cursor-pointer"
                          onClick={() => trackCTAClick(1, section.id, 'Banner', section.buttonText)}
                        >
                          {section.buttonText}
                        </a>
                      <p className="text-gray-200 text-[12px] text-sm mt-4 mx-4 text-center">
                        Selecionaremos apenas 8 empreendedores no mês de agosto
                      </p>
                    </div>
                  </div>

                ) : section.id === 2.5 ? (
                   <div className="max-w-4xl p-4 bg-white rounded-2xl">
                     {/* Main Title */}
                     <h2 className="text-3xl md:text-4xl mt-5 font-bold text-center mb-8 text-[#141414] font-roboto text-balance">
                       Esse é o mar azul com o maior potencial de mudar a sua vida
                     </h2>

                     {/* Mitigação de objeções para empreendedores */}
                     <div className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
                       {[
                         'Quer vender em moeda forte sem depender de sócios ou equipe',
                         'Tem visão empreendedora, mas ainda não atua no mercado internacional',
                         'Quer operar de forma enxuta, com loja, checkout e produto validados',
                         'Procura um modelo que não exige fluência em idiomas ou estrutura robusta',
                         'Já tem outro negócio, mas busca uma segunda fonte de lucro escalável'
                       ].map((item, i) => (
                         <div key={i} className="flex items-start gap-3 rounded-lg border border-[#bebebe]/50 p-3">
                           <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3fb31c] flex items-center justify-center my-3">
                             <span className="text-[#ffffff] text-sm font-bold">→</span>
                           </div>
                           <span className="text-[#0f0f0f] text-lg">{item}</span>
                         </div>
                       ))}
                     </div>

                     {/* Button */}
                     <div className="text-center mt-8 mb-12">
                       <a 
                         href={quizURLs.banner1} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-block bg-gradient-to-r rounded-lg shadow-lg shadow-[#0fff1ba2] from-[#03af0c] via-[#0fe219] to-[#0fc718] text-white text-bold px-6 py-4 text-[18px] transition-colors cursor-pointer"
                         onClick={() => trackCTAClick(2.5, section.id, 'Mitigacao', 'Quero aplicar para a consultoria gratuita')}
                       >
                         Quero aplicar para a consultoria gratuita
                       </a>
                       <p className="text-[#0f0f0f] text-sm mt-6 text-center">
                         Selecionaremos apenas 8 empreendedores no mês de agosto
                       </p>
                     </div>
                   </div>
                ) : section.id === 3 ? (
                   <div className="max-w-4xl mx-8 mt-10">
                     {/* Subtitle */}
                     <p className="text-white text-center mb-4">
                       Se você se identifica com um desses perfis,
                     </p>

                     <div className="flex items-center justify-center pt-4" style={{ borderTop: '1px solid #213129' }}>
                         </div>
                     
                     {/* Main Title */}
                     <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
                       O modelo <span className="text-[#0fe219] text-shadow-green-300">Wi-Fi Money Global</span><br />
                       foi feito pra você escalar — <span className="text-[#0fe219] text-shadow-green-300">rápido e com margem real:</span>
                     </h2>

                     {/* Profile List */}
                     <div className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
                       {[
                         'Você já empreende, mas ainda depende do mercado brasileiro',
                         'Já tentou vender fora, mas não conseguiu tracionar com consistência',
                         'Está cansado da margem baixa, instabilidade e complexidade do Brasil',
                         'Busca uma estrutura enxuta para vender em euro, libra ou dólar com lucros reais',
                         'Tem capital e urgência, mas falta um modelo claro e validado para escalar'
                       ].map((item, i) => (
                         <div key={i} className="flex items-start gap-3 rounded-[22] bg-[#0B0F0D] border-1 border-[#bebebe]/50 p-2">
                           <div key={i} className="flex items-start gap-3 my-3">
                           <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00ff41] flex items-center justify-center mt-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10 3L4.5 8.5L2 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                           </div>  
                           <span className="text-white text-lg">{item}</span>
                         </div>
                       ))}
                     </div>

                     {/* Button above images */}
                     <div className="text-center mt-8 mb-1">
                       <a 
                         href={quizURLs.banner1} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-block bg-gradient-to-r rounded-lg shadow-lg shadow-[#0fff1ba2] from-[#03af0c] via-[#0fe219] to-[#0fc718] text-white text-bold px-4 py-4 text-[18px] transition-colors cursor-pointer"
                         onClick={() => trackCTAClick(3, section.id, 'Profile', 'Quero o plano prático para estruturar minha operação global')}
                       >
                         Quero o plano prático para estruturar minha operação global
                       </a>
                       <p className="text-[#e4e4e4] text-sm mt-8 text-center">
                         Selecionaremos apenas 8 empreendedores no mês de agosto
                       </p>
                     </div>

                    {/* Images */}
                    <div className="grid grid-cols-3 gap-2 max-w-md mt-3  mb-10">
                      <div className="rounded-lg overflow-hidden">
                        <Image
                          src="/image3.jpg"
                          alt="Foto 1"
                          width={200}
                          height={400}
                          className="w-full h-90 object-cover"
                        />
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <Image
                          src="/image4.jpg"
                          alt="Foto 2"
                          width={200}
                          height={400}
                          className="w-full h-100 object-cover"
                        />
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <Image
                          src="/image2 (1).jpg"
                          alt="Foto 2"
                          width={200}
                          height={400}
                          className="w-full h-90 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ) : section.id === 4 ? (
                  <div className="max-w-4xl mx-auto py-8 px-3 bg-white rounded-2xl shadow-lg border border-gray-200">
                    {/* Main Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-black text-center mt-4 mx-1">
                    O MERCADO GLOBAL DE PRODUTOS FÍSICOS ESTÁ ESCALANDO UMA NOVA GERAÇÃO DE EMPREENDEDORES QUE FATURAM EM MOEDA FORTE
                      <span className="text-[#0b9612] ml-2">
                       COM MARGEM REAL, TICKET ALTO E OPERAÇÃO ENXUTA.</span>
                    </h3>
                    <div className="flex items-center justify-center mt-5 pt-4" style={{ borderTop: '1px solid #2d302e' }}>
                    </div>
                    {/* Benefits List - AGORA PRIMEIRO */}
                    <div className="space-y-6 mt-10 mb-16">
                      {[
                        {
                          number: "01",
                          title: "Um mercado trilionário com espaço pra quem SABE O QUE FAZ!",
                          content: "O e-commerce global movimentou mais de US$2,1 trilhões em 2024 — e cresce de forma pulverizada em centenas de micro nichos com baixa concorrência.\n\nVocê não precisa dominar o mundo. Precisa dominar um pedaço certo dele."
                        },
                        {
                          number: "02", 
                          title: "Lá fora, o jogo é mais simples e mais lucrativo",
                          content: "Vender para o Brasil exige copy refinada, funis complexos e audiência educada. Já no exterior, com menos concorrência e mais espaço, é possível vender com estrutura simples e anúncios diretos.\n\nResultado: mais retorno, com menos trabalho."
                        },
                        {
                          number: "03",
                          title: "O cliente lá fora tem mais grana e compra com menos dor", 
                          content: "Enquanto no Brasil boa parte do público desiste da compra por R$150, consumidores na Europa e nos EUA pagam 50 a 150 euros com facilidade, desde que enxerguem valor.\n\nÉ outra realidade de consumo."
                        },
                        {
                          number: "04",
                          title: "Ticket alto com margem real",
                          content: "Enquanto no Brasil o ticket médio trava em R$50 a R$150 com margens apertadas, no mercado internacional é comum vender produtos entre 50€ e 150€, com margens líquidas que variam de 30% a 40%.\n\nO mesmo esforço, operado em moeda forte, gera um resultado 3 a 5 vezes maior."
                        },
                        {
                          number: "05", 
                          title: "Anúncio mais barato, escala mais fácil",
                          content: "Operando em múltiplos países, encontramos CPMs e CPAs mais baixos que no Brasil — e conseguimos escalar campanhas com ROIs de 5x a 6x, mesmo com investimentos baixos.\n\nO segredo? Arbitragem de atenção + entrega internacional validada."
                        },
                        {
                          number: "06",
                          title: "Ganhar em moeda forte muda tudo",
                          content: "Quando você fatura em euro, libra ou dólar, cada venda vale 5x, 6x, até 7x mais do que no Brasil.\n\nCom a estrutura certa, é possível transformar uma operação enxuta em uma fonte de renda robusta, previsível e escalável."
                        }
                      ].map((item, i) => (
                        <div key={i} className="text-left">
                          <div className="flex gap-4 items-center mb-3">
                            <div className="flex-shrink-0 w-12 h-12 bg-[#149e07] text-white rounded-lg flex items-center justify-center font-bold text-lg">
                              {item.number} 
                            </div>
                            <h4 className="text-[#149e07] font-bold text-2xl">{item.title}</h4>
                          </div>
                          <div className="ml-16">
                            <div className="text-gray-900 leading-relaxed">
                              {item.content.split('\n\n').map((paragraph, idx) => (
                                <p key={idx} className={idx > 0 ? 'mt-4' : ''}>
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Currency Conversion Section - AGORA DEPOIS */}
                    {isClient && (
                                            <div className="rounded-2xl p-8 mb-8 max-w-lg mx-auto shadow-md" style={{ backgroundColor: '#0B0F0D', border: '2px solid #1A2A22' }}>
                        <h3 className="text-[22px] font-bold text-center mb-4" style={{ color: '#F1F1F1' }}>Ganhar <span className="text-[#00ff88]">€50.000 por mês</span> parece distante?</h3>
                        
                        {/* Explanatory Text */}
                        <div className="text-center mb-6">
                          <p className="text-base mb-3" style={{ color: '#C2C2C2' }}>Na verdade, é bem mais simples do que parece:</p>
                          <p className="text-base" style={{ color: '#C2C2C2' }}>Se você vende um produto com ticket médio de €100,<br />você precisa apenas de <strong style={{ color: '#F1F1F1' }}>17 pedidos por dia</strong> para faturar mais de <strong style={{ color: '#F1F1F1' }}>€50.000 por mês</strong>.</p>
                        </div>
                        
                        {/* Exchange Rate Display */}
                        <div className="p-4 mb-6 text-center">
                          <p className="text-sm mb-1" style={{ color: '#C2C2C2' }}>Taxa atual</p>
                          <p className="text-2xl font-bold" style={{ color: '#F1F1F1' }}>1 EUR = 6,50 BRL</p>
                          <p className="text-xs mt-1" style={{ color: '#C2C2C2' }}>Atualizado em tempo real</p>
                        </div>
                        {/* Calculator Inputs */}
                        <div className="space-y-4">
                          {/* Euro Input */}
                          <div className="rounded-lg p-4" style={{ backgroundColor: '#1A2A22', border: '1px solid #1A2A22' }}>
                            <label className="text-sm block mb-2" style={{ color: '#C2C2C2' }}>Euros (EUR)</label>
                            <div className="flex items-center">
                              <span className="text-[#00ff88] text-2xl font-bold mr-3">€</span>
                              <input 
                                type="number" 
                                placeholder="0,00"
                                className="bg-transparent text-xl font-semibold flex-1 outline-none"
                                style={{ color: '#F1F1F1' }}
                                value={euroValue}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value) || 0
                                  handleEuroChange(value)
                                }}
                                step="0.01"
                                min="0"
                              />
                            </div>
                          </div>
                          {/* Real Input */}
                          <div className="rounded-lg p-4" style={{ backgroundColor: '#1A2A22', border: '1px solid #1A2A22' }}>
                            <label className="text-sm block mb-2" style={{ color: '#C2C2C2' }}>Reais (BRL)</label>
                            <div className="flex items-center">
                              <span className="text-[#00ff88] text-2xl font-bold mr-3">R$</span>
                              <input 
                                type="number" 
                                placeholder="0,00"
                                className="bg-transparent text-xl font-semibold flex-1 outline-none"
                                style={{ color: '#F1F1F1' }}
                                value={realValue.toFixed(2)}
                                onChange={(e) => {
                                  const value = parseFloat(e.target.value) || 0
                                  handleRealChange(value)
                                }}
                                step="0.01"
                                min="0"
                              />
                            </div>
                          </div>
                        </div>
                        {/* Quick Amount Buttons */}
                        <div className="mt-6">
                          <p className="text-sm mb-3" style={{ color: '#C2C2C2' }}>Pedidos por dia:</p>
                          <div className="grid grid-cols-4 gap-2">
                            {['17', '25', '50', '100'].map((orders) => {
                              const orderNum = parseFloat(orders)
                              const isSelected = selectedOrders === orderNum
                              return (
                                <button 
                                  key={orders}
                                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
                                    isSelected 
                                      ? '' 
                                      : 'hover:bg-green-600'
                                  }`}
                                  style={{
                                    backgroundColor: isSelected ? '#00ff88' : '#1A2A22',
                                    border: isSelected ? '2px solid #00ff88' : '1px solid #1A2A22',
                                    color: isSelected ? '#000000' : '#F1F1F1',
                                    boxShadow: isSelected ? '0 4px 6px #00ff88(0, 255, 136, 0.3)' : 'none'
                                  }}
                                  onClick={() => handleQuickAmount(orderNum)}
                                >
                                  {orders} pedidos
                                </button>
                              )
                            })}
                          </div>
                        </div>
                        {/* Live Indicator */}
                        <div className="flex items-center justify-center mt-6 pt-4" style={{ borderTop: '1px solid #1A2A22' }}>
                          <div className="w-2 h-2 bg-[#16ca0f] rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs" style={{ color: '#C2C2C2' }}>Cotação em tempo real</span>
                        </div>
                      </div>
                    )}

                    {/* Continue Button */}
                    <div className="text-center mt-8 mb-12">
                      <a 
                        href={quizURLs.continue} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r rounded-lg shadow-lg shadow-[#0fff1ba2] from-[#03af0c] via-[#0fe219] to-[#0fc718] text-white text-bold px-4 py-4 text-[18px] transition-colors cursor-pointer"
                        onClick={() => trackCTAClick(3, section.id, 'Continue', 'Aplique para uma consultoria gratuita')}
                      >
                        Aplique para uma consultoria gratuita
                      </a>
                    </div>

                    {/* Card de Benefícios - NOVA POSIÇÃO */}
                    <div className="flex justify-center items-center w-full mb-8">
                      <div className="w-full max-w-xl">
                        <div className="flex flex-col items-center w-full p-6 md:p-10">
                          {/* Título */}
                          <h2 className="text-3xl md:text-3xl font-roboto font-bold text-[#050505] text-center mb-8">
                            O que você vai receber
                          </h2>
                          {/* Card Interno */}
                          <div className="w-full rounded-3xl p-1" style={{ background: 'linear-gradient(to bottom, #189218, #17ce06)' }}>
                            <div className="w-full h-full rounded-3xl p-6 md:p-8 flex flex-col items-center" style={{ background: 'linear-gradient(to bottom, #ffffff, #e9f4fe)' }}>
                              {/* Texto principal */}
                              <div className="text-[#0f0f0f] text-lg md:text-2xl font-bold text-center mb-6">
                                Plano prático de como fazer sua primeira venda em euro em 24 horas!
                              </div>
                              {/* Boxes verdes */}
                              <div className="flex flex-col gap-4 w-full">
                                <div className="bg-gradient-to-r from-[#189218] via-[#17ce06] to-[#12a005] text-white text-base md:text-lg font-normal text-center rounded-lg py-3 px-4">
                                  Estrutura de loja que mais converte e não cai 
                                </div>
                                <div className="bg-gradient-to-r from-[#189218] via-[#17ce06] to-[#12a005] text-white text-base md:text-lg font-normal text-center rounded-lg py-3 px-4">
                                  Como receber pagamentos globais<br className='hidden md:block'/> sem uma conta no exterior
                                </div>
                                <div className="bg-gradient-to-r from-[#189218] via-[#17ce06] to-[#12a005] text-white text-base md:text-lg font-normal text-center rounded-lg py-3 px-4">
                                  Exemplos de produtos que faturam<br className='hidden md:block'/> 10.000 euros/mês
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Countries Carousel - Before final image */}
                    {isClient && (
                      <div className="w-full bg-white pt-6 overflow-hidden border-t border-gray-200">
                      <style jsx>{`
                        .countries-container {
                          width: 100%;
                          overflow: hidden;
                        }
                        
                        .countries-slider {
                          display: flex;
                          width: calc(250px * 11); /* 11 countries * 250px each */
                          animation: slideCountries 25s linear infinite;
                          will-change: transform;
                        }
                        
                        .country-item {
                          flex: 0 0 250px;
                          display: flex;
                          align-items: center;
                          justify-content: flex-start;
                          padding: 0 15px;
                        }
                        
                        .country-flag {
                          color: #222;
                          text-shadow: none;
                          font-size: 2.5rem;
                          margin-right: 15px;
                          flex-shrink: 0;
                          font-weight: bold;
                        }
                        
                        .country-name {
                          color: #222;
                          font-size: 1.1rem;
                          font-weight: 500;
                          white-space: nowrap;
                        }
                        
                        @keyframes slideCountries {
                          0% {
                            transform: translateX(0);
                          }
                          100% {
                            transform: translateX(calc(-250px * 11));
                          }
                        }
                        
                        @media (max-width: 768px) {
                          .countries-slider {
                            width: calc(200px * 11);
                          }
                          
                          .country-item {
                            flex: 0 0 200px;
                            padding: 0 10px;
                          }
                          
                          .country-flag {
                            font-size: 2rem;
                            margin-right: 10px;
                          }
                          
                          .country-name {
                            font-size: 1rem;
                          }
                          
                          @keyframes slideCountries {
                            0% {
                              transform: translateX(0);
                            }
                            100% {
                              transform: translateX(calc(-200px * 11));
                            }
                          }
                        }
                      `}</style>
                      
                      <div className="countries-container">
                        <div className="countries-slider">
                          {/* Simplified countries list - only most representative per currency */}
                          {[
                            { flag: '$', name: 'Estados Unidos' },
                            { flag: '€', name: 'Alemanha' },
                            { flag: '£', name: 'Reino Unido' },
                            { flag: '¥', name: 'Japão' },
                            { flag: '₩', name: 'Coreia do Sul' },
                            { flag: 'kr', name: 'Suécia' },
                            { flag: '₣', name: 'Suíça' },
                            { flag: 'د.إ', name: 'Emirados Árabes' },
                            { flag: 'Kč', name: 'República Tcheca' },
                            { flag: 'Ft', name: 'Hungria' },
                            { flag: 'zł', name: 'Polônia' }
                          ]
                          .concat([
                            { flag: '$', name: 'Estados Unidos' },
                            { flag: '€', name: 'Alemanha' },
                            { flag: '£', name: 'Reino Unido' },
                            { flag: '¥', name: 'Japão' },
                            { flag: '₩', name: 'Coreia do Sul' },
                            { flag: 'kr', name: 'Suécia' },
                            { flag: '₣', name: 'Suíça' },
                            { flag: 'د.إ', name: 'Emirados Árabes' },
                            { flag: 'Kč', name: 'República Tcheca' },
                            { flag: 'Ft', name: 'Hungria' },
                            { flag: 'zł', name: 'Polônia' }
                          ])
                          .concat([
                            { flag: '$', name: 'Estados Unidos' },
                            { flag: '€', name: 'Alemanha' },
                            { flag: '£', name: 'Reino Unido' },
                            { flag: '¥', name: 'Japão' },
                            { flag: '₩', name: 'Coreia do Sul' },
                            { flag: 'kr', name: 'Suécia' },
                            { flag: '₣', name: 'Suíça' },
                            { flag: 'د.إ', name: 'Emirados Árabes' },
                            { flag: 'Kč', name: 'República Tcheca' },
                            { flag: 'Ft', name: 'Hungria' },
                            { flag: 'zł', name: 'Polônia' }
                          ])
                          .map((country, index) => (
                            <div key={`country-${index}`} className="country-item">
                              <span className="country-flag">{country.flag}</span>
                              <span className="country-name">{country.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                ) : null}
                </div>
              </section>
            </div>
          )
        })}
      </main>

 

        <div className="w-full h-full flex items-center justify-center overlay">
        {sectionsData.map((section, index) => {
          if (section.id === 5) {
            return (
              <Image 
                key={index}
                src="/Ultima.png"
                alt="Foto Final"
                width={1920}
                height={1080}
                className="w-full h-auto object-cover"
              />
            )
          }
        })}
        </div>
              
          <div className="text-center bg-gradient-to-b from-[#151515] to-[#000000] pb-10">
            <a 
              href={quizURLs.joinMentoria} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r rounded-lg shadow-lg shadow-[#0fff1ba2] from-[#03af0c] via-[#0fe219] to-[#0fc718] text-white text-bold px-4 py-4 text-[18px] transition-colors cursor-pointer"
              onClick={() => trackCTAClick(4, 6, 'Join Mentoria', 'Aplique para uma consultoria gratuita')}
            >
              Aplique para uma consultoria gratuita
            </a>
            <div className="flex flex-col mt-20 items-center justify-center mt-4">
            <p className="text-white text-sm">Todos os direitos reservados </p>
            <p className="text-gray-50 italic">@felipiska</p>
            <p className="text-gray-200 text-sm">since 2025</p>
            <Image className="mt-4 rounded-full" src="/wifi-money-logo.png" alt="Logo" width={50} height={50} />
            </div>
          </div>     

        {/* Background decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff41] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff41] opacity-5 rounded-full blur-3xl translate-x-1/2"></div>
        </div>
      </div>
    )
  }