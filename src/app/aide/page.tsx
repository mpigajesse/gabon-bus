'use client';

import { toast } from 'sonner';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  Ticket, 
  CreditCard, 
  UserCircle,
  HelpCircle,
  Bus
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function HelpPage() {
  const faqs = [
    {
      question: "Comment réserver un billet sur GabonBus ?",
      answer: "Pour réserver un billet, rendez-vous sur la page d'accueil, sélectionnez votre ville de départ et de destination, choisissez votre date de voyage et cliquez sur 'Rechercher'. Sélectionnez ensuite le trajet qui vous convient et suivez les étapes de paiement."
    },
    {
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons actuellement les paiements via Airtel Money et Moov Money pour une réservation instantanée. Vous pouvez également payer en espèces dans nos agences physiques."
    },
    {
      question: "Puis-je annuler ou modifier ma réservation ?",
      answer: "Oui, les modifications sont possibles jusqu'à 24 heures avant le départ. Des frais d'annulation de 10% peuvent s'appliquer. Contactez notre support client pour toute demande spécifique."
    },
    {
      question: "Où se trouvent les points d'embarquement ?",
      answer: "Nos points d'embarquement principaux sont situés à la Gare Routière de Libreville et au centre-ville de Ntoum. L'emplacement exact est précisé sur votre billet électronique."
    }
  ];

  const categories = [
    { icon: Ticket, title: "Réservations", description: "Tout savoir sur l'achat et la modification de billets" },
    { icon: CreditCard, title: "Paiements", description: "Aide sur les transactions Mobile Money" },
    { icon: UserCircle, title: "Compte", description: "Gérer votre profil et vos historiques" },
    { icon: HelpCircle, title: "Autres", description: "Questions diverses sur nos services" }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Hero Section */}
      <div className="relative py-24 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523805081446-ed9a768297a0?auto=format&fit=crop&q=80&w=2000" 
            alt="Paysage du Gabon" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md mb-4">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Support Client</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none">
            Centre d'Aide <br />
            <span className="text-primary text-5xl md:text-7xl">GabonBus</span>
          </h1>
          <p className="text-zinc-200 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Trouvez rapidement des réponses à vos questions ou contactez notre équipe support disponible 24/7.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
            <Input 
              placeholder="Comment pouvons-nous vous aider ?" 
              className="pl-12 h-16 bg-white border-zinc-200 text-zinc-950 placeholder:text-zinc-400 rounded-2xl focus:ring-primary shadow-xl"
            />
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 -mt-10">
        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat, i) => (
            <Card key={i} className="border-2 border-zinc-100 hover:border-primary/50 transition-colors cursor-pointer group shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto text-primary group-hover:scale-110 transition-transform">
                  <cat.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 uppercase tracking-wider text-sm">{cat.title}</h3>
                  <p className="text-xs text-zinc-500 mt-2">{cat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Questions Fréquentes</h2>
              <div className="h-1.5 w-20 bg-primary rounded-full"></div>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-2 border-zinc-100 rounded-2xl bg-white px-6">
                  <AccordionTrigger className="hover:no-underline font-bold text-zinc-900 text-left py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-500 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Nous Contacter</h2>
              <div className="h-1.5 w-20 bg-secondary rounded-full"></div>
            </div>

            <div className="bg-white border-2 border-zinc-100 rounded-3xl p-8 space-y-6">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Téléphone</p>
                    <p className="font-bold text-zinc-900">+241 01 00 00 00</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Email</p>
                    <p className="font-bold text-zinc-900">support@gabonbus.ga</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">Horaires</p>
                    <p className="font-bold text-zinc-900">Lun - Sam: 07:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100">
                <Button
                  className="w-full bg-zinc-950 text-white hover:bg-zinc-800 h-14 rounded-2xl font-black uppercase tracking-widest text-xs gap-2"
                  onClick={() => toast.info('Le chat en direct n\'est pas disponible dans la démo.')}
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat en direct
                </Button>
              </div>
            </div>

            <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <h3 className="font-black uppercase tracking-widest text-sm">Urgence ?</h3>
                <p className="text-white/80 text-sm leading-relaxed font-medium">
                  Notre équipe d'intervention est disponible 24/7 pour les problèmes liés à un voyage en cours.
                </p>
                <p className="text-2xl font-black">+241 07 00 00 00</p>
              </div>
              <Bus className="absolute -bottom-10 -right-10 h-40 w-40 text-white/5 group-hover:rotate-12 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
