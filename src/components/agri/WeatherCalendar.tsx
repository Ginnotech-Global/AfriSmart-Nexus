import { useState, useEffect } from "react";
import { Calendar, Cloud, Sun, CloudRain, Thermometer, Droplets, Wind, MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WeatherData {
  date: string;
  temperature: { min: number; max: number };
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: "sunny" | "cloudy" | "rainy" | "storm";
  description: string;
}

interface CropActivity {
  date: string;
  activity: string;
  crop: string;
  priority: "low" | "medium" | "high";
  description: string;
}

const crops = [
  "Maize/Corn", "Rice", "Cassava", "Yam", "Plantain", "Cocoa", "Oil Palm", 
  "Tomatoes", "Peppers", "Okra", "Beans", "Groundnuts", "Millet", "Sorghum"
];

const nigerianStates = [
  "Lagos", "Kano", "Rivers", "Kaduna", "Oyo", "Imo", "Benue", "Anambra", 
  "Delta", "Osun", "Edo", "Kwara", "Katsina", "Plateau", "Bauchi"
];

export const WeatherCalendar = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [cropActivities, setCropActivities] = useState<CropActivity[]>([]);
  const [activeTab, setActiveTab] = useState("weather");

  // Mock weather data
  useEffect(() => {
    const mockWeather: WeatherData[] = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      return {
        date: date.toISOString().split('T')[0],
        temperature: {
          min: Math.floor(Math.random() * 10) + 20,
          max: Math.floor(Math.random() * 10) + 30
        },
        humidity: Math.floor(Math.random() * 30) + 60,
        rainfall: Math.random() * 20,
        windSpeed: Math.random() * 15 + 5,
        condition: ["sunny", "cloudy", "rainy", "storm"][Math.floor(Math.random() * 4)] as any,
        description: ["Clear skies", "Partly cloudy", "Light rain expected", "Thunderstorms possible"][Math.floor(Math.random() * 4)]
      };
    });
    setWeatherData(mockWeather);
  }, [selectedLocation]);

  // Mock crop activities
  useEffect(() => {
    if (selectedCrop) {
      const mockActivities: CropActivity[] = [
        {
          date: new Date().toISOString().split('T')[0],
          activity: "Apply Fertilizer",
          crop: selectedCrop,
          priority: "high",
          description: "Apply NPK fertilizer for optimal growth during this growth stage"
        },
        {
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          activity: "Pest Monitoring",
          crop: selectedCrop,
          priority: "medium",
          description: "Check for early signs of pest infestation, especially armyworms"
        },
        {
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          activity: "Irrigation",
          crop: selectedCrop,
          priority: "high",
          description: "Ensure adequate water supply during flowering stage"
        }
      ];
      setCropActivities(mockActivities);
    }
  }, [selectedCrop]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny": return <Sun className="h-6 w-6 text-yellow-500" />;
      case "cloudy": return <Cloud className="h-6 w-6 text-gray-500" />;
      case "rainy": return <CloudRain className="h-6 w-6 text-blue-500" />;
      case "storm": return <CloudRain className="h-6 w-6 text-purple-500" />;
      default: return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Crop Calendar & Weather Insights</h2>
        <p className="text-lg text-gray-600">
          Get location-based farming recommendations and real-time weather alerts
        </p>
      </div>

      {/* Location and Crop Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>Setup Your Farm Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {nigerianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state} State
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Crop</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>
                      {crop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedLocation && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weather">7-Day Weather Forecast</TabsTrigger>
            <TabsTrigger value="calendar">Farming Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="weather" className="space-y-6">
            <Alert>
              <Bell className="h-4 w-4" />
              <AlertDescription>
                Weather alerts are active for {selectedLocation} State. Check daily for updates.
              </AlertDescription>
            </Alert>

            <div className="grid gap-4">
              {weatherData.map((day, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getWeatherIcon(day.condition)}
                        <div>
                          <h3 className="font-medium text-gray-900">{formatDate(day.date)}</h3>
                          <p className="text-sm text-gray-600">{day.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Thermometer className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium">
                              {day.temperature.max}°/{day.temperature.min}°C
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{day.humidity}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <CloudRain className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{day.rainfall.toFixed(1)}mm</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Wind className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{day.windSpeed.toFixed(1)} km/h</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            {selectedCrop ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span>{selectedCrop} Farming Activities</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cropActivities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                          <div className="text-center min-w-[80px]">
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(activity.date)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium text-gray-900">{activity.activity}</h4>
                              <Badge className={getPriorityColor(activity.priority)}>
                                {activity.priority} priority
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Seasonal Recommendations for {selectedCrop}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Current Season Focus</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Monitor for pest and disease activity</li>
                          <li>• Ensure adequate water supply</li>
                          <li>• Apply appropriate fertilizers</li>
                          <li>• Prepare for harvest planning</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Weather Considerations</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Check rainfall patterns for irrigation needs</li>
                          <li>• Protect crops during heavy rains</li>
                          <li>• Monitor temperature for optimal growth</li>
                          <li>• Plan field activities around weather</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="pt-8">
                  <div className="text-center text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Please select a crop to view your personalized farming calendar</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      )}

      {!selectedLocation && (
        <Card>
          <CardContent className="pt-8">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Please select your location to get started with weather forecasts and farming recommendations</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};