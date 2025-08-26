import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Years of Experience', value: '25+', icon: Award },
    { label: 'Global Offices', value: '15', icon: Globe },
    { label: 'Team Members', value: '2,500+', icon: Users },
    { label: 'Success Rate', value: '98%', icon: TrendingUp },
  ];

  const timeline = [
    { year: '1998', title: 'Company Founded', description: 'Started as a small biotech research firm' },
    { year: '2005', title: 'First FDA Approval', description: 'Our first drug received FDA approval' },
    { year: '2012', title: 'Global Expansion', description: 'Opened offices in Europe and Asia' },
    { year: '2018', title: 'Digital Transformation', description: 'Implemented AI-driven drug discovery' },
    { year: '2023', title: 'Sustainability Focus', description: 'Carbon-neutral manufacturing achieved' },
  ];

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
                About <span className="text-primary">PharmaSaas</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Leading the future of pharmaceutical innovation with cutting-edge research, 
                clinical excellence, and manufacturing expertise spanning over two decades.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Card className="text-center hover:shadow-medium transition-all duration-300">
                    <CardContent className="pt-6">
                      <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                      <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-medical-gray-light">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <Badge className="w-fit mb-4 bg-medical-blue text-white">Mission</Badge>
                    <CardTitle className="text-2xl">Our Purpose</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      To transform lives through innovative pharmaceutical solutions, advancing 
                      medical science while maintaining the highest standards of safety, efficacy, 
                      and accessibility for patients worldwide.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <Badge className="w-fit mb-4 bg-medical-green text-white">Vision</Badge>
                    <CardTitle className="text-2xl">Our Future</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      To be the world's most trusted pharmaceutical company, pioneering 
                      breakthrough treatments that address unmet medical needs and creating 
                      a healthier future for generations to come.
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Journey</h2>
              <p className="text-xl text-muted-foreground">Key milestones in our growth and innovation</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className="flex items-start mb-12 last:mb-0"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.4 }}
                >
                  <div className="flex-shrink-0 w-24 text-right mr-8">
                    <Badge variant="outline" className="text-primary border-primary">
                      {item.year}
                    </Badge>
                  </div>
                  <div className="flex-grow">
                    <Card className="hover:shadow-medium transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;