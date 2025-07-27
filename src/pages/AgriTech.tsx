import { useState } from "react";
import { Leaf, Camera, MessageCircle, MapPin, TrendingUp, ShoppingCart, BookOpen, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CropDiagnosis } from "@/components/agri/CropDiagnosis";
import { WeatherCalendar } from "@/components/agri/WeatherCalendar";
import { AdvisoryBot } from "@/components/agri/AdvisoryBot";
import { Marketplace } from "@/components/agri/Marketplace";
import { YieldPredictor } from "@/components/agri/YieldPredictor";
import { KnowledgeBase } from "@/components/agri/KnowledgeBase";
import agritech from "@/assets/agritech.jpg";

const AgriTech = () => {
  const [activeTab, setActiveTab] = useState("home");

  const features = [
    {
      id: "diagnosis",
      icon: Camera,
      title: "AI Disease Diagnosis",
      description: "Upload crop photos for instant AI-powered disease detection and treatment recommendations",
      color: "text-green-600"
    },
    {
      id: "weather",
      icon: Cloud,
      title: "Crop Calendar & Weather",
      description: "Location-based farming calendars with real-time weather alerts and agricultural reminders",
      color: "text-blue-600"
    },
    {
      id: "chat",
      icon: MessageCircle,
      title: "Advisory Bot",
      description: "24/7 multilingual AI assistant supporting English, Hausa, Yoruba, Igbo, and Pidgin",
      color: "text-purple-600"
    },
    {
      id: "marketplace",
      icon: ShoppingCart,
      title: "Marketplace",
      description: "Connect with buyers, suppliers, and extension workers for seamless agricultural commerce",
      color: "text-orange-600"
    },
    {
      id: "yield",
      icon: TrendingUp,
      title: "Yield Prediction",
      description: "AI-powered crop yield forecasting based on soil, weather, and farming practices",
      color: "text-indigo-600"
    },
    {
      id: "knowledge",
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Comprehensive farming resources and best practices in multiple local languages",
      color: "text-teal-600"
    }
  ];

  if (activeTab !== "home") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Leaf className="h-8 w-8 text-green-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">FarmAI Assistant</h1>
                  <p className="text-green-600 font-medium">agro.gitech.africa</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setActiveTab("home")}>
                  Dashboard
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                  Main Site
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Feature Content */}
        <div className="container mx-auto px-6 py-8">
          {activeTab === "diagnosis" && <CropDiagnosis />}
          {activeTab === "weather" && <WeatherCalendar />}
          {activeTab === "chat" && <AdvisoryBot />}
          {activeTab === "marketplace" && <Marketplace />}
          {activeTab === "yield" && <YieldPredictor />}
          {activeTab === "knowledge" && <KnowledgeBase />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FarmAI Assistant</h1>
                <p className="text-green-600 font-medium">agro.gitech.africa</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Back to Main Site
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Your AI-Powered
                <span className="text-green-600"> Agricultural Assistant</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Empowering smallholder farmers across Nigeria with intelligent crop diagnosis, 
                weather insights, marketplace access, and multilingual advisory support.
              </p>
              <div className="flex space-x-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => setActiveTab("diagnosis")}>
                  Start Crop Diagnosis
                </Button>
                <Button variant="outline" size="lg" onClick={() => setActiveTab("chat")}>
                  Ask FarmAI
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={agritech} 
                alt="FarmAI Assistant - Agricultural Technology" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-yellow-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Agricultural Intelligence</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six powerful AI-driven tools designed to revolutionize farming practices and improve yields for Nigerian farmers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.id} 
                  className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
                  onClick={() => setActiveTab(feature.id)}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <Button variant="outline" className="w-full">
                      Open {feature.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Transforming Nigerian Agriculture</h3>
            <p className="text-xl text-gray-600">Real impact through AI-powered agricultural innovation</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-gray-600">Disease Detection Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
              <p className="text-gray-600">Average Yield Increase</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">5+</div>
              <p className="text-gray-600">Local Languages Supported</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <p className="text-gray-600">AI Advisory Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Language Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Multilingual Support</h3>
            <p className="text-xl text-gray-600 mb-8">
              FarmAI speaks your language - providing agricultural advice in local Nigerian languages
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["English", "Hausa", "Yoruba", "Igbo", "Pidgin"].map((language) => (
                <div key={language} className="px-6 py-3 bg-green-100 text-green-700 rounded-full font-medium">
                  {language}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-yellow-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Farm?</h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerian farmers already using FarmAI to increase yields, 
            reduce losses, and access better markets.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" variant="secondary" onClick={() => setActiveTab("diagnosis")}>
              Start Free Diagnosis
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-green-600" onClick={() => setActiveTab("chat")}>
              Chat with FarmAI
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgriTech;