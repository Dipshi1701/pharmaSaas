import { motion } from 'framer-motion';
 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Building,
  Users,
  MessageSquare,
  Send
} from 'lucide-react';

const Contact = () => {
  const offices = [
    {
      name: 'Global Headquarters',
      address: '123 Innovation Drive, San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      email: 'headquarters@pharmacorp.com',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM PST'
    },
    {
      name: 'European Office',
      address: '456 Research Boulevard, London, UK EC1A 1BB',
      phone: '+44 20 7123 4567',
      email: 'europe@pharmacorp.com',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM GMT'
    },
    {
      name: 'Asia Pacific',
      address: '789 Science Park, Singapore 117543',
      phone: '+65 6123 4567',
      email: 'asia@pharmacorp.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM SGT'
    }
  ];

  const contactReasons = [
    'General Inquiry',
    'Partnership Opportunities',
    'Clinical Trial Information',
    'Research Collaboration',
    'Investment Relations',
    'Media Inquiries',
    'Careers',
    'Other'
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
                Contact <span className="text-primary">Us</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get in touch with our team of experts. We're here to help with your pharmaceutical needs 
                and answer any questions you may have.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <MessageSquare className="w-6 h-6 mr-2 text-primary" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Your Company Name" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Contact</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactReasons.map((reason) => (
                            <SelectItem key={reason} value={reason.toLowerCase().replace(/\s+/g, '-')}>\
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                      />
                    </div>
                    
                    <Button className="w-full bg-gradient-primary hover:shadow-medium">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Let's Start a Conversation
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Whether you're interested in partnerships, clinical trials, or research collaborations, 
                    our team is ready to discuss how we can work together to advance healthcare.
                  </p>
                </div>

                {/* Quick Contact Cards */}
                <div className="space-y-4">
                  <Card className="hover:shadow-medium transition-all duration-300">
                    <CardContent className="flex items-center p-6">
                      <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center mr-4">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Call Us</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-medium transition-all duration-300">
                    <CardContent className="flex items-center p-6">
                      <div className="w-12 h-12 bg-medical-green rounded-full flex items-center justify-center mr-4">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Email Us</h3>
                        <p className="text-muted-foreground">contact@pharmacorp.com</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-medium transition-all duration-300">
                    <CardContent className="flex items-center p-6">
                      <div className="w-12 h-12 bg-medical-gray rounded-full flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Visit Us</h3>
                        <p className="text-muted-foreground">123 Innovation Drive, San Francisco</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-20 bg-medical-gray-light">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">Global Offices</h2>
              <p className="text-xl text-muted-foreground">Find us around the world</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {offices.map((office, index) => (
                <motion.div
                  key={office.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <Card className="h-full hover:shadow-strong transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building className="w-5 h-5 mr-2 text-primary" />
                        {office.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-muted-foreground mr-2" />
                        <p className="text-sm text-muted-foreground">{office.phone}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-muted-foreground mr-2" />
                        <p className="text-sm text-muted-foreground">{office.email}</p>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-muted-foreground mr-2" />
                        <p className="text-sm text-muted-foreground">{office.hours}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;



