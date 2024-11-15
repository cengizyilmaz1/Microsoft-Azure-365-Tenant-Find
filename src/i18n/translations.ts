export const translations = {
  en: {
    translation: {
      common: {
        title: 'Microsoft Azure & Microsoft 365 Tenant Finder',
        description: 'Instantly find tenant IDs for any Microsoft 365 or Azure domain',
        search: 'Search Tenant',
        download: 'Download JSON',
        copy: 'Copy Tenant ID',
        multiDomainHint: 'Enter multiple domains separated by commas',
        disclaimer: 'This tool uses public Microsoft APIs to lookup tenant information. No data is stored or logged.',
        lightMode: 'Switch to light mode',
        darkMode: 'Switch to dark mode',
        errors: {
          notFound: 'Domain lookup failed: No Microsoft 365 or Azure tenant found\n\nPossible reasons:\n• The domain is not registered with Microsoft services\n• The domain might be using a private or internal tenant\n• The domain name could be misspelled\n• The organization might not be using Microsoft cloud services\n\nSuggestions:\n• Double-check the domain spelling\n• Verify that the organization uses Microsoft 365 or Azure\n• Try the primary domain if using a subdomain',
          api_error: 'An error occurred while fetching tenant information',
          network_error: 'Unable to connect to the server',
          invalid_domain: 'Please enter a valid domain name',
          emptyDomain: 'Please enter a domain name',
          general: 'An unexpected error occurred'
        },
        success: {
          found: 'Tenant information found successfully',
          foundMultiple: 'Found {{count}} tenant(s)',
          copied: 'Tenant ID copied to clipboard',
          downloaded: 'Tenant information downloaded'
        },
        footer: {
          creator: 'Created by Cengiz YILMAZ',
          mvp: 'Microsoft MVP',
          backlink: 'Visit My Website',
          copyright: '© 2024 All rights reserved'
        }
      },
      info: {
        whatIs: {
          title: 'What is a Tenant ID?',
          description: 'A Tenant ID is a unique identifier for your Microsoft 365 or Azure Active Directory organization.',
          point1: 'Used for authentication and resource access',
          point2: 'Required for API integrations and admin tasks',
          point3: 'Helps identify your organization in Microsoft cloud services'
        },
        howTo: {
          title: 'How to Use This Tool',
          description: 'Finding a tenant ID is simple with our tool:',
          step1: 'Enter one or more domain names (separated by commas)',
          step2: 'Click search or press Enter',
          step3: 'View, copy, or download the tenant information'
        }
      },
      cookies: {
        title: 'Cookie Preferences',
        description: 'We use cookies to enhance your experience and remember your preferences.',
        acceptAll: 'Accept All',
        acceptNecessary: 'Accept Necessary Only',
        learnMore: 'Privacy Policy'
      }
    }
  },
  tr: {
    translation: {
      common: {
        title: 'Microsoft Azure & Microsoft 365 Tenant Bulucu',
        description: 'Herhangi bir Microsoft 365 veya Azure domaini için anında tenant ID bulun',
        search: 'Tenant Ara',
        download: 'JSON İndir',
        copy: 'Tenant ID Kopyala',
        multiDomainHint: 'Birden fazla domain için virgülle ayırarak giriş yapın',
        disclaimer: 'Bu araç, tenant bilgilerini aramak için Microsoft\'un genel API\'lerini kullanır. Hiçbir veri saklanmaz veya kaydedilmez.',
        lightMode: 'Açık temaya geç',
        darkMode: 'Koyu temaya geç',
        errors: {
          notFound: 'Domain araması başarısız oldu: Microsoft 365 veya Azure tenant bulunamadı\n\nOlası nedenler:\n• Domain Microsoft servislerinde kayıtlı değil\n• Domain özel veya dahili bir tenant kullanıyor olabilir\n• Domain adı yanlış yazılmış olabilir\n• Kuruluş Microsoft bulut servislerini kullanmıyor olabilir\n\nÖneriler:\n• Domain yazımını kontrol edin\n• Kuruluşun Microsoft 365 veya Azure kullandığından emin olun\n• Alt domain kullanıyorsanız ana domaini deneyin',
          api_error: 'Tenant bilgileri alınırken bir hata oluştu',
          network_error: 'Sunucuya bağlanılamıyor',
          invalid_domain: 'Lütfen geçerli bir domain adı girin',
          emptyDomain: 'Lütfen bir domain adı girin',
          general: 'Beklenmeyen bir hata oluştu'
        },
        success: {
          found: 'Tenant bilgileri başarıyla bulundu',
          foundMultiple: '{{count}} tenant bulundu',
          copied: 'Tenant ID panoya kopyalandı',
          downloaded: 'Tenant bilgileri indirildi'
        },
        footer: {
          creator: 'Geliştirici: Cengiz YILMAZ',
          mvp: 'Microsoft MVP',
          backlink: 'Web Sitemi Ziyaret Et',
          copyright: '© 2024 Tüm hakları saklıdır'
        }
      },
      info: {
        whatIs: {
          title: 'Tenant ID Nedir?',
          description: 'Tenant ID, Microsoft 365 veya Azure Active Directory organizasyonunuz için benzersiz bir tanımlayıcıdır.',
          point1: 'Kimlik doğrulama ve kaynak erişimi için kullanılır',
          point2: 'API entegrasyonları ve yönetici görevleri için gereklidir',
          point3: 'Microsoft bulut servislerinde organizasyonunuzu tanımlamaya yardımcı olur'
        },
        howTo: {
          title: 'Bu Araç Nasıl Kullanılır?',
          description: 'Tenant ID bulmak aracımızla çok kolay:',
          step1: 'Bir veya daha fazla domain adı girin (virgülle ayırarak)',
          step2: 'Ara butonuna tıklayın veya Enter tuşuna basın',
          step3: 'Tenant bilgilerini görüntüleyin, kopyalayın veya indirin'
        }
      },
      cookies: {
        title: 'Çerez Tercihleri',
        description: 'Deneyiminizi geliştirmek ve tercihlerinizi hatırlamak için çerezler kullanıyoruz.',
        acceptAll: 'Tümünü Kabul Et',
        acceptNecessary: 'Sadece Gerekli Olanları Kabul Et',
        learnMore: 'Gizlilik Politikası'
      }
    }
  }
};