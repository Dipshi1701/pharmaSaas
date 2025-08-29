import { motion } from 'framer-motion';
 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Microscope, 
  Users, 
  Building2, 
  ShieldCheck, 
  Beaker, 
  FileCheck,
  Globe,
  Clock,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Microscope,
      title: 'Drug Discovery & Development',
      description: 'Advanced research methodologies and cutting-edge technology for discovering new pharmaceutical compounds.',
      features: ['Target Identification', 'Lead Optimization', 'Preclinical Studies', 'Biomarker Analysis'],
      color: 'bg-medical-blue'
    },
    {
      icon: Users,
      title: 'Clinical Trial Management',
      description: 'Comprehensive clinical trial services from Phase I to Phase III with global reach and expertise.',
      features: ['Protocol Design', 'Patient Recruitment', 'Data Management', 'Regulatory Support'],
      color: 'bg-medical-green'
    },
    {
      icon: Building2,
      title: 'Manufacturing Excellence',
      description: 'State-of-the-art pharmaceutical manufacturing with the highest quality standards and compliance.',
      features: ['GMP Manufacturing', 'Quality Control', 'Supply Chain', 'Scale-up Services'],
      color: 'bg-medical-gray'
    },
    {
      icon: ShieldCheck,
      title: 'Regulatory Affairs',
      description: 'Expert regulatory guidance and compliance support for global market approvals.',
      features: ['FDA Submissions', 'EMA Approval', 'Global Registration', 'Compliance Consulting'],
      color: 'bg-primary'
    },
    {
      icon: Beaker,
      title: 'Analytical Services',
      description: 'Comprehensive analytical testing and method development for pharmaceutical products.',
      features: ['Method Development', 'Stability Testing', 'Impurity Analysis', 'Bioanalysis'],
      color: 'bg-accent'
    },
    {
      icon: FileCheck,
      title: 'Quality Assurance',
      description: 'Rigorous quality assurance programs ensuring product safety and efficacy.',
      features: ['Quality Systems', 'Validation Services', 'Audit Support', 'Training Programs'],
      color: 'bg-destructive'
    }
  ];

  const processSteps = [
    { step: 1, title: 'Discovery', description: 'Identify and validate drug targets', icon: Microscope },
    { step: 2, title: 'Development', description: 'Optimize compounds and formulations', icon: Beaker },
    { step: 3, title: 'Clinical', description: 'Conduct human trials and studies', icon: Users },
    { step: 4, title: 'Approval', description: 'Regulatory submission and approval', icon: CheckCircle },
    { step: 5, title: 'Manufacturing', description: 'Scale-up and commercial production', icon: Building2 },
    { step: 6, title: 'Market', description: 'Global distribution and monitoring', icon: Globe }
  ];

  return (
    <div className="min-h-screen">
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
                Our <span className="text-primary">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Comprehensive pharmaceutical solutions from discovery to market, 
                backed by decades of expertise and cutting-edge technology.
              </p>
              <Button size="lg" className="bg-gradient-primary hover:shadow-medium">
                Get Started Today
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Card className="h-full hover:shadow-strong transition-all duration-300 group">
                    <CardHeader>
                      <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-medical-green mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-6 group-hover:border-primary group-hover:text-primary">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20 bg-medical-gray-light">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Process</h2>
              <p className="text-xl text-muted-foreground">From concept to market in six proven steps</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="relative"
                >
                  <Card className="text-center hover:shadow-medium transition-all duration-300">
                    <CardContent className="pt-8">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <Badge className="absolute -top-2 -right-2 bg-medical-blue text-white">
                          {step.step}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Ready to Transform Healthcare?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Partner with us to bring innovative pharmaceutical solutions to market faster and more efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-primary hover:shadow-medium">
                  Start Your Project
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;



