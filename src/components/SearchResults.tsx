import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Microscope, Building2 } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'research' | 'clinical' | 'manufacturing' | 'company';
  relevance: number;
}

interface SearchResultsProps {
  query: string;
  isVisible: boolean;
}

const SearchResults = ({ query, isVisible }: SearchResultsProps) => {
  // Mock search data - in real app, this would come from an API
  const mockData: SearchResult[] = [
    {
      id: '1',
      title: 'Clinical Trial Management',
      description: 'Comprehensive solutions for managing clinical trials from Phase I to Phase III.',
      category: 'clinical',
      relevance: 95
    },
    {
      id: '2',
      title: 'Drug Discovery Research',
      description: 'Advanced research methodologies for discovering new pharmaceutical compounds.',
      category: 'research',
      relevance: 88
    },
    {
      id: '3',
      title: 'Manufacturing Excellence',
      description: 'State-of-the-art pharmaceutical manufacturing processes and quality control.',
      category: 'manufacturing',
      relevance: 82
    },
    {
      id: '4',
      title: 'Regulatory Compliance',
      description: 'Ensuring compliance with FDA, EMA, and other regulatory bodies worldwide.',
      category: 'company',
      relevance: 78
    },
    {
      id: '5',
      title: 'Biomarker Analysis',
      description: 'Cutting-edge biomarker identification and validation services.',
      category: 'research',
      relevance: 85
    },
    {
      id: '6',
      title: 'Patient Safety Monitoring',
      description: 'Real-time patient safety monitoring throughout clinical development.',
      category: 'clinical',
      relevance: 91
    }
  ];

  const filteredResults = mockData.filter(item =>
    query && (
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    )
  ).sort((a, b) => b.relevance - a.relevance);

  const getCategoryIcon = (category: SearchResult['category']) => {
    switch (category) {
      case 'research':
        return <Microscope className="w-4 h-4" />;
      case 'clinical':
        return <Users className="w-4 h-4" />;
      case 'manufacturing':
        return <Building2 className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: SearchResult['category']) => {
    switch (category) {
      case 'research':
        return 'bg-medical-blue text-white';
      case 'clinical':
        return 'bg-medical-green text-white';
      case 'manufacturing':
        return 'bg-medical-gray text-white';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  if (!isVisible || !query) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-0 right-0 bg-background shadow-strong rounded-lg border mt-2 max-h-96 overflow-y-auto z-50"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Search Results</h3>
          <Badge variant="secondary">
            {filteredResults.length} results for "{query}"
          </Badge>
        </div>
        
        {filteredResults.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No results found for "{query}"</p>
            <p className="text-sm">Try searching for research, clinical, or manufacturing</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResults.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="group"
              >
                <Card className="hover:shadow-medium transition-all duration-300 cursor-pointer border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {result.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant="secondary" 
                          className={getCategoryColor(result.category)}
                        >
                          {getCategoryIcon(result.category)}
                          <span className="ml-1 capitalize">{result.category}</span>
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {result.relevance}% match
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="line-clamp-2">
                      {result.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchResults;