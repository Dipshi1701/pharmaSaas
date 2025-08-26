import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Microscope, 
  Dna, 
  Brain, 
  Heart, 
  ShieldPlus,
  FlaskConical,
  TrendingUp,
  FileText,
  Award
} from 'lucide-react';

const Research = () => {
  const researchAreas = [
    {
      icon: Heart,
      title: 'Cardiovascular',
      description: 'Innovative treatments for heart disease and circulatory disorders',
      projects: 12,
      color: 'bg-red-500'
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Breakthrough therapies for neurological and psychiatric conditions',
      projects: 8,
      color: 'bg-purple-500'
    },
    {
      icon: ShieldPlus,
      title: 'Immunology',
      description: 'Advanced immunotherapies and autoimmune disease treatments',
      projects: 15,
      color: 'bg-medical-green'
    },
    {
      icon: Dna,
      title: 'Oncology',
      description: 'Cutting-edge cancer treatments and precision medicine',
      projects: 20,
      color: 'bg-medical-blue'
    }
  ];

  const publications = [
    {
      title: 'Novel Biomarkers in Alzheimer\'s Disease Progression',
      journal: 'Nature Medicine',
      year: '2023',
      impact: '9.2',
      type: 'Research Article'
    },
    {
      title: 'Immunotherapy Combinations in Metastatic Cancer',
      journal: 'The Lancet Oncology',
      year: '2023',
      impact: '8.8',
      type: 'Clinical Trial'
    },
    {
      title: 'Cardiovascular Safety of New Drug Compounds',
      journal: 'Circulation',
      year: '2023',
      impact: '7.9',
      type: 'Safety Study'
    },
    {
      title: 'AI-Driven Drug Discovery Methodologies',
      journal: 'Science Translational Medicine',
      year: '2022',
      impact: '8.1',
      type: 'Methodology'
    }
  ];

  const pipeline = [
    {
      name: 'PC-101',
      indication: 'Type 2 Diabetes',
      phase: 'Phase III',
      patients: 2400,
      completion: '2024 Q2',
      status: 'On Track'
    },
    {
      name: 'PC-205',
      indication: 'Alzheimer\'s Disease',
      phase: 'Phase II',
      patients: 800,
      completion: '2024 Q4',
      status: 'Recruiting'
    },
    {
      name: 'PC-310',
      indication: 'Breast Cancer',
      phase: 'Phase I',
      patients: 120,
      completion: '2025 Q1',
      status: 'Active'
    },
    {
      name: 'PC-412',
      indication: 'Rheumatoid Arthritis',
      phase: 'Preclinical',
      patients: 0,
      completion: '2025 Q3',
      status: 'Planning'
    }
  ];

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase III': return 'bg-medical-green text-white';
      case 'Phase II': return 'bg-medical-blue text-white';
      case 'Phase I': return 'bg-yellow-500 text-white';
      case 'Preclinical': return 'bg-medical-gray text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Recruiting': return 'bg-blue-100 text-blue-800';
      case 'Active': return 'bg-orange-100 text-orange-800';
      case 'Planning': return 'bg-gray-100 text-gray-800';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Research & <span className="text-primary">Development</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Pioneering the future of medicine through innovative research, 
                cutting-edge technology, and breakthrough discoveries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-primary hover:shadow-medium">
                  View Our Pipeline
                </Button>
                <Button variant="outline" size="lg">
                  Research Partnerships
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Research Focus Areas</h2>
              <p className="text-xl text-muted-foreground">Leading innovation across multiple therapeutic areas</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Card className="h-full hover:shadow-strong transition-all duration-300 group">
                    <CardContent className="pt-6 text-center">
                      <div className={`w-16 h-16 ${area.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <area.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                      <Badge variant="secondary">
                        {area.projects} Active Projects
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Tabs */}
        <section className="py-20 bg-medical-gray-light">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="pipeline" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pipeline">Drug Pipeline</TabsTrigger>
                <TabsTrigger value="publications">Publications</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
              </TabsList>

              <TabsContent value="pipeline" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FlaskConical className="w-6 h-6 mr-2 text-primary" />
                        Development Pipeline
                      </CardTitle>
                      <CardDescription>
                        Our current portfolio of investigational compounds in development
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pipeline.map((drug, index) => (
                          <motion.div
                            key={drug.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border rounded-lg p-4 hover:shadow-medium transition-all duration-300"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                              <div>
                                <h4 className="font-semibold text-lg">{drug.name}</h4>
                                <p className="text-sm text-muted-foreground">{drug.indication}</p>
                              </div>
                              <div className="text-center">
                                <Badge className={getPhaseColor(drug.phase)}>
                                  {drug.phase}
                                </Badge>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-semibold">{drug.patients}</div>
                                <div className="text-xs text-muted-foreground">Patients</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-medium">{drug.completion}</div>
                                <div className="text-xs text-muted-foreground">Est. Completion</div>
                              </div>
                              <div className="text-center">
                                <Badge variant="secondary" className={getStatusColor(drug.status)}>
                                  {drug.status}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="publications" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <FileText className="w-6 h-6 mr-2 text-primary" />
                        Recent Publications
                      </CardTitle>
                      <CardDescription>
                        Our latest peer-reviewed research publications and clinical studies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {publications.map((pub, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border rounded-lg p-4 hover:shadow-medium transition-all duration-300"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-lg flex-1">{pub.title}</h4>
                              <Badge variant="outline">{pub.type}</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-primary">{pub.journal}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Year: </span>
                                <span className="font-medium">{pub.year}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Impact Factor: </span>
                                <span className="font-medium">{pub.impact}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="technology" className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Brain className="w-6 h-6 mr-2 text-primary" />
                        AI & Machine Learning
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Leveraging artificial intelligence to accelerate drug discovery and development processes.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Award className="w-4 h-4 text-medical-green mr-2" />
                          Predictive modeling for drug efficacy
                        </li>
                        <li className="flex items-center">
                          <Award className="w-4 h-4 text-medical-green mr-2" />
                          Automated compound screening
                        </li>
                        <li className="flex items-center">
                          <Award className="w-4 h-4 text-medical-green mr-2" />
                          Clinical trial optimization
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                        Advanced Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">
                        Sophisticated data analytics platforms for comprehensive research insights and decision-making.
                      </CardDescription>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Award className="w-4 h-4 text-medical-green mr-2" />
                          Real-world evidence analysis
                        </li>
                        <li className="flex items-center">
                          <Award className="w-4 h-4 text-medical-green mr-2" />
                          Biomarker discovery platforms
                        </li>
                        <li className="flex items-center">
                          <Award className="w-4 h-4 text-medical-green mr-2" />
                          Precision medicine algorithms
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Research;