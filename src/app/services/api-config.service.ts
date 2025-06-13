import { Injectable } from '@angular/core';

export interface ApiEndpoint {
  name: string;
  baseUrl: string;
  endpoints: { [key: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private readonly API_ENDPOINTS: { [key: string]: ApiEndpoint } = {
    // API principale per autenticazione e documenti
    documentRecognition: {
      name: 'Document Recognition API',
      baseUrl: 'https://document-recognition.microservices.logwer.com',
      endpoints: {
        login: '/User/Login',
        documents: '/DocRecog',
        getHeader: '/DocRecog/getheader',
        saveDossier: '/DocRecog/SaveDossier',
        restoreDossier: '/DocRecog/RestoreDossier',
      },
    },
  };

  /**
   * Ottiene la configurazione completa di un'API
   */
  getApiConfig(apiName: string): ApiEndpoint | null {
    return this.API_ENDPOINTS[apiName] || null;
  }

  /**
   * Ottiene il base URL di un'API specifica
   */
  getBaseUrl(apiName: string): string {
    const config = this.getApiConfig(apiName);
    if (!config) {
      throw new Error(`API configuration not found for: ${apiName}`);
    }
    return config.baseUrl;
  }

  /**
   * Ottiene l'URL completo per un endpoint specifico
   */
  getEndpointUrl(apiName: string, endpointName: string): string {
    const config = this.getApiConfig(apiName);
    if (!config) {
      throw new Error(`API configuration not found for: ${apiName}`);
    }

    const endpoint = config.endpoints[endpointName];
    if (!endpoint) {
      throw new Error(
        `Endpoint '${endpointName}' not found for API: ${apiName}`
      );
    }

    return `${config.baseUrl}${endpoint}`;
  }

  /**
   * Ottiene tutti i nomi delle API disponibili
   */
  getAvailableApis(): string[] {
    return Object.keys(this.API_ENDPOINTS);
  }

  /**
   * Ottiene tutti gli endpoint disponibili per un'API
   */
  getAvailableEndpoints(apiName: string): string[] {
    const config = this.getApiConfig(apiName);
    return config ? Object.keys(config.endpoints) : [];
  }

  /**
   * Aggiunge dinamicamente una nuova configurazione API
   */
  addApiConfig(apiName: string, config: ApiEndpoint): void {
    this.API_ENDPOINTS[apiName] = config;
  }

  /**
   * Aggiorna un endpoint esistente
   */
  updateEndpoint(
    apiName: string,
    endpointName: string,
    endpointPath: string
  ): boolean {
    const config = this.API_ENDPOINTS[apiName];
    if (config) {
      config.endpoints[endpointName] = endpointPath;
      return true;
    }
    return false;
  }
}
