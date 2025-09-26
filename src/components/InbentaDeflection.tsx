import { useEffect, useRef } from 'react';

// Extend Window interface for Inbenta SDK
declare global {
  interface Window {
    InbentaKmSDK: any;
  }
}

interface InbentaDeflectionProps {
  domainKey?: string;
  apiKey?: string;
  subjectInputId?: string;
  messageInputId?: string;
  formId?: string;
  instantsContainerId?: string;
  lastChanceContainerId?: string;
}

const InbentaDeflection = ({
  domainKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiZ3NrX2NzaGRfZGVtb19rYl8zMzI2X2ttX2VuIiwiZG9tYWluX2tleV9pZCI6IkJoam1Ib3hsNS1GazVMMVFTQ2RONFE6OiJ9.isJ5_fUPTc-dj6UQjlSlhDy6GLHrp6V7bRpJ2whRUMgmO4MSj8Iu0M_mOSfy0sN3alxj9LwM1dYQgDdwPyRFxw",
  apiKey = "BhiVmPjh79Y1xfTY8drKzQuncLKUVxgWIv/2gLH1deU=",
  subjectInputId = "subject",
  messageInputId = "message", 
  formId = "contact-form-1234",
  instantsContainerId = "instants",
  lastChanceContainerId = "last-chance"
}: InbentaDeflectionProps) => {
  const sdkRef = useRef<any>(null);
  const deflectionRef = useRef<any>(null);
  const lastChanceRef = useRef<any>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const initializeDeflection = () => {
      if (!window.InbentaKmSDK || isInitialized.current) {
        return;
      }

      try {
        // Configuration for deflection components
        const config = {
          userType: 0,
          skin: false,
          lang: "en",
          environment: "development",
          labels: {
            INSTANTS_TITLE: 'This might interest you',
            LAST_CHANCE_TITLE: 'Before you submit...',
            LAST_CHANCE_CANCEL: 'Cancel',
            LAST_CHANCE_SUBMIT: 'Submit Anyway',
          },
        };

        // Initialize SDK
        sdkRef.current = window.InbentaKmSDK.createFromDomainKey(
          domainKey,
          apiKey,
          config
        );

        // Initialize deflection component
        deflectionRef.current = sdkRef.current.component(
          'deflection',
          `#${instantsContainerId}`
        );

        // Initialize last chance component  
        lastChanceRef.current = sdkRef.current.component(
          'lastChance',
          `#${lastChanceContainerId}`,
          {}
        );

        // Wait for DOM elements to be available
        setTimeout(() => {
          const subjectInput = document.getElementById(subjectInputId);
          const messageInput = document.getElementById(messageInputId);
          const contactForm = document.getElementById(formId);
          const instantsContainer = document.getElementById(instantsContainerId);

          if (subjectInput && deflectionRef.current) {
            // Link deflection to subject input
            deflectionRef.current.linkToInput(subjectInput);
            console.log('Deflection linked to subject input');
          }

          if (messageInput && deflectionRef.current) {
            // Link deflection to message input  
            deflectionRef.current.linkToInput(messageInput);
            console.log('Deflection linked to message input');
          }

          if (messageInput && lastChanceRef.current) {
            // Link last chance to message input
            lastChanceRef.current.linkToInput(messageInput);
            console.log('Last chance linked to message input');
          }

          // Add form submission handler for last chance
          if (contactForm && lastChanceRef.current) {
            contactForm.addEventListener('submit', function(event) {
              event.preventDefault();
              console.log('Form submission intercepted - showing last chance');
              lastChanceRef.current.show();
              return false;
            });
          }

          // Add input event listeners to show/hide deflection suggestions
          const handleInputChange = (element: HTMLInputElement, container: HTMLElement) => {
            element.addEventListener('input', (e) => {
              const target = e.target as HTMLInputElement;
              if (target.value.length > 2) {
                // Show deflection container when user types
                container.classList.remove('hidden');
                console.log(`Showing deflection suggestions for: "${target.value}"`);
              } else {
                // Hide when input is too short
                container.classList.add('hidden');
              }
            });

            element.addEventListener('focus', () => {
              if (element.value.length > 2) {
                container.classList.remove('hidden');
              }
            });
          };

          if (subjectInput && instantsContainer) {
            handleInputChange(subjectInput as HTMLInputElement, instantsContainer);
          }

          if (messageInput && instantsContainer) {
            handleInputChange(messageInput as HTMLInputElement, instantsContainer);
          }

        }, 500);

        isInitialized.current = true;
        console.log('Inbenta Deflection initialized successfully');

      } catch (error) {
        console.error('Error initializing Inbenta Deflection:', error);
      }
    };

    // Initialize if SDK is already loaded
    if (window.InbentaKmSDK) {
      initializeDeflection();
    } else {
      // Wait for SDK to load
      const checkSDK = setInterval(() => {
        if (window.InbentaKmSDK) {
          clearInterval(checkSDK);
          initializeDeflection();
        }
      }, 100);

      // Cleanup after 10 seconds
      setTimeout(() => clearInterval(checkSDK), 10000);
    }

    // Cleanup function
    return () => {
      if (sdkRef.current) {
        sdkRef.current = null;
        deflectionRef.current = null;
        lastChanceRef.current = null;
        isInitialized.current = false;
      }
    };
  }, [domainKey, apiKey, subjectInputId, messageInputId, formId, instantsContainerId, lastChanceContainerId]);

  // Component doesn't render anything - it's just for initialization
  return null;
};

export default InbentaDeflection;
