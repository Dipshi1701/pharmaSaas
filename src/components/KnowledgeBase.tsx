import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Grid3X3, TrendingUp, FileQuestion } from 'lucide-react';

// TypeScript declaration for Inbenta KM SDK
declare global {
  interface Window {
    InbentaKmSDK: any;
  }
}

const KnowledgeBase: React.FC = () => {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const autocompleterRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);
  const pushRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeKnowledgeBase = () => {
      if (window.InbentaKmSDK) {
        try {
          // Configuration for Knowledge Management
          const domainKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiZ3NrX2NzaGRfZGVtb19rYl8zMzI2X2ttX2VuIiwiZG9tYWluX2tleV9pZCI6IkJoam1Ib3hsNS1GazVMMVFTQ2RONFE6OiJ9.isJ5_fUPTc-dj6UQjlSlhDy6GLHrp6V7bRpJ2whRUMgmO4MSj8Iu0M_mOSfy0sN3alxj9LwM1dYQgDdwPyRFxw';
          const inbentaKey = 'BhiVmPjh79Y1xfTY8drKzQuncLKUVxgWIv/2gLH1deU=';
          const config = {
            userType: 0,
            environment: 'development',
            sessionExpiry: 3600, // 1 hour session expiry
            results: {
              showBackButton: false,
              showLoader: true,
              length: 5,
              contents: {
                showRelated: true
              }
            },
            sanitizeOptions: {
              allowedTags: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote',
                'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'u',
                'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
                'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td',
                'pre', 'img', 's', 'figure', 'span', 'mark', 'iframe'
              ],
              allowedAttributes: {
                a: ['href', 'name', 'target'],
                iframe: ['src'],
                img: ['src', 'alt'],
                '*': ['style', 'class'],
                td: ['colspan', 'rowspan'],
                ol: ['start']
              },
              allowedClasses: {
                'p': ['test']
              },
              allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'data']
            },
            labels: {
              'POPULAR_TITLE': 'Most Popular Content',
              'POPULAR_TEXT': 'Frequently answered questions',
              'PUSHPOPULAR_TITLE': 'Maybe you are interested in:',
              'PUSHPOPULAR_TEXT': 'Interesting contents',
              'RESULTS_TITLE': 'Results',
              'RESULTS_TEXT': 'Search results',
              'RESULTS_NOT_FOUND_TITLE': 'No results found',
              'RESULTS_NOT_FOUND_TEXT': "We're sorry, but we couldn't find any answer for your query.",
              'RESULTS_BACK_BUTTON': 'Back',
              'PUSH_TITLE': 'Most Popular Content',
              'PUSH_TEXT': 'Maybe you are interested',
              'CATEGORIES_TITLE': 'Categories',
              'CATEGORIES_SIDEBAR_TITLE': 'Categories',
              'CATEGORIES_BREADCRUMB_BACK_BUTTON': 'Back to categories',
              'CATEGORIES_BACK_BUTTON': 'Back to categories',
              'CATEGORIES_BREADCRUMB_HOME': 'Home',
              'TITLE_CONTENT_LIST': 'Contents',
              'SEARCH_BOX_BUTTON': 'Send',
              'SEARCH_BOX_PLACEHOLDER': 'Search knowledge base...',
              'RELATED_INTRODUCTION': 'Related contents',
              'RATINGS_INTRODUCTION': 'Was this answer helpful?',
              'RATINGS_COMMENT_INTRODUCTION': 'What can be improved?',
              'RATINGS_COMMENT_PLACEHOLDER': '',
              'RATINGS_SUBMIT_COMMENT_BUTTON': 'Send',
              'RATINGS_GRETTINGS_TEXT': 'Thanks for your comment!',
              'REFRESH_INVALID_ACCESS_TOKEN': 'Something went wrong. Please, refresh the page',
              'REFRESH_TITLE': 'Oooops...!',
              'REFRESH_BUTTON': 'Refresh',
              'INSTANTS_TITLE': 'Instant FAQs',
              'LAST_CHANCE_TITLE': 'Last Chance',
              'LAST_CHANCE_CANCEL': 'Cancel',
              'LAST_CHANCE_SUBMIT': 'Submit',
              'RELATED_UQ': 'Related user questions',
              'USER_QUESTIONS': 'User questions',
              'SHOWING_CONTENTS_UQ': 'Contents related to',
              'CATEGORIES_DROPDOWN_TITLE': 'Categories',
              'CATEGORIES_DROPDOWN_PLACEHOLDER': 'Choose category',
              'DIFFERENT_LANGUAGE_DETECTED': 'It seems you are asking a question in a language we did not expect. Please look for the language you need in the menu.'
            }
          };

          // Initialize SDK
          const sdk = window.InbentaKmSDK.createFromDomainKey(domainKey, inbentaKey, config);

          // Generate and setup session first
          const attemptSessionGeneration = (retryCount = 0) => {
            sdk.client.generateSession()
              .then((response: any) => {
                console.log('Session generated successfully:', response.sessionToken);
                
                // Setup session
                sdk.client.setupSession(response.sessionToken);
                
                // Store session for reuse
                sessionStorage.setItem('inbenta_km_session', response.sessionToken);
                
                // Now create components after session is established
                initializeComponents(sdk);
              })
              .catch((sessionError: any) => {
                console.warn(`Session generation failed (attempt ${retryCount + 1}):`, sessionError);
                
                if (retryCount < 2) {
                  // Retry up to 3 times
                  setTimeout(() => attemptSessionGeneration(retryCount + 1), 1000 * (retryCount + 1));
                } else {
                  // After 3 attempts, try to use existing session or continue without
                  const existingSession = sessionStorage.getItem('inbenta_km_session');
                  if (existingSession) {
                    console.log('Using existing session from storage');
                    try {
                      sdk.client.setupSession(existingSession);
                    } catch (setupError) {
                      console.warn('Failed to setup existing session:', setupError);
                    }
                  }
                  
                  // Initialize components anyway (fallback)
                  initializeComponents(sdk);
                }
              });
          };

          // Start session generation
          attemptSessionGeneration();

          const initializeComponents = (sdk: any) => {
            try {
              // Create search box component
              const searchBox = sdk.component('searchBox', searchBoxRef.current, {});

              // Create autocompleter
              const autocompleter = sdk.component('autocompleter', autocompleterRef.current, {});
              autocompleter.linkToSearchBox(searchBox);

              // Create results component
              const results = sdk.component('results', resultsRef.current, {
                contents: {
                  ratings: {
                    elements: [
                      { id: 1, label: 'Yes', comment: false },
                      { id: 2, label: 'No', comment: true }
                    ]
                  }
                }
              });
              results.linkToSearchBox(searchBox);
              results.linkToAutocompleter(autocompleter);

              // Create loader
              const loader = sdk.component('loader', loaderRef.current, {});
              loader.linkTo(results);

              // Create categories component
              sdk.component('categories', categoriesRef.current, {
                categoryId: 0,
                length: 10,
                categoriesGroupLength: 10,
                loadCategoryOnClick: true
              });

              // Create popular content component
              sdk.component('popular', popularRef.current, {});

              // Create push component
              sdk.component('push', pushRef.current, {});

              setIsLoaded(true);
            } catch (componentError) {
              console.error('Failed to initialize components:', componentError);
              setError('Failed to initialize knowledge base components.');
            }
          };
        } catch (error) {
          console.error('Failed to initialize Inbenta Knowledge Base:', error);
          setError('Failed to load knowledge base. Please try refreshing the page.');
        }
      }
    };

    // Load Inbenta KM SDK script
    const loadSDK = () => {
      if (window.InbentaKmSDK) {
        initializeKnowledgeBase();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sdk.inbenta.io/km/2.5.0/inbenta-km-sdk.js';
      script.integrity = 'sha384-h9XuI2YWStxjMz91FBnyhcw9mWWatyG7B1U02xhh+LbSCNYpCg4ShsZRXWS0CUUB';
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        initializeKnowledgeBase();
      };
      script.onerror = () => {
        setError('Failed to load knowledge base SDK.');
      };
      document.head.appendChild(script);
    };

    loadSDK();

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[src*="inbenta-km-sdk"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center p-8">
            <div className="text-red-500 mb-4">
              <FileQuestion className="w-12 h-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Knowledge Base Unavailable</p>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Knowledge Base Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Knowledge Base
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Find answers to frequently asked questions and browse our comprehensive knowledge base
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Search Knowledge Base</span>
            </div>
            <div className="relative">
              <input
                ref={searchBoxRef}
                type="text"
                className="w-full"
                placeholder="Search knowledge base..."
              />
              <div ref={autocompleterRef} className="autocompleter-container" />
            </div>
          </div>

          {/* Loader */}
          <div ref={loaderRef} className="loader-container" />

          {/* Results */}
          <div ref={resultsRef} className="results-container" />
        </CardContent>
      </Card>

      {/* Categories and Popular Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Grid3X3 className="w-5 h-5 text-primary" />
              Categories
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Browse by topic categories
            </p>
          </CardHeader>
          <CardContent>
            <div ref={categoriesRef} className="categories-container" />
          </CardContent>
        </Card>

        {/* Popular Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Popular Content
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Most viewed articles and FAQs
            </p>
          </CardHeader>
          <CardContent>
            <div ref={popularRef} className="popular-container" />
            <div ref={pushRef} className="push-container mt-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KnowledgeBase;
