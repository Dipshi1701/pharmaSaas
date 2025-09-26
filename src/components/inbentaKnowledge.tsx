import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, BookOpen, Users } from "lucide-react";
import "./inbentaKnowledge.css";

// Extend Window interface to include both Inbenta SDKs
declare global {
  interface Window {
    InbentaKmSDK: any; // Knowledge SDK
    InbentaSearchSDK: any; // Search SDK
  }
}

interface InbentaKnowledgeProps {
  domainKey?: string;
  inbentaKey?: string;
  className?: string;
}

const InbentaKnowledge = ({
  domainKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcm9qZWN0IjoiZ3NrX2NzaGRfZGVtb19rYl8zMzI2X2ttX2VuIiwiZG9tYWluX2tleV9pZCI6IkJoam1IZ19JdzZFRWxVU0JvX0pUcHc6OiJ9.G5xfRhO5knbgmD7gh4yt-s2tUT9wK-D0Qy7OGM_fG8PnT0tU0S9Xh2AUwuMv4eNVT2ARFJonJCoZZT_eIDzzyA",
  inbentaKey = "BhiVmPg0dhpVX0rVqQiyoA2EmBykU7bBny2M8skgoPk=",
  className = "",
}: InbentaKnowledgeProps) => {
  const sdkRef = useRef<any>(null);
  const isInitialized = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeInbentaSDK = () => {
      // Check if SDK is available and not already initialized
      if (!window.InbentaKmSDK || isInitialized.current) {
        return;
      }

      try {
        const config = {
          userType: 0,
          skin: false,
          environment: "development",
          results: {
            showBackButton: false,
            showLoader: true,
            length: 5,
            contents: {
              showRelated: true,
            },
          },
          sanitizeOptions: {
            allowedTags: [
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "blockquote",
              "p",
              "a",
              "ul",
              "ol",
              "nl",
              "li",
              "b",
              "i",
              "u",
              "strong",
              "em",
              "strike",
              "code",
              "hr",
              "br",
              "div",
              "table",
              "thead",
              "caption",
              "tbody",
              "tr",
              "th",
              "td",
              "pre",
              "img",
              "s",
              "figure",
              "span",
              "mark",
              "iframe",
            ],
            allowedAttributes: {
              a: ["href", "name", "target"],
              iframe: ["src"],
              img: ["src", "alt"],
              "*": ["style", "class"],
              td: ["colspan", "rowspan"],
              ol: ["start"],
            },
            allowedClasses: {
              p: ["test"],
            },
            allowedSchemes: ["http", "https", "ftp", "mailto", "data"],
          },
          labels: {
            POPULAR_TITLE: "Most Popular Content",
            POPULAR_TEXT: "Frequently answered questions",
            PUSHPOPULAR_TITLE: "Maybe you are interested in:",
            PUSHPOPULAR_TEXT: "Interesting contents",
            RESULTS_TITLE: "Results",
            RESULTS_TEXT: "Search results",
            RESULTS_NOT_FOUND_TITLE: "No results found",
            RESULTS_NOT_FOUND_TEXT:
              "We're sorry, but we couldn't find any answer for your query.",
            RESULTS_BACK_BUTTON: "Back",
            PUSH_TITLE: "Most Popular Content",
            PUSH_TEXT: "Maybe you are interested",
            CATEGORIES_TITLE: "Categories",
            CATEGORIES_SIDEBAR_TITLE: "Categories",
            CATEGORIES_BREADCRUMB_BACK_BUTTON: "Back to categories",
            CATEGORIES_BACK_BUTTON: "Back to categories",
            CATEGORIES_BREADCRUMB_HOME: "Home",
            TITLE_CONTENT_LIST: "Contents",
            SEARCH_BOX_BUTTON: "Send",
            SEARCH_BOX_PLACEHOLDER: "Type your question here...",
            RELATED_INTRODUCTION: "Related contents",
            RATINGS_INTRODUCTION: "Was this answer helpful?",
            RATINGS_COMMENT_INTRODUCTION: "What can be improved?",
            RATINGS_COMMENT_PLACEHOLDER: "",
            RATINGS_SUBMIT_COMMENT_BUTTON: "Send",
            RATINGS_GRETTINGS_TEXT: "Thanks for your comment!",
            REFRESH_INVALID_ACCESS_TOKEN:
              "Something went wrong. Please, refresh the page",
            REFRESH_TITLE: "Oooops...!",
            REFRESH_BUTTON: "Refresh",
            INSTANTS_TITLE: "Instants Faqs",
            LAST_CHANCE_TITLE: "Last Chance",
            LAST_CHANCE_CANCEL: "Cancel",
            LAST_CHANCE_SUBMIT: "Submit",
            RELATED_UQ: "Related user questions",
            USER_QUESTIONS: "User questions",
            SHOWING_CONTENTS_UQ: "Contents related to",
            CATEGORIES_DROPDOWN_TITLE: "Categories",
            CATEGORIES_DROPDOWN_PLACEHOLDER: "Choose category",
            DIFFERENT_LANGUAGE_DETECTED:
              "It seems you are asking a question in a language we did not expect. Please look for the language you need in the menu.",
          },
        };

        // Initialize SDK
        sdkRef.current = window.InbentaKmSDK.createFromDomainKey(
          domainKey,
          inbentaKey,
          config
        );

        // Initialize components with error handling
        const initializeComponents = () => {
          try {
            // Display Search Box
            const searchBox = sdkRef.current.component(
              "searchBox",
              "#inbenta-searchbox",
              {}
            );

            // Add autocompleter
            const autocompleter = sdkRef.current.component(
              "autocompleter",
              "#inbenta-autocompleter",
              {}
            );
            autocompleter.linkToSearchBox(searchBox);

            // Add results
            const results = sdkRef.current.component(
              "results",
              "#inbenta-results",
              {
                contents: {
                  ratings: {
                    elements: [
                      { id: 1, label: "Yes", comment: false },
                      { id: 2, label: "No", comment: true },
                    ],
                  },
                },
              }
            );
            results.linkToSearchBox(searchBox);
            results.linkToAutocompleter(autocompleter);

            // Add loader with better control
            const loader = sdkRef.current.component(
              "loader",
              "#inbenta-loader",
              {}
            );
            loader.linkTo(results);

            // Set up search event handlers with React state and deflection
            setTimeout(() => {
              const searchBoxElement = document.querySelector(
                "#inbenta-searchbox input"
              ) as HTMLInputElement;
              if (searchBoxElement) {
                // Show loader when search starts
                searchBoxElement.addEventListener("input", (e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.value.length > 2) {
                    setIsLoading(true);
                    // Deflection: Show suggestions automatically
                    console.log(
                      "Deflection: Searching for relevant content for:",
                      target.value
                    );
                  } else {
                    setIsLoading(false);
                  }
                });

                // Hide loader after results load
                searchBoxElement.addEventListener("keydown", (e) => {
                  if (e.key === "Enter") {
                    setTimeout(() => setIsLoading(false), 2000);
                  }
                });

                // Deflection: Focus event to show popular content
                searchBoxElement.addEventListener("focus", () => {
                  console.log(
                    "Deflection: User focused on search - showing popular content"
                  );
                });
              }

              // Monitor for search completion by watching results container
              const resultsContainer =
                document.getElementById("inbenta-results");
              if (resultsContainer) {
                const observer = new MutationObserver(() => {
                  // Hide loader when results are populated
                  if (resultsContainer.children.length > 0) {
                    setIsLoading(false);
                  }
                });
                observer.observe(resultsContainer, {
                  childList: true,
                  subtree: true,
                });
              }
            }, 500);

            // Add popular content
            sdkRef.current.component("popular", "#inbenta-popular", {});

            // Add push content
            sdkRef.current.component("push", "#inbenta-push", {});

            // Add categories
            sdkRef.current.component("categories", "#inbenta-categories", {
              categoryId: 0,
              length: 10,
              categoriesGroupLength: 10,
              loadCategoryOnClick: true,
            });

            isInitialized.current = true;
            console.log("Inbenta Knowledge SDK initialized successfully");
          } catch (error) {
            console.error("Error initializing Inbenta components:", error);
          }
        };

        // Small delay to ensure DOM elements are available
        setTimeout(initializeComponents, 100);
      } catch (error) {
        console.error("Error initializing Inbenta SDK:", error);
      }
    };

    // Initialize immediately if SDK is available
    if (window.InbentaKmSDK) {
      initializeInbentaSDK();
    } else {
      // Wait for SDK to load
      const checkSDK = setInterval(() => {
        if (window.InbentaKmSDK) {
          clearInterval(checkSDK);
          initializeInbentaSDK();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      setTimeout(() => clearInterval(checkSDK), 10000);
    }

    // Cleanup function
    return () => {
      if (sdkRef.current) {
        try {
          // Cleanup SDK resources if available
          sdkRef.current = null;
          isInitialized.current = false;
        } catch (error) {
          console.error("Error cleaning up Inbenta SDK:", error);
        }
      }
    };
  }, [domainKey, inbentaKey]);

  return (
    <div
      className={`inbenta-knowledge-container ${className}`}
      style={{
        fontFamily: "inherit",
        color: "inherit",
      }}
    >
      {/* Knowledge Base - Matching KnowledgeSearch UI */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Knowledge Search
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Type your question below. Suggestions appear as you type.
          </p>
        </CardHeader>
        <CardContent className="w-full">
          {/* Search Box - Exactly like KnowledgeSearch */}
          <div className="flex gap-2 mb-6">
            <div
              id="inbenta-searchbox"
              className="flex-1"
              style={{ width: "100%" }}
            />
          </div>

          {/* Loader */}
          <div
            id="inbenta-loader"
            className="loader-container"
            style={{ display: isLoading ? "flex" : "none" }}
          ></div>
        </CardContent>
      </Card>

      {/* Search Results - Full Width */}
      <Card className="mb-8 shadow-medium border-primary/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-bold">
            <BookOpen className="w-6 h-6 mr-3 text-primary" />
            Search Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            id="inbenta-results"
            className="results-container min-h-[120px]"
          ></div>
          <div id="inbenta-push" className="push-container mt-6"></div>
        </CardContent>
      </Card>

      {/* Categories and Popular Content - Side by Side */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Browse Categories */}
        <Card className="shadow-medium border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl font-bold">
              <Users className="w-6 h-6 mr-3 text-primary" />
              Browse Categories
            </CardTitle>
            <CardDescription>
              Explore topics organized by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              id="inbenta-categories"
              className="categories-container min-h-[200px]"
            ></div>
          </CardContent>
        </Card>

        {/* Popular Content */}
        <Card className="shadow-medium border-primary/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl font-bold">
              <HelpCircle className="w-6 h-6 mr-3 text-primary" />
              Popular Content
            </CardTitle>
            <CardDescription>Most frequently accessed content</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              id="inbenta-popular"
              className="popular-container min-h-[200px]"
            ></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InbentaKnowledge;
