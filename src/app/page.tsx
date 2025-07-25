'use client'

import Image from 'next/image'
import { useState } from 'react'

// Declare fbq for TypeScript
declare global {
  interface Window {
    fbq: unknown;
  }
}

// Meta Pixel tracking function
const trackCTAClick = (sectionId: number, ctaType: string, buttonText: string) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: `Seção ${sectionId} - ${ctaType}`,
      content_category: 'CTA Click',
      value: sectionId,
      currency: 'BRL',
      custom_parameter_1: `secao_${sectionId}`,
      custom_parameter_2: ctaType,
      custom_parameter_3: buttonText
    })
    
    // Track custom event for better organization
    window.fbq('trackCustom', `CTA_Secao_${sectionId}`, {
      section: sectionId,
      cta_type: ctaType,
      button_text: buttonText,
      timestamp: new Date().toISOString()
    })
  }
}

const sectionsData = [
  {
    id: 1,
    title: 'TEXTO_IMAGE_HERO',
    image: '/next.svg',
    text: 'TEXTO_IMAGE_HERO',
    buttonText: 'Aplique para uma consultoria gratuita',
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
    title: 'O WI-FI MONEY É PRA VOCÊ!',
    image: '/file.svg',
    text: 'SPECIAL_SECTION_3',
    buttonText: 'QUERO APLICAR PARA A VAGA',
    miniText: 'Vagas limitadas'
  },
  {
    id: 4,
    title: 'Porque o mercado de produto físico global vai formar o maior número de novos milionários já visto?',
    image: '/star.svg',
    text: 'SPECIAL_SECTION_4',
    buttonText: 'CONTINUE NAVEGANDO',
    miniText: 'Mercado trilionário esperando por você'
  },
  {
    id: 5,
    title: 'FOTO_FINAL',
    image: '/globe.svg',
    text: 'FOTO_FINAL',
    buttonText: 'Finalizar',
    miniText: 'Última seção'
  }
]

export default function Home() {
  // Calculator state
  const [euroValue, setEuroValue] = useState(1)
  const [realValue, setRealValue] = useState(6.50)
  const exchangeRate = 6.50

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

  // Handle quick amount buttons
  const handleQuickAmount = (amount: number) => {
    setEuroValue(amount)
    setRealValue(amount * exchangeRate)
  }

  // Define background and text colors for each section
  const getSectionClasses = (sectionId: number) => {
    switch(sectionId) {
      case 1: return { bg: 'bg-white', text: 'text-white' } // Hero - branco
      case 2: return { bg: 'bg-[#151515]', text: 'text-white' } // Lista "Você não precisa" - branco
      case 3: return { bg: 'bg-black', text: 'text-white' } // Wi-Fi Money - preto
      case 4: return { bg: 'bg-black', text: 'text-white' } // Mercado Global - claro
      case 5: return { bg: 'bg-white', text: 'text-white' } // Foto Final - branco
      default: return { bg: 'bg-black', text: 'text-white' }
    }
  }

  return (
    <div className="min-h-screen">
      {/* All Sections */}
      <main className="w-full bg-black">
        {sectionsData.map((section, index) => {
          const sectionClasses = getSectionClasses(section.id)
          return (
            <div key={section.id}>
              <section className={`${sectionClasses.bg} ${sectionClasses.text} ${index !== sectionsData.length - 1}`}>
                <div className={section.id === 1 || section.id === 5 ? "w-full" : "max-w-4sxl mx-auto text-center"}>

                {/* Banner Image - Only on first section at top */}
                {section.id === 1 ? (
                  <Image
                    src="/banner.png"
                    alt="Banner Principal LP Piska"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover"
                  />
                ) : section.id === 2 ? (
                  <div>
                  <Image
                    src="/texto1.png"
                    alt="Banner Principal LP Piska"
                    width={1920}
                    height={1120}
                    className="w- h-auto object-cover"
                  />
                  {/* Button */}
                  <div className="mb-16 mt-10"> {/* Aumenta o espaçamento abaixo do primeiro botão */}
                      <a 
                        href="https://quiz.felipiska.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r rounded-lg shadow-lg shadow-green-500/50 from-green-500 via-green-600 to-green-700 text-white px-8 py-3 text-base hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => trackCTAClick(section.id, 'Banner', section.buttonText)}
                      >
                        {section.buttonText}
                      </a>
                    </div>
                  <Image
                    src="/Tópico 2.png"
                    alt="Banner Principal LP Piska"
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-cover rounded-3xl"
                  />
                  </div>
                ) : section.id === 3 ? (
                  <div className="max-w-4xl mx-10 mt-15">
                    {/* Subtitle */}
                    <p className="text-white text-center mb-4">
                      Se você se encaixa em algum desses perfis,
                    </p>
                    
                    {/* Main Title */}
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
                      O WI-FI MONEY<br />
                      É <span className="text-[#00ff41] text-shadow-green-300">PRA VOCÊ!</span>
                    </h2>

                    {/* Profile List */}
                    <div className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
                      {[
                        'Está na CLT ou na faculdade e quer mudar de vida',
                        'Já trabalha em alguma área do mercado digital',
                        'Já trabalha com Tráfego direto / Dropshipping',
                        'É brasileiro e quer ganhar NO MÍNIMO 15 mil euros por mês trabalhando de casa',
                        'Já vende na Europa mas não consegue escalar',
                        'Está cansado da margem e dos golpes do mercado brasileiro'
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00ff41] flex items-center justify-center mt-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10 3L4.5 8.5L2 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-white text-lg">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-3 gap-4 max-w-md mt-5 mx-auto mb-10">
                      <div className="rounded-lg overflow-hidden">
                        <Image
                          src="/image3.jpg"
                          alt="Foto 1"
                          width={200}
                          height={400}
                          className="w-full h-100 object-cover"
                        />
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <Image
                          src="/image4.jpg"
                          alt="Foto 2"
                          width={200}
                          height={400}
                          className="w-full h-120 object-cover"
                        />
                      </div>
                      <div className="rounded-lg overflow-hidden">
                        <Image
                          src="/image2 (1).jpg"
                          alt="Foto 2"
                          width={200}
                          height={400}
                          className="w-full h-100 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ) : section.id === 4 ? (
                  <div className="max-w-4xl mx-auto py-8 px-4 bg-white rounded-2xl shadow-lg border border-gray-200">
                    {/* Main Title */}
                    <h2 className="text-3xl md:text-3xl font-bold text-center mb-16 leading-tight text-black">
                      Porque o mercado de<br />
                      produto físico global <br />
                      vai formar o maior número de novos<br />
                      <span className="text-[#0bb636]">
                      milionários já visto?</span>
                    </h2>

                    {/* Benefits List - AGORA PRIMEIRO */}
                    <div className="space-y-6 mt-20 mb-8">
                      {[
                        {
                          number: "01",
                          title: "Mercado Trilionário",
                          content: "O mercado global de produtos físicos sem estoque está em constante expansão. Movimentando em 2024 mais de 2,1 Trilhões de dólares.\n\nE o melhor, você não precisa de muito para mudar de vida, basta apenas uma 'mordidinha' nessa torta gigantesca!"
                        },
                        {
                          number: "02", 
                          title: "Baixo Nível de Sofisticação",
                          content: "O Mercado global é infinitamente menos sofisticado, para vender no brasil e países da américa do sul, você precisa ser extremamente bom de copy e estratégia.\n\nJá no Global o conhecimento básico irá te levar a patamares que você jamais visitou."
                        },
                        {
                          number: "03",
                          title: "Alto poder de compra", 
                          content: "Os clientes do mercado internacional possuem um poder aquisitivo INFINITAMENTE superior em relação à outros mercados, isso significa que eles compram muito e estão mais dispostos a pagar muito por um produto de qualidade."
                        },
                        {
                          number: "04",
                          title: "Ticket médio alto",
                          content: "Enquanto no Brasil lutamos para efetuar uma venda de R$50,00 - R$150 Reais.\n\nNo mercado internacional vendemos produtos de 50 euros à 150 euros com extrema facilidade."
                        },
                        {
                          number: "05", 
                          title: "CPA (Custo por Aquisição) Barato",
                          content: "Enquanto no Brasil lutamos para efetuar uma venda de R$50,00 - R$150 Reais.\n\nNo mercado internacional vendemos produtos de 50 euros à 150 euros com extrema facilidade."
                        },
                        {
                          number: "06",
                          title: "Ganhar em moeda forte",
                          content: "Esse é o principal ponto e que me possibilitou viajar ao redor do mundo. já imaginou colocar de R$400,00 à R$700 por venda no seu bolso?\n\nAqui o jogo é diferente, você irá ganhar em moedas que valem 6-7 vezes mais!"
                        }
                      ].map((item, i) => (
                        <div key={i} className="text-left flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-[#0bb636] text-white rounded-lg flex items-center justify-center font-bold text-lg">
                            {item.number} 
                          </div>
                          <div>  
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
                    <div className="bg-white rounded-2xl p-8 mb-8 max-w-lg mx-auto border border-gray-200 shadow-md">
                      <h3 className="text-gray-900 text-xl font-bold text-center mb-6">Calculadora de Câmbio</h3>
                      {/* Exchange Rate Display */}
                      <div className="p-4 mb-6 text-center">
                        <p className="text-gray-700 text-sm mb-1">Taxa atual</p>
                        <p className="text-gray-900 text-2xl font-bold">1 EUR = 6,50 BRL</p>
                        <p className="text-gray-500 text-xs mt-1">Atualizado em tempo real</p>
                      </div>
                      {/* Calculator Inputs */}
                      <div className="space-y-4">
                        {/* Euro Input */}
                        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                          <label className="text-gray-700 text-sm block mb-2">Euros (EUR)</label>
                          <div className="flex items-center">
                            <span className="text-[#0bb636] text-2xl font-bold mr-3">€</span>
                            <input 
                              type="number" 
                              placeholder="0,00"
                              className="bg-transparent text-gray-900 text-xl font-semibold flex-1 outline-none"
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
                        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
                          <label className="text-gray-700 text-sm block mb-2">Reais (BRL)</label>
                          <div className="flex items-center">
                            <span className="text-[#0bb636] text-2xl font-bold mr-3">R$</span>
                            <input 
                              type="number" 
                              placeholder="0,00"
                              className="bg-transparent text-gray-900 text-xl font-semibold flex-1 outline-none"
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
                        <p className="text-gray-700 text-sm mb-3">Valores rápidos:</p>
                        <div className="grid grid-cols-4 gap-2">
                          {['10', '50', '100', '500'].map((amount) => (
                            <button 
                              key={amount}
                              className="bg-gray-100 hover:bg-[#0bb636] border border-gray-200 hover:text-white text-gray-900 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                              onClick={() => handleQuickAmount(parseFloat(amount))}
                            >
                              €{amount}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Live Indicator */}
                      <div className="flex items-center justify-center mt-6 pt-4 border-t border-gray-200">
                        <div className="w-2 h-2 bg-[#0bb636] rounded-full animate-pulse mr-2"></div>
                        <span className="text-gray-700 text-xs">Cotação em tempo real</span>
                      </div>
                    </div>

                    {/* Continue Button */}
                    <div className="text-center mb-12 mt-12"> {/* Espaço acima AUMENTADO e abaixo do botão 'Continue navegando' */}
                      <a 
                        href="https://quiz.felipiska.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0bb636] via-green-500 to-green-700 border-2 border-[#0bb636] text-white font-bold py-3 px-8 rounded-2xl hover:bg-[#0bb636] hover:text-white transition-all duration-300 cursor-pointer shadow-md"
                        onClick={() => trackCTAClick(section.id, 'Continue', section.buttonText)}
                      >
                        {section.buttonText}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 15l-5-5h10l-5 5z"/>
                        </svg>
                      </a>
                    </div>

                    {/* Card de Benefícios - NOVA POSIÇÃO */}
                    <div className="flex justify-center items-center w-full mb-8">
                      <div className="relative w-full max-w-xl p-1 rounded-3xl" style={{ background: '#00ff88' }}>
                        <div className="w-full h-full rounded-3xl p-1" style={{ background: '#000000' }}>
                          <div className="flex flex-col items-center w-full h-full rounded-2xl p-6 md:p-10" style={{ background: '#000000' }}>
                            {/* Título */}
                            <h2 className="text-2xl md:text-3xl font-sans font-normal text-white text-center mb-8 leading-tight">
                              O que você vai receber<br />
                              nessa Consultoria Gratuita?
                            </h2>
                            {/* Card Interno */}
                            <div className="w-full rounded-2xl p-1" style={{ background: '#00ff88' }}>
                              <div className="w-full h-full rounded-2xl p-6 md:p-8 flex flex-col items-center" style={{ background: '#e9f4fe' }}>
                                {/* Texto principal */}
                                <div className="text-black text-lg md:text-2xl font-bold text-center mb-6">
                                  Plano prático de como fazer sua primeira venda em euro em 24 horas!
                                </div>
                                {/* Boxes verdes */}
                                <div className="flex flex-col gap-4 w-full">
                                  <div className="bg-[#2fb62b] text-white text-base md:text-lg font-normal text-center rounded-lg py-3 px-4">
                                    Estrutura de loja que mais converte e não cai
                                  </div>
                                  <div className="bg-[#2fb62b] text-white text-base md:text-lg font-normal text-center rounded-lg py-3 px-4">
                                    Como receber pagamentos globais<br className='hidden md:block'/> sem uma conta no exterior
                                  </div>
                                  <div className="bg-[#2fb62b] text-white text-base md:text-lg font-normal text-center rounded-lg py-3 px-4">
                                    Exemplos de produtos que faturam<br className='hidden md:block'/> 10.000 euros/mês
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Countries Carousel - Before final image */}
                    <div className="w-full bg-white py-6 overflow-hidden border-t border-gray-200">
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
              
          <div className="max-w-2xl mx-auto bg-[#151515] text-center mb-16 pb-10"> {/* Espaço abaixo do botão 'QUERO ME JUNTAR À MENTORIA' e padding extra no fundo escuro */}
            <a 
              href="https://quiz.felipiska.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-green-600 via-green-500 to-green-700 shadow-lg shadow-green-400/25 border-1 border-gray-500/50 text-white font-bold text-lg px-10 py-4 rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => trackCTAClick(section.id, 'Join Mentoria', 'QUERO ME JUNTAR À MENTORIA')}
            >
              QUERO ME JUNTAR À MENTORIA
            </a>
          </div>     

        {/* Background decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00ff41] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff41] opacity-5 rounded-full blur-3xl translate-x-1/2"></div>
        </div>
      </div>
    )
  }
