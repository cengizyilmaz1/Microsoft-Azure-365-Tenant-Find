import { GraphApiError } from '../types/errors';

interface TenantResponse {
  tenantId: string;
  displayName: string;
}

export async function searchTenant(domain: string): Promise<TenantResponse> {
  try {
    if (!domain.includes('.')) {
      throw new GraphApiError('INVALID_DOMAIN', domain);
    }

    // First try the federation API as it's more reliable
    try {
      const federationEndpoint = `https://login.microsoftonline.com/${domain}/.well-known/openid-configuration`;
      const response = await fetch(federationEndpoint);
      const data = await response.json();
      
      if (data.token_endpoint) {
        const tenantId = data.token_endpoint.split('/')[3];
        return {
          tenantId: tenantId,
          displayName: domain.split('.')[0]
        };
      }
    } catch (federationError) {
      // Continue to next method
    }

    // Try the Microsoft Graph API endpoint
    try {
      const graphEndpoint = `https://graph.microsoft.com/v1.0/tenantRelationships/findTenantInformationByDomainName(domainName='${domain}')`;
      const graphResponse = await fetch(graphEndpoint);
      const data = await graphResponse.json();
      
      if (data.tenantId) {
        return {
          tenantId: data.tenantId,
          displayName: data.displayName || domain.split('.')[0]
        };
      }
    } catch (graphError) {
      // Continue to next method
    }

    // Final fallback to federation provider
    const federationProviderEndpoint = `https://odc.officeapps.live.com/odc/v2.1/federationProvider?domain=${domain}`;
    const providerResponse = await fetch(federationProviderEndpoint);
    
    if (!providerResponse.ok) {
      throw new GraphApiError('NOT_FOUND', domain);
    }

    const providerData = await providerResponse.json();
    
    if (!providerData.TenantId) {
      throw new GraphApiError('NOT_FOUND', domain);
    }

    return {
      tenantId: providerData.TenantId,
      displayName: providerData.DisplayName || domain.split('.')[0]
    };

  } catch (error) {
    if (error instanceof GraphApiError) {
      throw error;
    }
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new GraphApiError('NETWORK_ERROR', domain);
    }
    
    throw new GraphApiError('NOT_FOUND', domain);
  }
}