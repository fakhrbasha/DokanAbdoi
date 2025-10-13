import { MapPin, Phone, Clock, Star } from 'lucide-react';
import { Navbar } from '../components/navbar';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';

const shops = [
  {
    id: '1',
    name: 'Dokan Abddelazez - Downtown',
    address: '123 Main Street, Downtown',
    phone: '+1 (555) 123-4567',
    hours: 'Mon-Sat: 9AM-9PM, Sun: 10AM-6PM',
    rating: 4.8,
    reviews: 234,
    image: '/modern-electronics-store.png',
  },
  {
    id: '2',
    name: 'Dokan Abddelazez - Mall Location',
    address: '456 Shopping Mall, 2nd Floor',
    phone: '+1 (555) 234-5678',
    hours: 'Mon-Sun: 10AM-10PM',
    rating: 4.7,
    reviews: 189,
    image: '/shopping-mall-store.jpg',
  },
  {
    id: '3',
    name: 'Dokan Abddelazez - North Branch',
    address: '789 North Avenue, Suite 100',
    phone: '+1 (555) 345-6789',
    hours: 'Mon-Sat: 9AM-8PM, Sun: Closed',
    rating: 4.9,
    reviews: 312,
    image: '/retail-storefront.png',
  },
  {
    id: '4',
    name: 'Dokan Abddelazez - East Side',
    address: '321 East Boulevard',
    phone: '+1 (555) 456-7890',
    hours: 'Mon-Sat: 8AM-9PM, Sun: 10AM-6PM',
    rating: 4.6,
    reviews: 156,
    image: '/modern-shop-interior.jpg',
  },
];

export default function ShopsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Our Store Locations</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visit us at any of our convenient locations
            </p>
          </div>
        </section>

        {/* Shops Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {shops.map((shop) => {
              return (
                <Card
                  key={shop.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={shop.image || '/placeholder.svg'}
                      alt={shop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{shop.name}</h3>
                        <div className="flex items-center gap-1 mb-3">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="font-semibold">{shop.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({shop.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{shop.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                        <p className="text-muted-foreground">{shop.phone}</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">{shop.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-3">
                    <Button className="flex-1">Get Directions</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Call Now
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Find Us on the Map
            </h2>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img
                src="/store-locations-map.jpg"
                alt="Store locations map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
