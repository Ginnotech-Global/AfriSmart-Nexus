import { useState } from "react";
import { ShoppingCart, User, MessageSquare, Filter, MapPin, Search, Plus, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: string;
  name: string;
  category: "produce" | "inputs" | "equipment";
  price: number;
  unit: string;
  quantity: number;
  seller: {
    name: string;
    location: string;
    rating: number;
    phone: string;
  };
  image: string;
  description: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  experience: number;
  services: string[];
  hourlyRate: number;
  phone: string;
  available: boolean;
}

export const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Mock data
  const products: Product[] = [
    {
      id: "1",
      name: "Fresh Tomatoes",
      category: "produce",
      price: 800,
      unit: "per basket",
      quantity: 50,
      seller: {
        name: "Amina Hassan",
        location: "Kano State",
        rating: 4.8,
        phone: "+234 803 123 4567"
      },
      image: "/placeholder.svg",
      description: "Fresh, organic tomatoes from our farm. Perfect for cooking and processing."
    },
    {
      id: "2",
      name: "NPK Fertilizer 15-15-15",
      category: "inputs",
      price: 12000,
      unit: "per 50kg bag",
      quantity: 100,
      seller: {
        name: "Agro Supplies Ltd",
        location: "Lagos State",
        rating: 4.5,
        phone: "+234 809 876 5432"
      },
      image: "/placeholder.svg",
      description: "High-quality NPK fertilizer for improved crop yield and soil fertility."
    },
    {
      id: "3",
      name: "Water Pump System",
      category: "equipment",
      price: 85000,
      unit: "per unit",
      quantity: 5,
      seller: {
        name: "Farm Equipment Nigeria",
        location: "Ogun State",
        rating: 4.7,
        phone: "+234 701 234 5678"
      },
      image: "/placeholder.svg",
      description: "Reliable water pump system for irrigation. 1 year warranty included."
    }
  ];

  const serviceProviders: ServiceProvider[] = [
    {
      id: "1",
      name: "Dr. Ibrahim Musa",
      specialization: "Crop Protection Specialist",
      location: "Kaduna State",
      rating: 4.9,
      experience: 15,
      services: ["Pest Control", "Disease Diagnosis", "Soil Testing", "Crop Consultation"],
      hourlyRate: 5000,
      phone: "+234 802 345 6789",
      available: true
    },
    {
      id: "2",
      name: "Mrs. Grace Okafor",
      specialization: "Organic Farming Expert",
      location: "Enugu State",
      rating: 4.6,
      experience: 12,
      services: ["Organic Certification", "Composting", "Natural Pest Control", "Training"],
      hourlyRate: 4500,
      phone: "+234 803 456 7890",
      available: true
    },
    {
      id: "3",
      name: "Engr. Usman Ali",
      specialization: "Irrigation Systems",
      location: "Kano State",
      rating: 4.8,
      experience: 10,
      services: ["Drip Irrigation", "Sprinkler Systems", "Water Management", "System Maintenance"],
      hourlyRate: 6000,
      phone: "+234 805 567 8901",
      available: false
    }
  ];

  const categories = [
    { value: "produce", label: "Farm Produce" },
    { value: "inputs", label: "Agricultural Inputs" },
    { value: "equipment", label: "Farm Equipment" }
  ];

  const locations = [
    "Lagos State", "Kano State", "Rivers State", "Kaduna State", "Oyo State",
    "Imo State", "Benue State", "Anambra State", "Delta State", "Osun State"
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    const matchesLocation = selectedLocation === "" || product.seller.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "" || provider.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Agricultural Marketplace</h2>
        <p className="text-lg text-gray-600">
          Connect with buyers, sellers, and agricultural experts across Nigeria
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="buy">Buy Products</TabsTrigger>
          <TabsTrigger value="sell">Sell Products</TabsTrigger>
          <TabsTrigger value="services">Extension Services</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search products or services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          {activeTab !== "services" && (
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="buy" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {categories.find(c => c.value === product.category)?.label}
                    </Badge>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        ₦{product.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">{product.unit}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Available:</span>
                      <span className="font-medium">{product.quantity} units</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Seller:</span>
                      <span className="font-medium">{product.seller.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{product.seller.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.seller.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Seller
                    </Button>
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sell" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>List Your Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <Input placeholder="e.g., Fresh Tomatoes" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price (₦)</label>
                    <Input type="number" placeholder="1000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <Input placeholder="per kg, per basket, etc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Available</label>
                    <Input type="number" placeholder="50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea placeholder="Describe your product..." rows={3} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  List Product
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-sm text-gray-600">{provider.specialization}</p>
                    </div>
                    <Badge variant={provider.available ? "default" : "secondary"}>
                      {provider.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Experience:</span>
                      <span className="font-medium">{provider.experience} years</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">{provider.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{provider.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Rate:</span>
                      <span className="font-medium">₦{provider.hourlyRate}/hour</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {provider.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex-1 bg-green-600 hover:bg-green-700" disabled={!provider.available}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Book Consultation
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Book Consultation with {provider.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                            <Input placeholder="Enter your name" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                            <Input placeholder="+234 XXX XXX XXXX" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                              <SelectContent>
                                {provider.services.map((service, index) => (
                                  <SelectItem key={index} value={service}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <Textarea placeholder="Describe your farming challenge or question..." rows={3} />
                          </div>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            Send Booking Request
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};