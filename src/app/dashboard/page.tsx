'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Ticket, 
  TrendingUp, 
  Bus, 
  Plus, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Calendar
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  // Mock data for dashboard
  const stats = [
    { name: 'Passagers aujourd\'hui', value: '42', change: '+12%', icon: Users, color: 'text-blue-600' },
    { name: 'Billets vendus', value: '1,284', change: '+5.2%', icon: Ticket, color: 'text-green-600' },
    { name: 'Revenus (FCFA)', value: '6,420,000', change: '+8.4%', icon: TrendingUp, color: 'text-primary' },
    { name: 'Trajets actifs', value: '12', change: '0%', icon: Bus, color: 'text-purple-600' },
  ];

  const recentReservations = [
    { id: 'BK-7214', customer: 'Marlène Ogoula', trip: 'LBV → NTOUM', date: 'Aujourd\'hui, 08:00', status: 'Confirmé', amount: '5,000 FCFA' },
    { id: 'BK-7213', customer: 'Jean-Pierre Mba', trip: 'NTOUM → LBV', date: 'Aujourd\'hui, 14:30', status: 'Confirmé', amount: '5,000 FCFA' },
    { id: 'BK-7212', customer: 'Alice Ndong', trip: 'LBV → NTOUM', date: 'Demain, 10:00', status: 'En attente', amount: '4,500 FCFA' },
    { id: 'BK-7211', customer: 'Paul Biyoghe', trip: 'LBV → NTOUM', date: 'Hier, 16:00', status: 'Confirmé', amount: '5,000 FCFA' },
    { id: 'BK-7210', customer: 'Sandrine Meye', trip: 'NTOUM → LBV', date: 'Hier, 09:30', status: 'Annulé', amount: '5,000 FCFA' },
  ];

  return (
    <div className="container px-4 py-8 md:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord Admin</h1>
          <p className="text-zinc-500">Gérez vos trajets et visualisez vos réservations en temps réel.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Rapport PDF
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau trajet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs flex items-center gap-1 mt-1 font-medium">
                {stat.change.startsWith('+') ? (
                  <>
                    <ArrowUpRight className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">{stat.change}</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="h-3 w-3 text-red-600" />
                    <span className="text-red-600">{stat.change}</span>
                  </>
                )}
                <span className="text-zinc-400 font-normal ml-1">vs mois dernier</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Réservations récentes</CardTitle>
              <CardDescription>Les 5 dernières transactions sur la plateforme.</CardDescription>
            </div>
            <Button variant="ghost" size="sm">Tout voir</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Trajet</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReservations.map((res) => (
                  <TableRow key={res.id}>
                    <TableCell>
                      <div className="font-medium">{res.customer}</div>
                      <div className="text-[10px] text-zinc-400 md:hidden">{res.trip} • {res.date}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs font-semibold">{res.trip}</TableCell>
                    <TableCell className="hidden md:table-cell text-xs text-zinc-500">{res.date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          res.status === 'Confirmé' ? 'default' : 
                          res.status === 'En attente' ? 'outline' : 'destructive'
                        }
                        className="text-[10px] uppercase font-bold px-1.5 py-0"
                      >
                        {res.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-bold text-xs">{res.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Outils de gestion transporteur.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Bus className="h-5 w-5 text-primary" />
                <span>Gérer les véhicules</span>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Ticket className="h-5 w-5 text-primary" />
                <span>Scanner un billet (QR)</span>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Users className="h-5 w-5 text-primary" />
                <span>Liste d'embarquement</span>
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Support Transporteur</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Besoin d'aide pour configurer vos nouveaux trajets ? Contactez notre équipe support dédiée aux partenaires.
              </p>
              <Button className="w-full">Contacter GabonBus</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
