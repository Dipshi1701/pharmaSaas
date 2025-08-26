import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import researchIcon from '@/assets/research-icon.png';
import manufacturingIcon from '@/assets/manufacturing-icon.png';
import clinicalIcon from '@/assets/clinical-icon.png';

const Services = () => {
  const services = [
    {
      icon: researchIcon,
      title: 'Drug Research & Development',
      description: 'Cutting-edge pharmaceutical research with advanced molecular analysis and innovative drug discovery processes.',
      features: ['Molecular Analysis', 'Drug Discovery', 'Patent Research', 'Clinical Testing']
    },
    {
      icon: manufacturingIcon,
      title: 'Manufacturing Excellence',
      description: 'State-of-the-art pharmaceutical manufacturing facilities with stringent quality control and compliance standards.',
      features: ['GMP Compliance', 'Quality Control', 'Scale Production', 'Supply Chain']
    },
    {
      icon: clinicalIcon,
      title: 'Clinical Trials',
      description: 'Comprehensive clinical trial management with regulatory compliance and patient safety as our top priorities.',
      features: ['Phase I-III Trials', 'Regulatory Compliance', 'Patient Safety', 'Data Analysis']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Core Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive pharmaceutical solutions from research and development to manufacturing 
            and clinical trials, all delivered with the highest standards of quality and innovation.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-gradient-card hover:shadow-medium transition-all duration-500 border-0 group">
                <CardContent className="p-8">
                  <motion.div 
                    className="w-16 h-16 mb-6 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <img 
                      src={service.icon} 
                      alt={`${service.title} icon`}
                      className="w-10 h-10"
                    />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;