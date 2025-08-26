import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, Globe, Beaker } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Award,
      number: '150+',
      label: 'Awards Won',
      description: 'Industry recognition for excellence'
    },
    {
      icon: Users,
      number: '5000+',
      label: 'Expert Team',
      description: 'World-class scientists and researchers'
    },
    {
      icon: Globe,
      number: '50+',
      label: 'Global Presence',
      description: 'Countries we serve worldwide'
    },
    {
      icon: Beaker,
      number: '1000+',
      label: 'Research Projects',
      description: 'Completed successfully'
    }
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.h2 
                className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Pioneering the Future of
                <span className="text-primary block">Healthcare</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                For over 25 years, PharmaCorp has been at the forefront of pharmaceutical innovation, 
                developing life-changing medicines that improve patient outcomes worldwide. Our commitment 
                to scientific excellence and patient care drives everything we do.
              </motion.p>
            </div>

            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">Advanced Research Facilities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">FDA Approved Manufacturing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">Global Distribution Network</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-foreground font-medium">Sustainability Commitment</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-gradient-card hover:shadow-medium transition-all duration-300 border-0 h-full">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <achievement.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    
                    <motion.div 
                      className="text-3xl font-bold text-primary mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {achievement.number}
                    </motion.div>
                    
                    <div className="text-sm font-semibold text-foreground mb-1">
                      {achievement.label}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {achievement.description}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;