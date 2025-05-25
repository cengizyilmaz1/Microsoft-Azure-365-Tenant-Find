import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  path?: string;
  type?: 'website' | 'article' | 'profile' | 'application';
  image?: string;
  schema?: Record<string, any>;
  noIndex?: boolean;
  canonical?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  path = '/',
  type = 'website',
  image,
  schema,
  noIndex = false,
  canonical,
  breadcrumbs,
  article
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Base URLs
  const siteUrl = 'https://cengizyilmaz.net/mstenant-find';
  const fullUrl = `${siteUrl}${path}`;
  const canonicalUrl = canonical || fullUrl;

  // Default values with language support
  const defaultTitle = currentLang === 'tr' 
    ? 'Microsoft Azure ve Office 365 Tenant ID Bulma - Tenant ID\'m Nedir?'
    : 'Find your Microsoft Azure and Office 365 tenant ID - What is my tenant ID?';
  
  const defaultDescription = currentLang === 'tr'
    ? 'Domain adıyla organizasyonunuzun Microsoft Azure ve Office 365 tenant ID\'sini bulun. Azure AD ve Microsoft 365 için profesyonel tenant bulucu aracı.'
    : 'Get your organization\'s Microsoft Azure and Office 365 tenant ID by domain name. Professional tenant finder tool for Azure AD and Microsoft 365.';
  
  const defaultKeywords = currentLang === 'tr'
    ? 'Microsoft Azure, Office 365, tenant ID, tenant ID bulma, tenant ID\'m nedir, domain ile tenant ID alma, organizasyon tenant ID, Azure AD tenant, Microsoft 365 tenant, Office 365 tenant ID, Azure tenant keşfi'
    : 'Microsoft Azure, Office 365, tenant ID, find tenant ID, what is my tenant ID, get tenant ID by domain name, organization tenant ID, Azure AD tenant, Microsoft 365 tenant, Office 365 tenant ID, Azure tenant discovery';
  
  const defaultImage = `${siteUrl}/og-image.jpg`;

  // Final values
  const finalTitle = title ? `${title} | Microsoft Tenant Finder` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image || defaultImage;

  // Generate breadcrumb schema
  const generateBreadcrumbSchema = () => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${siteUrl}${crumb.url}`
      }))
    };
  };

  // Generate article schema
  const generateArticleSchema = () => {
    if (type !== 'article' || !article) return null;

    return {
      '@type': 'Article',
      headline: finalTitle,
      description: finalDescription,
      image: finalImage,
      datePublished: article.publishedTime,
      dateModified: article.modifiedTime || article.publishedTime,
      author: {
        '@type': 'Person',
        name: article.author || 'Cengiz YILMAZ',
        url: 'https://cengizyilmaz.net'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Microsoft Tenant Finder',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl
      },
      articleSection: article.section || 'Technology',
      keywords: article.tags?.join(', ') || finalKeywords,
      inLanguage: currentLang
    };
  };

  // Generate FAQ schema for specific pages
  const generateFAQSchema = () => {
    if (path !== '/' && !path.includes('blog')) return null;

    const faqs = currentLang === 'tr' ? [
      {
        question: 'Microsoft Tenant ID nedir?',
        answer: 'Microsoft Tenant ID, organizasyonunuzun Azure Active Directory örneğini temsil eden benzersiz bir tanımlayıcıdır (GUID). Her Microsoft bulut hizmeti aboneliği için otomatik olarak oluşturulur.'
      },
      {
        question: 'Tenant ID\'mi nasıl bulabilirim?',
        answer: 'Tenant ID\'nizi Azure Portal\'dan, PowerShell komutlarıyla, Microsoft Graph API\'si kullanarak veya bizim ücretsiz Tenant Finder aracımızla bulabilirsiniz.'
      },
      {
        question: 'Office 365 ve Azure tenant ID\'leri aynı mı?',
        answer: 'Evet, Microsoft birleşik kimlik sistemi kullanır. Office 365, Azure ve Microsoft 365 için tenant ID\'niz aynıdır.'
      }
    ] : [
      {
        question: 'What is a Microsoft Tenant ID?',
        answer: 'A Microsoft Tenant ID is a unique identifier (GUID) that represents your organization\'s instance of Azure Active Directory. It\'s automatically created when you sign up for Microsoft cloud services.'
      },
      {
        question: 'How can I find my Tenant ID?',
        answer: 'You can find your Tenant ID through Azure Portal, PowerShell commands, Microsoft Graph API, or using our free Tenant Finder tool.'
      },
      {
        question: 'Are Office 365 and Azure tenant IDs the same?',
        answer: 'Yes, Microsoft uses a unified identity system. Your tenant ID is the same across Office 365, Azure, and Microsoft 365.'
      }
    ];

    return {
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  };

  // Generate organization schema
  const generateOrganizationSchema = () => ({
    '@type': 'Organization',
    name: 'Microsoft Tenant Finder',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: finalDescription,
    founder: {
      '@type': 'Person',
      name: 'Cengiz YILMAZ',
      url: 'https://cengizyilmaz.net'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'creator',
      url: 'https://cengizyilmaz.net/contact'
    },
    sameAs: [
      'https://github.com/cengizyilmaz1',
      'https://linkedin.com/in/cengizyilmazz',
      'https://twitter.com/cengizyilmaz_'
    ]
  });

  // Generate main website schema
  const generateWebsiteSchema = () => ({
    '@type': 'WebSite',
    name: 'Microsoft Tenant Finder',
    url: siteUrl,
    description: finalDescription,
    inLanguage: [currentLang],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/?domain={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    creator: {
      '@type': 'Person',
      name: 'Cengiz YILMAZ'
    }
  });

  // Generate structured data
  const generateSchema = () => {
    const schemas: any[] = [
      generateOrganizationSchema(),
      generateWebsiteSchema()
    ];

    // Add conditional schemas
    const breadcrumbSchema = generateBreadcrumbSchema();
    if (breadcrumbSchema) schemas.push(breadcrumbSchema);

    const articleSchema = generateArticleSchema();
    if (articleSchema) schemas.push(articleSchema);

    const faqSchema = generateFAQSchema();
    if (faqSchema) schemas.push(faqSchema);

    // Add custom schema if provided
    if (schema) schemas.push(schema);

    return {
      '@context': 'https://schema.org',
      '@graph': schemas
    };
  };

  const structuredData = generateSchema();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Cengiz YILMAZ" />
      <meta name="creator" content="Cengiz YILMAZ" />
      <meta name="publisher" content="Microsoft Tenant Finder" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} />
      <meta name="googlebot" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1'} />
      <meta name="language" content={currentLang} />
      <meta name="revisit-after" content="3 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="classification" content="business" />
      <meta name="category" content="technology" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${path}`} />
      <link rel="alternate" hrefLang="tr" href={`${siteUrl}${path}${path.includes('?') ? '&' : '?'}lang=tr`} />
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${path}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:locale" content={currentLang === 'tr' ? 'tr_TR' : 'en_US'} />
      <meta property="og:site_name" content="Microsoft Tenant Finder" />
      <meta property="fb:app_id" content="YOUR_FACEBOOK_APP_ID" />
      
      {/* Article specific Open Graph */}
      {type === 'article' && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime || article.publishedTime} />
          <meta property="article:author" content={article.author || 'Cengiz YILMAZ'} />
          <meta property="article:section" content={article.section || 'Technology'} />
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@cengizyilmaz_" />
      <meta name="twitter:site" content="@cengizyilmaz_" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={finalTitle} />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="cengizyilmazz" />
      
      {/* Microsoft/Bing */}
      <meta name="msapplication-TileColor" content="#0284c7" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      
      {/* Google */}
      <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
      <meta name="google" content="notranslate" />
      
      {/* App-specific */}
      <meta name="application-name" content="MS Tenant Finder" />
      <meta name="apple-mobile-web-app-title" content="MS Tenant Finder" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#0284c7" />
      <meta name="color-scheme" content="light dark" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Performance & Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no,email=no,address=no" />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData, null, 2)}
      </script>
      
      {/* Google Analytics 4 */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-E6HR73GY9H"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E6HR73GY9H', {
              page_title: ${JSON.stringify(finalTitle)},
              page_location: ${JSON.stringify(fullUrl)},
              content_language: ${JSON.stringify(currentLang)},
              custom_map: {
                'custom_parameter_1': 'tenant_search'
              }
            });
          `
        }}
      />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//dns.google" />
      <link rel="dns-prefetch" href="//cloudflare-dns.com" />
      <link rel="dns-prefetch" href="//login.microsoftonline.com" />
      <link rel="dns-prefetch" href="//graph.microsoft.com" />
      
      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO; 