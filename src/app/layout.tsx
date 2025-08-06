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
  title: "Wifi-M$ney - Mercado Global",
  description: "Fature em dolar com a ajuda dos melhores profissionais do mercado",
  icons: {
    icon: '/wifi-money-logo.png',
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
              fbq('init', '728523633510605');
              
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
              
              // Disparar evento LPage-view
              const cleanParams = getAllTrackingParams();
              fbq('trackCustom', 'Att-LPageView', cleanParams);
              console.log('📊 Meta Pixel: LPage-view disparado com parâmetros:', cleanParams);
            `,
          }}
        />
        
        {/* TikTok Pixel Code */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
                var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
                ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              
                // Inicializar TikTok Pixel
                ttq.load('D259I0RC77U5781ILVK0');
                ttq.page();
                
                // Disparar evento customizado LPage-view para TikTok
                const tiktokParams = getAllTrackingParams();
                ttq.track('Att-LPageView', tiktokParams);
                console.log('📊 TikTok Pixel: LPage-view disparado com parâmetros:', tiktokParams);
              }(window, document, 'ttq');
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
