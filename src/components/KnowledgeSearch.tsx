import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, BookOpen, ExternalLink } from 'lucide-react';

// TypeScript declaration for Inbenta SDK
declare global {
  interface Window {
    InbentaSearchSDK: any;
  }
}

const KnowledgeSearch: React.FC = () => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const noResultsRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeSearch = () => {
      if (window.InbentaSearchSDK) {
        try {
          // Initialize SDK
          const sdk = window.InbentaSearchSDK.createFromDomainKey(
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiY2xuX3ZpaXZfZ2VuX2FpX3YyXzkwNDFfc2VhcmNoX2VuIiwiZG9tYWluX2tleV9pZCI6IkJqN19qTTFFRVlwMTZEMm9EaUFlUHc6OiJ9.kCsSaC86c1zKthnP7y9f47yGVtQLQxp0o-zh5gEDHd0ed-ETqWNEhs1wVhsWqk3ZirwyztnZuxdxSMNViegKIw',
            'BjmTFARIct6Ih8RUhfg2+9rPKRSK26kcnSa6KJuHl3s=',
            {
              environment: 'development',
              labels: {
                SEARCH_BOX_PLACEHOLDER: 'Search documentation, answers, articles…',
                REFINEMENT_TABS_ALL_TAB: 'All'
              }
            }
          );

          // Create results component
          const results = sdk.component('results', resultsRef.current, {
            resultsPerPage: 5,
            attributes: ['BEST_DYNABS', 'DOCUMENT_ID'],
            transformData: (item: any) => {
              item.highlightedTitle = item.highlightedTitle || item.title;
              return item;
            },
            templates: {
              item: `
                <div class="p-4 border border-border rounded-lg bg-card hover:bg-muted/30 transition-all duration-200 hover:shadow-medium" style="box-shadow: var(--shadow-soft);">
                  <a href="{{ __url }}" target="_blank" class="block group">
                    <h3 class="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {{{ highlightedTitle }}}
                    </h3>
                    {{#attributes.BEST_DYNABS}}
                      <p class="text-muted-foreground text-sm leading-relaxed">
                        {{{ attributes.BEST_DYNABS }}}
                      </p>
                    {{/attributes.BEST_DYNABS}}
                    <div class="flex items-center gap-2 mt-3 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                      <span>View full document</span>
                    </div>
                  </a>
                </div>
              `
            }
          });

          // Create other components
          const searchBox = sdk.component('search-box', searchBoxRef.current, { autofocus: false });
          const stats = sdk.component('stats', statsRef.current, {
            text: 'Results {{ first }}–{{ last }} of {{ totalResults }} for: {{ query }}'
          });
          const loader = sdk.component('loader', loaderRef.current);
          const noResults = sdk.component('no-results', noResultsRef.current);
          const pagination = sdk.component('pagination', paginationRef.current);
          const refinementTabs = sdk.component('refinement-tabs', tabsRef.current, {
            attributeName: 'Topic'
          });

          // Link all components
          results.linkTo(searchBox);
          results.linkTo(stats);
          results.linkTo(loader);
          results.linkTo(noResults);
          results.linkTo(pagination);
          results.linkTo(refinementTabs);

          setIsLoaded(true);
        } catch (error) {
          console.error('Failed to initialize Inbenta Search:', error);
        }
      }
    };

    // Check if SDK is loaded, if not wait for it
    if (window.InbentaSearchSDK) {
      initializeSearch();
    } else {
      const checkSDK = setInterval(() => {
        if (window.InbentaSearchSDK) {
          clearInterval(checkSDK);
          initializeSearch();
        }
      }, 100);

      // Cleanup after 10 seconds
      setTimeout(() => clearInterval(checkSDK), 10000);
    }
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Knowledge Search
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Search through documentation, answers, and articles
        </p>
      </CardHeader>
      <CardContent className="space-y-6 pt-0 px-4 pb-4 w-full">
        {/* Search Box */}
        <div className="flex gap-2 mb-6">
          <div 
            ref={searchBoxRef} 
            className="flex-1"
            style={{ width: '100%' }}
          />
        </div>

        {/* Category Tabs */}
        <div ref={tabsRef} className="flex flex-wrap gap-2 mb-4" />

        {/* Stats */}
        <div ref={statsRef} className="text-sm text-muted-foreground mb-4" />

        {/* Loader */}
        <div ref={loaderRef} className="hidden" />

        {/* No Results */}
        <div ref={noResultsRef} className="hidden" />

        {/* Results */}
        <div className="space-y-3 mt-6">
          <div ref={resultsRef} />
        </div>

        {/* Pagination */}
        <div ref={paginationRef} className="flex justify-center mt-8" />
      </CardContent>
    </Card>
  );
};

export default KnowledgeSearch;
