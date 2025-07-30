import type { Metadata } from "next";
import { Geist, Geist_Mono, Maven_Pro } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wifi-M$ney - Quiz Interativo",
  description: "Formulário em formato de quiz para consultoria estratégica",
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <head>
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              // Inicializar o pixel
              fbq('init', '730034323072546');
              
              // Função para capturar e armazenar parâmetros UTM
              function captureAndStoreUTMParams() {
                const urlParams = new URLSearchParams(window.location.search);
                const utmData = {
                  utm_source: urlParams.get('utm_source') || '',
                  utm_medium: urlParams.get('utm_medium') || '',
                  utm_campaign: urlParams.get('utm_campaign') || '',
                  utm_term: urlParams.get('utm_term') || '',
                  utm_content: urlParams.get('utm_content') || '',
                  fbclid: urlParams.get('fbclid') || '',
                  gclid: urlParams.get('gclid') || '',
                  referrer: document.referrer || '',
                  landing_page: window.location.href,
                  timestamp: new Date().toISOString()
                };
                
                // Armazenar no sessionStorage se há parâmetros relevantes
                if (utmData.utm_source || utmData.utm_medium || utmData.fbclid || utmData.gclid) {
                  try {
                    sessionStorage.setItem('utmParams', JSON.stringify(utmData));
                    console.log('📊 Parâmetros UTM capturados e armazenados:', utmData);
                  } catch (error) {
                    console.error('❌ Erro ao armazenar parâmetros UTM:', error);
                  }
                }
                
                return utmData;
              }
              
              // Capturar parâmetros UTM na inicialização
              const capturedParams = captureAndStoreUTMParams();
              
              // Função para capturar todos os parâmetros de tracking
              function getAllTrackingParams() {
                const urlParams = new URLSearchParams(window.location.search);
                return {
                  utm_source: urlParams.get('utm_source') || '',
                  utm_medium: urlParams.get('utm_medium') || '',
                  utm_campaign: urlParams.get('utm_campaign') || '',
                  utm_term: urlParams.get('utm_term') || '',
                  utm_content: urlParams.get('utm_content') || '',
                  fbclid: urlParams.get('fbclid') || '',
                  gclid: urlParams.get('gclid') || '',
                  referrer: document.referrer || '',
                  page_location: window.location.href,
                  user_agent: navigator.userAgent,
                  timestamp: new Date().toISOString()
                };
              }
              
              // Disparar evento LPage-view-typeform
              const cleanParams = getAllTrackingParams();
              fbq('trackCustom', 'LPage-view-typeform', cleanParams);
              console.log('📊 Meta Pixel: LPage-view-typeform disparado com parâmetros:', cleanParams);
            `,
          }}
        />
        <noscript>
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mavenPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
